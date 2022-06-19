import React from "react";
import Video_item from "./video/video_item";
import "./videos.css";
import Comments from "./comments-section/comments";
import Post from "./video/post";

function Videos(props){
    const{videos, comments, user} = props;
    console.log(videos);
    return(
      <div className = "videos-list">
        {videos.map(video => {
          console.log(video.comments);
          return <Post address = {video.url}
            description = {video.description}
            name = {video.name}
            key = {video.key}
            path = {video.key}
            username = {video.username}
            userId = {video.uid}
            comments = {comments}
            user = {user}/>
        })}
      </div>
    )

}

export default Videos;