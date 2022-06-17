import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

function Header(props){
    const{user} = props;
    return(
        <div className = "header">
            <div className="title">
                VIDEOS
            </div>
            <div className = "user-section">
                {
                user?
                    <div>
                        <div className="username">{user.displayName}</div>
                        <Link to = "/login" className = "login">
                            Log out
                        </Link>
                    </div>:
                    <Link to = "/login" className = "login">
                        Log in
                    </Link>
                }
            </div>
        </div>
    )
}

export default Header;