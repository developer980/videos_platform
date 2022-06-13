import React from "react";
import "./video_data.css";
import Like from "../../icons/like.svg";
import Comment from "../../icons/comment.svg";

class Video_data extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        const{name, description} = this.props;
        return(
            <div>
            <div className = "vid-data">
                {name}
            </div>
            <div className = "desc">
                {description}
            </div>
            <div className = "buttons">
                <img src={Like} className= "btn"/>
                <img src={Comment} className= "btn"/>
            </div>
            </div>
        )
    }
}

export default Video_data;