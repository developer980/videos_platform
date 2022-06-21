import React from "react";
import Comment from "../comment/comment";
import "./comments-list.css";

export default class Comments_list extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            comments:[]
        };
        window.comments_list = this;
    }

    componentDidMount(){

    }

    render(){
        const {comments, path, user} = this.props;
        const nextPath = "videos/" + path + "/comments";
        return(
            <div className= "comments-list">
                {comments ? comments.filter(comment => comment.path == nextPath).map(comment => {
                    // console.log(path + ' ' + comment.comment);
                        console.log(comment.user)
                        return(
                            <Comment currentPath = {nextPath} 
                                comment = {comment.comment}
                                code = {comment.newKey}
                                username = {comment.user}
                                user = {user}
                                answers = {comment.answers}/>
                        )
                }): null}
            </div>
        )
    }
}

    
