from flask import Flask, request, jsonify
import boto3
from botocore.exceptions import ClientError
import os
from dotenv import load_dotenv
load_dotenv()  # Load environment variables from a .env file
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_dance.contrib.google import make_google_blueprint, google
import urllib 
from pymongo import MongoClient
import ssl


app = Flask(__name__)

# app.config["MONGO_URI"] = "mongodb+srv://dkyadav:" + urllib.parse.quote("divakar@Y123")+"@cluster0.esac8cu.mongodb.net"
# mongo = PyMongo(app)
# uri = "mongodb+srv://dkyadav:" + urllib.parse.quote("divakar@Y123")+"@cluster0.esac8cu.mongodb.net/test?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE"
uri = "mongodb+srv://dkyadav:"+ urllib.parse.quote("divakar@Y123")+ "@cluster0.esac8cu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# client = MongoClient(, ssl_cert_reqs='CERT_NONE')
# client = MongoClient(uri)



try:
  client = MongoClient(uri,connect=False)
  
# return a friendly error if a URI error is thrown 
except pymongo.errors.ConfigurationError:
  print("An Invalid URI host error was received. Is your Atlas host name correct in your connection string?")
  sys.exit(1)

db = client['mydatabase']

def create_s3_client():
    if "AWS_ACCESS_KEY_ID" in os.environ and "AWS_SECRET_ACCESS_KEY" in os.environ:
        # Use credentials from environment variables if running locally
        return boto3.client(
            's3',
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
            region_name=os.environ.get('AWS_REGION', 'us-east-2')
        )
    else:
        # Use the default IAM role credentials provided by AWS environment
        return boto3.client('s3', region_name='us-east-2')

s3_client = create_s3_client()

BUCKET_NAME = 'road-gaurdians'

@app.route('/generate-presigned-urls', methods=['GET'])
def generate_presigned_urls():
    file_names = request.json.get('file_names')  # Expect a list of file names
    expiration = 3600  # Time in seconds
    urls = []

    for file_name in file_names:
        try:
            url = s3_client.generate_presigned_url('put_object',
                                                   Params={'Bucket': BUCKET_NAME, 'Key': file_name},
                                                   ExpiresIn=expiration)
            urls.append({'file_name': file_name, 'url': url})
        except ClientError as e:
            return jsonify({'error': str(e), 'file_name': file_name}), 500

    return jsonify({'presigned_urls': urls}), 200



bcrypt = Bcrypt(app)

@app.route('/signup', methods=['POST'])
def signup():
    users = db.users
    email = request.json['email']
    password = request.json['password']
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    
    user_id = users.insert_one({'email': email, 'password': hashed_password}).inserted_id
    return jsonify({'message': 'User created successfully', 'user_id': str(user_id)}), 201


@app.route('/signin', methods=['POST'])
def signin():
    users = db.users
    email = request.json['email']
    password = request.json['password']
    user = users.find_one({'email': email})
    
    if user and bcrypt.check_password_hash(user['password'], password):
        # Implement session or token logic here
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/forget-password', methods=['POST'])
def forget_password():
    users = db.users
    email = request.json['email']
    new_password = request.json['new_password']
    hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')

    result = users.update_one({'email': email}, {'$set': {'password': hashed_password}})
    if result.modified_count:
        return jsonify({'message': 'Password updated successfully'}), 200
    else:
        return jsonify({'error': 'User not found'}), 404


app.secret_key = 'supersecretkey'  # Replace with a real secret key
google_bp = make_google_blueprint(client_id='your-client-id', client_secret='your-client-secret', offline=True, scope=["profile", "email"])
app.register_blueprint(google_bp, url_prefix="/login")

@app.route('/google-login')
def google_login():
    if not google.authorized:
        return redirect(url_for('google.login'))
    resp = google.get("/oauth2/v2/userinfo")
    assert resp.ok, resp.text
    email = resp.json()["email"]
    # Check if user exists and handle accordingly
    return jsonify({'email': email}), 200


if __name__ == '__main__':
    app.run(debug=True)
