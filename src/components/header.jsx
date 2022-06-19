import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { store } from "../redux/store";
import { connect } from "react-redux";
import UserIcon from "../icons/user_icon.svg";

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            keyword:''
        }
    }

    find(keyword){
        this.setState({keyword:keyword});
    }
    render(){
    
        const{user, videos} = this.props;
        return(
            <div className = "header">
                <div className="title">
                    VIDEOS
                </div>
                <input className="search-input" id = "search" type="search" placeholder="Search" onChange = {(e)=>{
                    this.find(e.target.value);
                }}/>
                <div className = "user-section">
                    {
                    user?
                        <div className = "user-section">
                            <img className = "user-icon" src= {UserIcon} alt="" />
                            <Link to = {`/profile`} className="username">{user.displayName}</Link>
                            <Link to = "/login" className = "login">
                                Log out
                            </Link>
                        </div>:
                        <Link to = "/login" className = "login">
                            Log in
                        </Link>
                    }
                </div>
                {
                    this.state.keyword?
                    <div className = "results-list">
                        {
                                videos.filter(video => video.name.includes(this.state.keyword) || video.description.includes(this.state.keyword))
                                .map(video => {
                                    return(

                                    <Link onClick = {()=>{this.setState({keyword:''});
                                                        document.getElementById("search").value = '';
                                                        }} 
                                                        to = {`${video.key}=>${video.name}`} className = "result">

                                        <div className = "user"><b>{video.username}</b></div>
                                        <div>{video.name}</div>
                                    </Link>
                                    )
                                })
                            }
                        </div>:
                    null
                }
            </div>
        )
    }
}

export default Header;