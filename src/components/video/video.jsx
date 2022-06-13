import React from "react";
import "./video.css";
import Video from "../../images/video.mp4";

function video(props){
    const{address} = props;
    console.log(address);
    return(
        <div className = 'video-content'>
            {/* <img src={address.val.image} alt="" className = "video"/> */}
            <video className="video" width = "100%" controls>
                <source src={address} type = "video/mp4"/>
            </video>
        </div>
    )
}

export default video;