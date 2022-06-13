import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout";

class Page1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <Layout>
                Page1
            </Layout>
        )
    }
}

export default Page1;