import React, { useState, useEffect } from 'react';

function VideoSlider() {
    const videos = [
        "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
    ];

    const [index, setIndex] = useState(0);
    const [startY, setStartY] = useState(0);
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        setVideoError(false); // Reset error state when index changes
    }, [index]);

    const handleTouchStart = (e) => {
        console.log("handleTouchStart")
        const touch = e.touches[0];
        setStartY(touch.clientY);
    };

    const handleTouchEnd = (e) => {
        console.log("handleTouchEnd")
        const touch = e.changedTouches[0];
        const endY = touch.clientY;

        if (startY - endY > 50) {
            setIndex((current) => (current + 1) % videos.length);
        } else if (endY - startY > 50) {
            setIndex((current) => (current > 0 ? current - 1 : videos.length - 1));
        }
    };

    const handleError = () => {
        console.error('Video loading error');
        setVideoError(true);
    };

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: 'black' }}
        >
            <video
                src={videos[index]}
                autoPlay
                loop
                muted
                playsInline
                onError={handleError}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            >
                Your browser does not support the video tag.
            </video>
            {videoError && <p style={{ color: 'white' }}>Video failed to load.</p>}
        </div>
    );
}

export default VideoSlider;
