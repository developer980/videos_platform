import React from "react";
import './comments.css';
import Comment from "./comment";
import Comments_List from "./comments_list";
import Add_Comment from "./add_comment";

class comments extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        const{comments, path, user} = this.props;
        console.log("path: " + path)
        return(
            <div className = "comments-section">
                <div className = "comment-connections">
                    <Comments_List path = {path} comments = {comments}
                    user = {user}/>
                    <Add_Comment path = {path}
                    user = {user}/>
                </div>
            </div>
        )
    }
}

export default comments;