import React from "react";
import "./postVideo.css";
import VideoIcon from "../../icons/cloud.svg";
import LoadingIcon from "../../icons/loading.svg";
import { upload } from "../../App";

class PostVideo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            address:"",
            name:"",
            description:"",
            icon:VideoIcon,
            placeholder_d:"block",
            loading_d:"none"
        }
        window.uploadSection = this;
    }

    render(){
        console.log(this.state);
        const {user} = this.props;
        console.log(user);
        const setContent = (event) =>{
            event.preventDefault();
            this.setState({
                placeholder_d:"none",
                loading_d:"block"
            })
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
                            <img style = {{display:this.state.placeholder_d}} className = 'place-holder' src={VideoIcon}/>
                        }
                        <div style = {{display:this.state.loading_d}}>
                            Uploading...
                        </div>
                    </div>

                    <form action="" onSubmit={setContent}>
                        <input className = "file-select" onChange = {e => {
                            if(e.target.files[0]){
                                const url = URL.createObjectURL(e.target.files[0]);
                                console.log(url)
                                this.setState({address:url})
                            }
                        }} 
                        type="file"
                        id = "video-input"
                        accept = "video/*"
                        hidden  
                        />

                       <div>
                       {user? 
                        <div>
                            <button className = "form-button" onClick = {(e)=>{
                                    e.preventDefault();
                                    const original_btn = document.getElementById("video-input");
                                    original_btn.click()
                                }}>Choose a file
                                </button>
                        
                            {
                                this.state.address && this.state.name && this.state.description ?
                                <button className = "form-button" onClick = {() =>{
                                    this.setState({address:''})
                                }} type="submit">Upload
                                </button>
                                :
                                <button className = "form-button" onClick = {(e) =>{
                                    e.preventDefault()
                                }} style = {{backgroundColor:'#E0E0E0', color:'#A6A6A6'}}>Upload</button>
                            }
                        </div>
                        :
                        <div>
                            <button className = "form-button" onClick = {(e) =>{
                                e.preventDefault()
                            }} style = {{backgroundColor:'#E0E0E0', color:'#A6A6A6'}}>Choose a file</button>
                            <button className = "form-button" onClick = {(e) =>{
                                e.preventDefault()
                            }} style = {{backgroundColor:'#E0E0E0', color:'#A6A6A6'}}>Upload</button>
                        </div>
                        }
                        </div>

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