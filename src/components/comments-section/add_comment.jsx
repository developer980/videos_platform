import React from "react";
import './add_comment.css';
import { add_comment } from "../../App";

class Add_Comment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            comment:''
        }
    }

    render(){
        const{path} = this.props;
        console.log(path);
        let nextPath = "videos/" + path;
        console.log(nextPath);
        return(
            <div className="add-section">
                <input className="comment-input" onChange = {event => this.setState({comment:event.target.value})} type="text" placeholder="Write a comment"/>
                <button onClick = {() => add_comment(nextPath, this.state.comment)}>Post</button>
            </div>
        )
    }
}

export default Add_Comment;