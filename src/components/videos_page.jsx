import React from "react";
import Videos from "./videos";
import "./video_page.css"
import PostVideo from "./video/postVideo"
import { connect } from "react-redux";
import { Link } from "react-router-dom";


//The videos main page that displays two components:
   // <PostVideo/> which allows the user to upload the video
   //<Videos/> which displays the posts list

class Videos_page extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        const{videos, comments, user, keyword} = this.props;
        console.log(keyword);
        return(
            <div className = "video-contents">
                

                <PostVideo user = {user}/>
                <Videos videos = {videos} 
                        comments = {comments}
                        user = {user}/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
      keyword: state.keyword
  };
  }

export default connect(mapStateToProps, null)(Videos_page);