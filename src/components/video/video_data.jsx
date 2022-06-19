import React from "react";
import "./video_data.css";
import Like from "../../icons/like.svg";
import Comment from "../../icons/comment.svg";

class Video_data extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            comments:false,
            title:"hidden",
            title_height:"40px",
            description:"hidden",
            description_height:"30px"
        }
    }

    render(){
        const{name, description} = this.props;
        return(
            <div>
                <div id = "title" className = "vid-data" style = {{overflow:this.state.title, height:this.state.title_height}}>
                    {name}
                </div>
                {
                    this.state.title == "hidden" ?
                        <button className = "show-hide" onClick={()=>{
                            this.setState({title:"visible"});
                            this.setState({title_height:"fit-content"})
                        }}>Show more</button>
                        :
                        <button className = "show-hide" onClick={()=>{
                            this.setState({title:"hidden"});
                            this.setState({title_height:"40px"})
                        }}>Show less</button>
                }
                <div id = "description" className = "desc" style={{overflow:this.state.description, height:this.state.description_height}}>
                    {description}
                </div>
                {
                    this.state.description == "hidden" ?
                        <button className = "show-hide" onClick={()=>{
                            this.setState({description:"visible"});
                            this.setState({description_height:"fit-content"})
                        }}>Show more</button>
                        :
                        <button className = "show-hide" onClick={()=>{
                            this.setState({description:"hidden"});
                            this.setState({description_height:"30px"})
                        }}>Show less</button>

                }
            </div>
        )
    }
}

export default Video_data;