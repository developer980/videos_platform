import React from "react";
import "./answer.css";
import Answers_list from "./answers_list";
import Add_Answer from "./add_answer";

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
            <div className = "connections">
                <div className = "answer">
                    <div>
                        <b>{username}</b>
                    </div>
                    <div>
                        {answer}
                    </div>

                </div>
                {/* {this.state.answers?

                    } */}
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