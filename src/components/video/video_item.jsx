import React from "react";
import "./video_item.css";
import Video from "./video";
import Video_data from "./video_data";

function video_item(props){
    const{address, name, description} = props;
    return(
        <div className = "video-item">
            <Video address = {address}/>
            <Video_data name = {name}
            description = {description}/>
            {props.children}
        </div>
    )
}

export default video_item;