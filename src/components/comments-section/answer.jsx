import React from "react";
import "./answer.css";
import Answers_list from "./answers_list";
import Add_Answer from "./add_answer";
import User_icon from "../../icons/user_icon.svg";

export class Answer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            answers: false
        }
    }

    render(){
        const{currentPath, path, newPath, answer, answers, username, user} = this.props;
        //console.log(`${currentPath}/${path}/answers/${newPath}/answers`);
        //console.log(answers);
        return(
            <div>
                <div className = "answer">
                    <div className="user-section">
                        <img className="userIcon" src={User_icon} alt="" />
                        <b>{username}</b>
                    </div>
                    <div className="answer-section">
                        {answer}
                    </div>

                </div>
                {/* {this.state.answers?

                    } */}
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
                        <Answers_list answers = {answers} 
                            currentPath = {`${currentPath}/${path}/answers`}
                            path = {newPath}
                            user = {user}/>

                        <Add_Answer currentPath = {`${currentPath}/${path}/answers`}
                            path = {newPath}
                            user = {user}
                            username = {username}/>
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