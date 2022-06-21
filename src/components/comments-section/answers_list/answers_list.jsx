import React from "react";
import { Answer } from "../answer/answer";
import { db } from "../../../App";
import "./answers_list.css";

export default class Answers_list extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            answers:''
        }

        window.answers_list = this;
    }

    render(){
        const{path, comments, currentPath, answers, user} = this.props;
        //console.log(`${currentPath}/${path}/answers`);

        return(
            <div className = "answers-list">
                {
                    answers?
                    Object.entries(answers).map(([key, value]) =>{
                        return(
                            <Answer 
                                currentPath = {currentPath}
                                path = {path} 
                                answer = {value.comment}
                                newPath = {key}
                                answers = {value.answers}
                                username = {value.user}
                                user = {user}/>
                        )
                    }):null
                }
            </div>
        )
    }
}