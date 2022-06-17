import React from "react";
import './add_comment.css';
import { add_comment } from "../../App";
import comments from "./comments";
import { get_comments } from "./comments_list";

class Add_Comment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            comment:''
        }
    }

    render(){
        const{path, user} = this.props;
        let nextPath = "videos/" + path + "/comments";
      //  console.log(path);
        return(
            <div className="add-section">
                
                <input className="comment-input" 
                    value = {this.state.comment}
                    onChange = {event => this.setState({comment:event.target.value})} 
                    type="text" placeholder="Write a comment"/>

                <button className = "upload-c" onClick = {() => {
                    add_comment(nextPath, this.state.comment, user.displayName);
                    this.setState({comment:''});
                }}>Post</button>
                
            </div>
        )
    }
}

export default Add_Comment;