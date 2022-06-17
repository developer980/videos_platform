import React from "react";
import Comment from "./comment";
import { database } from "firebase/database";
import * as assets from "firebase/storage";
import { firestore } from "firebase/firestore";
import { firebaseapp } from "../../App";
import { db } from "../../App";
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
                {comments ? 
                comments.map(comment => {
                    // console.log(path + ' ' + comment.comment);
                   if(comment.path == nextPath){
                        console.log(comment.user)
                        return(
                            <Comment currentPath = {nextPath} 
                            comment = {comment.comment}
                            code = {comment.newKey}
                            username = {comment.user}
                            user = {user}
                            answers = {comment.answers}/>
                        )
                   }
                }): null}
            </div>
        )
    }
}

    
