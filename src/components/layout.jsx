import React from "react";
import Header from "./header";
import "./layout.css";

function layout(props){
        return(
            <div className = "layout">
             <Header></Header>
             {props.children}   
            </div>
        )
}

export default layout;