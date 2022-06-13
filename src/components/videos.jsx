import React from "react";
import Video_item from "./video/video_item";
import "./videos.css";
import Comments from "./comments-section/comments";
import Post from "./video/post";

function Videos(props){
    const{videos} = props;
    const contents = videos.reverse();
    console.log(videos);
    return(
      <div>
        {contents.reverse().map(video => {
          return <Post address = {video.url}
          description = {video.description}
          name = {video.name}
          key = {video.key}
          path = {video.key}/>
        })}
      </div>
    )

}

export default Videos;