import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { store } from "../redux/store";
import { connect } from "react-redux";
import { find } from "../redux/action";

function Header(props){
    const{user} = props;
    return(
        <div className = "header">
            <div className="title">
                VIDEOS
            </div>
            <input className="search-input" type="text" placeholder="Search" onChange = {(e)=>{
                props.find(e.target.value);
            }}/>
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

function mapDispatchToProps(dispatch){
    return{find: (payload) => dispatch(find(payload))}
}

export default connect(null, mapDispatchToProps) (Header);