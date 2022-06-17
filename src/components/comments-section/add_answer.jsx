import React from "react";
import './add_answer.css';
import { add_comment } from "../../App";
import comments from "./comments";
import { get_comments } from "./comments_list";

class Add_Answer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }

    render(){
        const{path, currentPath, user, username} = this.props;
        let nextPath = `${currentPath}/${path}/answers`;
        //console.log(nextPath);
        return(
            <div>
                
                <input className="answer-input" 
                    value = {this.state.answer}
                    onChange = {event => this.setState({answer:event.target.value})} 
                    type="text" placeholder={`Reply to ${username}`}/>

                <button className = "upload-c" onClick = {() => {
                    add_comment(nextPath, this.state.answer, user.displayName);
                    this.setState({answer:''});
                }}>Post</button>
                
            </div>
        )
    }
}

export default Add_Answer;