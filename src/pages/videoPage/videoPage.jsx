import React from "react";
import { db } from "../../App";
import Video_item from "../../components/video/video_item/video_item";
import Post from "../../components/video/post/post";
import Layout from "../../components/layout/layout";
import { useLocation, useParams } from "react-router-dom";
import "./videoPage.css";
import PostVideo from "../../components/video/postvideo/postVideo";
import { connect } from "react-redux";


//the page responsible for displaying videos related to the user's search

class VideoPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {}

    }
    render(){

        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        const {match, videos, comments, user, likes, signOut} = this.props;
        const id = match.params.videoid;
        console.log(this.props.keyword);

        return(
            <Layout user = {user} videos = {videos} signOut = {signOut}>
                <div className = "related-videos">
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
                                        likes = {likes}
                                        comments = {comments}
                                        user = {user}/>     
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    {
                        videos.filter(video => (video.name.includes(this.props.keyword) || 
                        video.description.includes(this.props.keyword)) && id != video.key).map(video => {
                                return(
                                    <div>
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
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            </Layout>
        )
    }
}
function mapStateToProps(state){
    return{
        keyword:state.keyword
    }
}

export default connect(mapStateToProps, null)(VideoPage);