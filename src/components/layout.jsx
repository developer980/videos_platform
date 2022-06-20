import React from "react";
import Header from "./header";
import "./layout.css";


/*
The component that organises the page on a specific layout (header, content)
*/

function layout(props){
    const{user, videos} = props;
        return(
            <div className = "layout">
             <Header user = {user}
                    videos = {videos}></Header>
             {props.children}   
            </div>
        )
}

export default layout;