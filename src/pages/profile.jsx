import React from "react";
import Post from "../components/video/post";
import Layout from "../components/layout";
import UserIcon from "../icons/user_icon.svg";
import "./profile.css"


export function Profile(props){
    const{videos, comments, user, match} = props;
    return(
        <Layout user = {` `}>
            <div className = "user-profile">
                <img src={UserIcon} alt="" />
                <b>{user.displayName}</b>
            </div>
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
                            comments = {comments}
                            user = {user}/>
                        )
                    }
                )
            }
        </Layout>
    )
}