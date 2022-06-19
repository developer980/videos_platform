import React from "react";
import "./postVideo.css";
import { upload } from "../../App";
import VideoIcon from "../../icons/cloud.svg";

class PostVideo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            address:"",
            name:"",
            description:"",
        }
        window.image = this;
    }

    render(){
        console.log(this.state);
        const {user} = this.props;
        console.log(user);
        const setContent = (event) =>{
            event.preventDefault();
            upload(event.target[0].files[0], this.state.name, this.state.description, user);
        }
        return(
            <div className = "post">
                <div className="image-post">
                    <div className = "image-content" id = "file">
                        {
                            this.state.address ?
                            <video className = "preview" width = "100%" src = {this.state.address} controls/>
                            :
                            <img className = 'place-holder' src={VideoIcon}/>
                        }
                    </div>

                    <form action="" onSubmit={setContent}>
                        <input className = "file-select" onChange = {e => {
                            const url = URL.createObjectURL(e.target.files[0]);
                            console.log(url)
                            this.setState({address:url})
                        }} 
                        type="file"
                        id = "video-input"
                        accept = "video/*"
                        hidden  
                        />

                        <button onClick = {(e)=>{
                            e.preventDefault();
                            const original_btn = document.getElementById("video-input");
                            original_btn.click()
                        }}>Choose a file</button>
                        
                        {
                            this.state.address && this.state.name && this.state.description ?
                            <button onClick = {() =>{
                                this.setState({address:''})
                            }} type="submit">Upload</button> :
                            <button onClick = {(e) =>{
                                e.preventDefault()
                            }} style = {{backgroundColor:'#E0E0E0', color:'#A6A6A6'}}>Upload</button>
                        }

                    </form>
                </div>
                <input type="text"
                        className = "post-input" 
                        onChange={(event) => {
                            this.setState({name:event.target.value})
                            }}
                            placeholder = "Title"/>
                <input type="text" 
                        className = "post-input" 
                        onChange = {event => {
                            this.setState({description:event.target.value})
                            }}
                            placeholder = "Description"/>
            </div>
        )
    }
}

export default PostVideo;