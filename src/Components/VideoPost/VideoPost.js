import React from 'react';
import './VideoPost.css';  // Ensure you have a CSS file with the appropriate styles
import user from '../../assets/avtar.jpeg'
import normal from '../../assets/normal.png'
import normal_empty from '../../assets/normal_empty.png'
import dangerous from '../../assets/dangerous.png'
import dangerous_empty from '../../assets/dangerous_empty.png'
import moderate from '../../assets/moderate.png'
import moderate_empty from '../../assets/moderate_empty.png'

const VideoPost = ()=> {
    const [userInput, setUserInput] = React.useState();


const handleUserInput = (inputType) =>{
    setUserInput(inputType)
}

    return (
        <div className='vid_post'>
            <div className='vid_creater_info'>
                <div className='vid_creater_primary_info'>
                    <img src={user} className='vid_creater_primary_info'/>
                    <div className='vid_creater_primary_info_name_text_wrappper'>
                        <div className='vid_creater_primary_info_name'>Divakar Yadav</div>
                        <div className='vid_creater_info_post_texts'>found out this person driving recklessly</div>
                    </div>
                    <div className='vid_creater_primary_info_follow_button'>
                        Follow
                    </div>
                </div>
            </div>
            <div className="video-container">
                <div className='video-container-player'>
                <video src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" loop controls autoPlay muted className="video-player">
                    Your browser does not support the video tag.
                </video>
                </div>
                <div className="sidebar">
                    <div className="moderate-icon-cont">
                        <img src={userInput=='moderate' ? moderate : moderate_empty} onClick={()=>handleUserInput('moderate')} className="moderate"/>
                        <span>155.2k</span>
                    </div>
                    <div className="dangerous-icon-cont">
                    <img src = {userInput=='dangerous' ? dangerous : dangerous_empty} onClick={()=>handleUserInput('dangerous')} className="dangerous"/>
                        <span>14.6k</span>
                    </div>
                    <div className="normal-icon-cont">
                    <img src={userInput=='normal' ? normal : normal_empty} onClick={()=>handleUserInput('normal')} className="normal"/>
                        <span>77.3k</span>
                    </div>
                </div>
                {/* <div className="bottom-text">
                    <p>@funnyfactsvn</p>
                    <p>Random Facts No one knew about the last one.. #facts #randomfacts #curiosity #learnonTikTok</p>
                </div> */}
            </div>
        </div>

    );
}

export default VideoPost;
