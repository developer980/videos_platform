import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import UserIcon from "../../icons/user_icon.svg";
import { connect } from "react-redux";
import { search } from "../../redux/action";


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
    
        const{user, videos, signOut} = this.props;
        return(
            <div className = "header">

                <Link to = "/" className="title">
                    VIDEOS
                </Link>

                <input className="search-input" id = "search" type="search" placeholder="Search" onChange = {(e)=>{
                    this.props.search(e.target.value);
                    this.find(e.target.value);
                }}/>

                <div className = "user-section">
                    {
                    user?
                        <div className = "user-section">
                            <img className = "user-icon" src= {UserIcon} alt="" />
                            <Link to = {`/profile->${user.displayName}`} className="username">{user.displayName}</Link>
                            <button onClick = {()=> {signOut();
                                                     window.location.reload()}} className = "login">
                                Log out
                            </button>
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
                                videos.filter(video => video.name.includes(this.state.keyword.toLowerCase())||
                                video.name.includes(this.state.keyword.toUpperCase())
                                 || video.description.includes(this.state.keyword.toLowerCase())
                                 || video.description.includes(this.state.keyword.toUpperCase()))
                                .map(video => {

                                    const returnedName = video.name.toLowerCase();
                                    console.log(returnedName);

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
                                null
                            }
                        </div>:
                    null
                }
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        search:(payload) => dispatch(search(payload))
    }
}

export default connect(null, mapDispatchToProps) (Header);