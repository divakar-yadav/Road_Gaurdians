import './HomePage.css';
import HorizontalLinearAlternativeLabelStepper from '../../Components/Stepper/Stepper';
import Header from '../../Components/Header/Header';
import Upload from '../../Components/Upload/Upload';
import home from '../../assets/home.png';
import contribution from '../../assets/contribution.png';
import setting from '../../assets/setting.png';
import live from '../../assets/live.png';
import feedback from '../../assets/feedback.png';
import VideoPost from '../../Components/VideoPost/VideoPost'

const HomePage = () => {
  return (
    <div className='homepage_wrapper'>
        <Header
            headerName = {'Road Gaurdians'}
        />
        <div className='homepage_body'>
            <div className='sidenav'>
                <div className='sidenav_links'>
                    <ul>
                        <li>
                            <div className='sidenav_item'>
                                <img className='item_icon' src={contribution}/>
                                <div className='redirect'>Your Contributions</div>
                            </div>
                        </li>
                        <li>
                            <div className='sidenav_item'>
                                <img className='item_icon' src={setting}/>
                                <div className='redirect'>Setting</div>
                            </div>
                        </li>
                        <li>
                            <div className='sidenav_item'>
                                <img className='item_icon' src={live}/>
                                <div className='redirect'>Live</div>
                            </div>
                        </li>
                        <li>
                            <div className='sidenav_item'>
                                <img className='item_icon' src={feedback}/>
                                <div className='redirect'>Send Feedback</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='side_nav_utilities'>
                    <div className='side_nav_utilities_content'>
                    Log in to follow creators, like videos, and view comments.
                    </div>
                    <div className='side_nav_utilities_login'>
                        Login
                    </div>
                </div>

            </div>
            <div className="homepage">
                {/* <div className="stepper-container">
                    <HorizontalLinearAlternativeLabelStepper />
                </div>
                <Upload/> */}
                {/* <VideoSlider/> */}
                <div className='video_timeline'>
                    {[1,2,3].map((idx, item)=>{
                        return <VideoPost/>
                    })}
                </div>
            </div>
        </div>
    </div>
  );
}

export default HomePage;
