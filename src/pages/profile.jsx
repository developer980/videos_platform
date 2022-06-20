import React from "react";
import Post from "../components/video/post";
import Layout from "../components/layout";
import UserIcon from "../icons/user_icon.svg";
import "./profile.css";
import PostVideo from "../components/video/postVideo";


//The profile page displays the videos posted by you

export function Profile(props){
    const{videos, comments, user, likes} = props;

    return(
        <Layout user = {user}>
            <div className = "user-profile">
                <img src={UserIcon} alt="" />
                {
                    user?
                    <b> 
                    {user.displayName}
                    </b>
                    :null
                }
            </div>
            <PostVideo user = {user}/>
            {
                videos.filter(video => video.userId == user.uid).map(
                    video=> {
                        return(
                            <Post address = {video.url}
                            description = {video.description}
                            name = {video.name}
                            key = {video.key}
                            path = {video.key}
                            username = {video.username}
                            userId = {video.uid}
                            likes = {likes}
                            comments = {comments}
                            user = {user}/>
                        )
                    }
                )
            }
        </Layout>
    )
}