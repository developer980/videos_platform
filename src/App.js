import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/home/home";
import { Switch, Route } from "react-router-dom";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import firebaseConfig from "./configs/firebaseConfig";
import { database } from "firebase/database";
import * as assets from "firebase/storage";
import { firestore } from "firebase/firestore";
import "firebase/auth";
import Login from "./pages/login/login";
import VideoPage from "./pages/videoPage/videoPage";
import { Profile } from "./pages/profile/profile";

export const firebaseapp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseapp.auth();
export const db = firebaseapp.database();
export const st = firebaseapp.storage();
export const fs = firebaseapp.firestore();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      comments:[],
      likes:[]
    };
    window.mainComponent = this;
  }


  

  componentDidMount(){
    
    //Reads the videos from firebase once the page is (re)loaded
    db.ref("/videos").once("value", (snapshot) => {
      window.mainComponent.setState({ videos: [] });
      snapshot.forEach(function (childSnapshot) {
    
        const name = childSnapshot.val().name;
        const description = childSnapshot.val().description;
        const url = childSnapshot.val().url;
        const key = childSnapshot.key;
        const comments = childSnapshot.val().comments;
        const username = childSnapshot.val().username;
        const userId = childSnapshot.val().uid;
    
       window.mainComponent.setState((prevstate) => {
        return{
          videos: [ {
            name,
            description,
            url,
            key,
            comments,
            username,
            userId,
          },...prevstate.videos]
        };
       })
      });
    })


    //Sets up a listener in order to get in the realtime, data about the comments and number iof likes for each video

    db.ref("/videos").on("value", (snapshot) => {
      this.setState({comments:[]});
      this.setState({likes:[]})
      snapshot.forEach(childSnapshot =>{
        console.log(childSnapshot.val().comments)
        const comments = childSnapshot.val().comments;
        const likes = childSnapshot.val().likes;

        if(comments){
          Object.entries(comments).map(([key, value]) => {
            this.setState(prevState => {
              return{
                comments:[{...value, newKey:key}, ...prevState.comments],
              }
            })
          })
        }

        if(likes){
          Object.entries(likes).map(([key, value]) => {
            this.setState(prevState => { 
              return{
                likes:[{...value, key:key}, ...prevState.likes]
              }
            })
          })
        }
        console.log(childSnapshot.val().likes)
      })
    })
  }



  render() {
    console.log(this.state);
    
    return (
      <div className = "app">
        <Switch>
            <Route
              exact
              path="/"
              render={(props) => (<Home 
                {...props} 
                user = {this.props.user}
                videos={this.state.videos}
                comments = {this.state.comments}
                likes = {this.state.likes}
                signOut = {this.props.signOut}
                />)}
            />
            
          <Route exact path = "/login" render = {(props)=>(
            <Login {...props} 
            user = {this.user}
            signInWithGoogle = {this.props.signInWithGoogle}
          />)}></Route>


          <Route path = "/:videoid=>:videoName" render = {(props) => (
            <VideoPage {...props} 
            user = {this.props.user}
            videos = {this.state.videos}
            comments = {this.state.comments}
            likes = {this.state.likes}
            signOut = {this.props.signOut}/>
          )}/>

          <Route path = "/profile->:username" render={(props) =>(
            <Profile {...props} 
            user = {this.props.user}
            videos={this.state.videos}
            comments = {this.state.comments}
            likes = {this.state.likes}
            signOut = {this.props.signOut}/>
          )}/>
        </Switch>
      </div>
    );
  }
}



//This function is called in order to upload a comment to the realtime database

export function add_comment(path, comment, username){
  console.log(path);
  db.ref(path).push({
    comment:comment,
    path:path,
    user:username,
    uid:window.mainComponent.props.user.uid
  })
}


//This function is called in order to upload like for a specified video

export function add_like(path){
  db.ref(`videos/${path}/likes`).push({
    like:"like",
    from:window.mainComponent.props.user.uid,
    path:path
  })
}



/*
This function is used to upload a video on the firebase storage
*/

export function upload(file, name, description, user) {
  st.ref(`files/${file.name}`).put(file).on("state_changed", snapshot =>{},
   error=>{console.log("error")}, 
   () =>{st.ref(`files/${file.name}`)
   .getDownloadURL()
   .then((url) => {   

    /* 
    This section creates a slot in the realtime database when the video is uploaded to storage
    Which reprezents an object containing the URL to the video's location on the storage and also 
    the comments and likes section
     */
    db.ref("videos/")
    .push({
        name:name,
        url:url,
        description:description,
        username:user.displayName,
        likes:[],
        uid:user.uid
    }).then(()=> {
      window.location.reload()
    });
  }
  )})
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
