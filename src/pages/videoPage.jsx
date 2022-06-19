import React from "react";
import { db } from "../App";
import Video_item from "../components/video/video_item";
import Post from "../components/video/post";
import Layout from "../components/layout";
import { useLocation, useParams } from "react-router-dom";

export function VideoPage(props){

    const {handle} = useParams();
    const location = useLocation();
    console.log(location);
    const {match, videos, comments, user} = props;
    const id = match.params.videoid;
    const name = match.params.videoName;
    return(
        <Layout user = {user}>
            <div>
                {
                    videos.filter(video => video.key == id).map(video =>{
                        return(
                            <div>
                                <Post address = {video.url}
                                        description = {video.description}
                                        name = {video.name}
                                        key = {video.key}
                                        path = {video.key}
                                        username = {video.username}
                                        userId = {video.uid}
                                        comments = {comments}
                                        user = {user}/>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                {
                    videos.filter(video => (video.name.includes(name) || 
                    video.description.includes(name)) && id != video.key).map(video => {
                            return(
                                <div>
                                    <Post address = {video.url}
                                        description = {video.description}
                                        name = {video.name}
                                        key = {video.key}
                                        path = {video.key}
                                        username = {video.username}
                                        userId = {video.uid}
                                        comments = {comments}
                                        user = {user}/>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </Layout>
    )
}