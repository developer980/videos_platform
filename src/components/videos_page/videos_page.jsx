import React from "react";
import Videos from "../videos/videos";
import "./video_page.css"
import PostVideo from "../video/postvideo/postVideo"
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
            <div>
              
                <div className = "video-contents">
                    

                    <PostVideo user = {user}/>
                    {
                    user?
                        <Videos videos = {videos} 
                                comments = {comments}
                                user = {user}
                                likes = {likes}/>
                                
                    :
                        <div className = "placeholder">
                            Please login to view and upload content
                        </div>
                    }
                </div>
                
            </div>
        )
    }
}

export default Videos_page;