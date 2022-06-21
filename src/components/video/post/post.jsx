import React from "react";
import Video_item from "../video_item/video_item";
import Comments from "../../comments-section/comments/comments";
import Like from "../../../icons/like.svg";
import Comment from "../../../icons/comment.svg";
import "./post.css";
import { add_like, db } from "../../../App";


/*
The post itself
It stores video, like and comments data and displays it 
It consists of the <Video_item/> which displays the video, the title, the description, the like button and the comments button
And the <Comments/> on which is responsible for the comments section
*/

class Post extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            comments:false,
            amount:1,
            like_filter:'invert(10%) sepia(20%) saturate(70%) hue-rotate(170deg) brightness(550%) contrast(119%)',
            comment_filter:'invert(10%) sepia(20%) saturate(70%) hue-rotate(170deg) brightness(550%) contrast(119%)',
        };
    }

    componentDidMount(){
        //this.props.user?
            this.props.likes.filter(like => like.from == this.props.user.uid && like.path == this.props.path) != 0 ?
            this.setState({like_filter:'invert(10%) sepia(20%) saturate(70%) hue-rotate(170deg) brightness(0%) contrast(119%)'}):
            this.setState({like_filter:'invert(10%) sepia(20%) saturate(70%) hue-rotate(170deg) brightness(550%) contrast(119%)'})
            // :
            // this.setState({like_filter:'invert(10%) sepia(20%) saturate(70%) hue-rotate(170deg) brightness(770%) contrast(119%)',
            //                comment_filter:'invert(10%) sepia(20%) saturate(70%) hue-rotate(170deg) brightness(770%) contrast(119%)'})
    }

    render(){
        const{address, name, description, path, comments, user, username, userId, likes} = this.props;

        return(
            <div className = "post-item">

                <Video_item address = {address}
                    username = {username}
                    name = {name}
                    description = {description}
                    path = {path}>

                    <div className = "buttons">
                
                        <button style = {{filter:this.state.like_filter}} className="like-button" onClick = {()=>{
                            if(likes.filter(like => like.from == user.uid && like.path == path).length<1){
                                add_like(path);
                                this.setState({like_filter:'invert(10%) sepia(20%) saturate(70%) hue-rotate(170deg) brightness(0%) contrast(119%)'})
                            }

                            else{
                                likes.filter(like => like.path == path).map(like => {
                                    if(like.from == user.uid){
                                        db.ref(`videos/${path}/likes`).child(like.key).remove();
                                        this.setState({like_filter:'invert(10%) sepia(20%) saturate(70%) hue-rotate(170deg) brightness(550%) contrast(119%)'})
                                    }
                                })
                            }
                        }}>
                            <img src={Like} className= "btn"/>
                            <b>{likes.filter(like => like.path == path).length}</b>
                            </button>

                        <button style = {{filter:this.state.comment_filter}} className = "comments-button" onClick = {() => {
                            if(this.state.comments){
                                this.setState({comments:false,
                                    comment_filter:'invert(10%) sepia(20%) saturate(70%) hue-rotate(170deg) brightness(550%) contrast(119%)'})
                            }
                            else{
                                this.setState({comments:true,
                                    comment_filter:'invert(10%) sepia(20%) saturate(70%) hue-rotate(170deg) brightness(0%) contrast(119%)'})
                            }
                            }}>
                                
                            <img src={Comment} className= "btn"/>
                            <b>{comments.filter(comment => comment.path == `videos/${path}/comments`).length}</b>
                            </button>
                    </div>
                </Video_item>

                {
                    this.state.comments ?
                    <Comments path = {path} 
                        comments = {comments}
                        user = {user}
                        username = {username}/>
                        :
                        null
                }
            </div>
        )
    }
}

export default Post;