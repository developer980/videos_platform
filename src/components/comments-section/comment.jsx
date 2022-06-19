import React from "react";
import "./comments.css";
import "./comment.css";
import Answers_list from "./answers_list";
import Add_Comment from "./add_comment";
import Add_Answer from "./add_answer";
import User_icon from "../../icons/user_icon.svg";

class Comment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            answers:false
        }
    }

    render(){
        const{comment, username, code, currentPath, answers, user} = this.props;
        console.log(this.state);

        return(
            <div>
                <div className = "comment">
                    <div className = "comment-username" style = {{fontSize:"30px"}}>
                        <img className = "userIcon" src={User_icon} alt="" />
                        <b>
                            {username}
                        </b>
                    </div>
                    <div className = "comment-content">
                        {comment}
                    </div>
                </div>
                
                {
                    this.state.answers? 
                    <div className = "connections">
                        <button className="show-hide" onClick = {() => {
                            this.state.answers?
                            this.setState({answers:false}):
                            this.setState({answers:true})
                            }}>
                            Hide answers
                        </button>
                        <Answers_list path = {code}
                            currentPath = {currentPath}
                            answers = {answers}
                            user = {user}/>
                        <Add_Answer path = {code}
                            currentPath = {currentPath}
                            user = {user}
                            username = {username}
                            />
                    </div>
                        :
                        <button className="show-hide" onClick = {() => {
                            this.state.answers?
                            this.setState({answers:false}):
                            this.setState({answers:true})
                            }}>
                            Show answers
                        </button>
                }
            </div>
        )
    }
}

export default Comment;