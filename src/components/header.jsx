import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import UserIcon from "../icons/user_icon.svg";


/*
The header containing the logo, the searchbar and the user section
*/

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
                
                <Link to = "/" className="title">
                    VIDEOS
                </Link>

                <input className="search-input" id = "search" type="search" placeholder="Search" onChange = {(e)=>{
                    this.find(e.target.value);
                }}/>

                <div className = "user-section">
                    {
                    user?
                        <div className = "user-section">
                            <img className = "user-icon" src= {UserIcon} alt="" />
                            <Link to = {`/profile->${user.displayName}`} className="username">{user.displayName}</Link>
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
                            videos?
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
                                :
                                <b>You have no videos yet</b>
                            }
                        </div>:
                    null
                }
            </div>
        )
    }
}

export default Header;