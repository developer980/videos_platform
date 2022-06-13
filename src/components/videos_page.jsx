import React from "react";
import Videos from "./videos";
import "./video_page.css"
import PostVideo from "./video/postVideo";

class Videos_page extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        const{images} = this.props;
        console.log(images);
        return(
            <div className = "video-contents">
                <PostVideo/>
                <Videos videos = {images}/>
            </div>
        )
    }
}

export default Videos_page;