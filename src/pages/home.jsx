import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout";
import "./home.css";
import Image from "../images/business.jpg";
import Videos_page from "../components/videos_page";


//The main page where all the posts are displayed

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        const{videos, comments, user} = this.props;
        console.log(comments);
        return(
                <Layout user = {user} videos = {videos}>
                        <Videos_page videos = {videos} 
                            comments = {comments}
                            user = {user}/>
                </Layout>
        )
    }
}

export default Home;