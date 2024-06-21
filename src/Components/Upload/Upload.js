import * as React from 'react';
import './Upload.css';
import uploadIcon from '../../assets/cloud-computing.png';
import HorizontalLinearAlternativeLabelStepper from '../../Components/Stepper/Stepper'
const Upload = () => {
  const [file, setFile] = React.useState(null);
  const [error, setError] = React.useState('');
  const fileInputRef = React.useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Get the first file
    if (selectedFile && selectedFile.size <= 52428800) { // Check if the file is less than 50 MB
      setFile({ file: selectedFile, url: URL.createObjectURL(selectedFile) });
      setError('');
    } else if (selectedFile) {
      setError(`File ${selectedFile.name} exceeds the 50 MB size limit.`);
      setFile(null);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const removeFile = () => {
    if (file) {
      URL.revokeObjectURL(file.url); // Free up memory
      setFile(null);
    }
  };

  return (
    <div className='upload_container'>
      <div className='upload_inner'>
                <div className="stepper-container">
                    <HorizontalLinearAlternativeLabelStepper />
                </div>
      { file===null ? <div className='upload'>
          <div className='upload_button' onClick={handleClick}>
            <img src={uploadIcon} className='upload_icon' alt="Upload"/>
            <span className='upload_text'>Upload</span>
          </div>
          <input
            type="file"
            onChange={handleFileChange}
            accept="video/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
        </div> : null}
        {error && <p className="error_message">{error}</p>}
        {file && (
          <div className='video-info'>
            <div className='Video Information'>

          </div>
          <div className="video-preview">
            <video controls src={file.url} style={{ width: '100%', maxHeight: '200px' }} />
            <button onClick={removeFile} className="remove-button">Remove</button>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;
