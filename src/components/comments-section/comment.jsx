import React from "react";
import "./comments.css";
import "./comment.css";
import Answers_list from "./answers_list";
import Add_Comment from "./add_comment";
import Add_Answer from "./add_answer";

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
            <div className = "comment-body">
                <div className = "comment">
                    <div className = "comment-username" style = {{fontSize:"30px"}}>
                        <b>
                            {username}
                        </b>
                    </div>
                    <div>
                        {comment}
                    </div>
                </div>
                
                {
                    this.state.answers? 
                    <div>
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