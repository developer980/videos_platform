import React from "react";
import Video_item from "./video_item";
import Comments from "../comments-section/comments";
import Like from "../../icons/like.svg";
import Comment from "../../icons/comment.svg";
import "./post.css";
import { Link } from "react-router-dom";

class Post extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            comments:false
        };
    }

    render(){
        const{address, name, description, path, comments, user, username, userId} = this.props;
            console.log(this.state);
        return(
            <div>
                <Video_item address = {address}
                username = {username}
                name = {name}
                description = {description}
                path = {path}>
                <div className = "buttons">
                    <button className="like-button">
                        <img src={Like} className= "btn"/>
                        </button>

                    <button className = "comments-button" onClick = {() => {
                        if(this.state.comments){
                            this.setState({comments:false})
                        }
                        else{
                            this.setState({comments:true})
                        }
                        }}><img src={Comment} className= "btn"/>
                        </button>
                </div>
                </Video_item>
                {
                    this.state.comments ?
                    <Comments path = {path} 
                    comments = {comments}
                    user = {user}/>
                    :
                    null
                }
            </div>
        )
    }
}

export default Post;