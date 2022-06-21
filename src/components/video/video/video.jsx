import React from "react";
import "./video.css";

function video(props){
    const{address} = props;
    return(
        <div className = 'video-content'>
            <video className="video" width = "100%" controls>
                <source src={address} type = "video/mp4"/>
            </video>
        </div>
    )
}

export default video;