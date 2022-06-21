import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/layout";
import "./home.css";
import Videos_page from "../../components/videos_page/videos_page";


//The main page where all the posts are displayed

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    
    render(){
        const{videos, comments, user, likes, signOut} = this.props;
        console.log(likes);
        return(
                <Layout user = {user} videos = {videos} signOut = {signOut}>
                        <Videos_page videos = {videos} 
                            comments = {comments}
                            user = {user}
                            likes = {likes}/>
                </Layout>
        )
    }
}

export default Home;