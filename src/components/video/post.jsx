import React from "react";
import Video_item from "./video_item";
import Comments from "../comments-section/comments";

function Post(props){
    const{address, name, description, path} = props;
    console.log(path);
    return(
        <div>
            <Video_item address = {address}
            name = {name}
            description = {description}/>
            <Comments path = {path}/>
        </div>
    )
}

export default Post;