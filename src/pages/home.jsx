import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout";
import "./home.css";
import Image from "../images/business.jpg";
import Videos_page from "../components/videos_page";

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        const{images} = this.props;
        console.log(images);
        return(
                <Layout>
                        <Videos_page images = {images}/>
                </Layout>
        )
    }
}

export default Home;