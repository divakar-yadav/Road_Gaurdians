import React from 'react';
import './Header.css';
import logo from '../../assets/sign.png'
import user from '../../assets/user.png'
import add from '../../assets/add.png'
import Upload from '../Upload/Upload';
const Header = (props) => {
  const [showUploadPopUp, setShowUploadPopUp] = React.useState(false);

  return (
    <div className="header">
      <div className='logo_title_wrapper'>
      <img src={logo} className='header_logo'/>
        <div className='header_name'>{props.headerName}</div>
      </div>
      <div className='header_account'>
        <div className='header_signin'>
          <img src={add} className='header_upload_icon'/>
          <div className='header_upload_text' onClick={()=>{setShowUploadPopUp(!showUploadPopUp)}}>
          Upload
          </div>
        </div>
        <div className='header_upload'>Sign In</div>
      </div>
      {showUploadPopUp ? <Upload/> : null}
    </div>
  );
}

export default Header;
