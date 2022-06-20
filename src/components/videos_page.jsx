import React from "react";
import Videos from "./videos";
import "./video_page.css"
import PostVideo from "./video/postVideo"
import { Link } from "react-router-dom";


/*
The videos main page which displays two components:
   <PostVideo/> which allows the user to upload the video
   <Videos/> which displays the posts list
*/

class Videos_page extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        const{videos, comments, user, keyword, likes} = this.props;
        console.log(likes);
        return(
            <div className = "video-contents">
                

                <PostVideo user = {user}/>
                <Videos videos = {videos} 
                        comments = {comments}
                        user = {user}
                        likes = {likes}/>
            </div>
        )
    }
}

export default Videos_page;