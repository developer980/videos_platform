import React from "react";
import "./video_item.css";
import Video from "./video";
import Video_data from "./video_data";
import { Link, useLocation, withRouter } from "react-router-dom";
import UserIcon from "../../icons/user_icon.svg";

function video_item(props){
    const{address, name, description, path, username} = props;
    return(
        <div className = "video-item">
            <div className = "user-info">
                <img src={UserIcon} className= "user-icon" alt="" />
                <b>{username}</b>
            </div>
            <Video address = {address}/>
            <Link to = {`/${path}=>${name}`} state = {{name: name, desc:description}}>
                <Video_data name = {name}
                    description = {description}/>
            </Link>
            {props.children}
        </div>
    )
}

export default withRouter(video_item);