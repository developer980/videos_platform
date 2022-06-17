import React from "react";
import Header from "./header";
import "./layout.css";

function layout(props){
    const{user} = props;
        return(
            <div className = "layout">
             <Header user = {user}></Header>
             {props.children}   
            </div>
        )
}

export default layout;