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
        const{comments, path} = this.props;
        return(
            <div className = "comments-list">
                <Add_Comment path = {path}/>
                <Comments_List/>
            </div>
        )
    }
}

export default comments;