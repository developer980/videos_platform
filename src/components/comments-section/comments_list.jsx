import React from "react";
import Comment from "./comment";

export default class Comments_list extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        const {comments} = this.props;
        return(
            <div>
                <Comment/>  
            </div>
        )
    }
}