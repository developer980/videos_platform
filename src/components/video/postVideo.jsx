import React from "react";
import "./postVideo.css";
import { upload } from "../../App";

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
        const setContent = (event) =>{
            event.preventDefault();
            upload(event.target[0].files[0], this.state.name, this.state.description);
        }
        return(
            <div className = "post">
                <div className="image-post">
                    <div className = "image-content" id = "file">
                        <video src={this.state.address}>
                            {/* <source src={this.state.address} type = "video/mp4"/> */}
                        </video>
                    </div>
                    <form action="" onSubmit={setContent}>
                    <input type="file" alt="place video" id = "video-input"/>
                    <button type="submit">upload</button>
                    </form>
                </div>
                <input type="text" className = "post-input" onChange={(event) => {this.setState({name:event.target.value})}}/>
                <input type="text" className = "post-input" onChange = {event => {this.setState({description:event.target.value})}}/>
            </div>
        )
    }
}

export default PostVideo;