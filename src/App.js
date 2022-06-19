import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/home";
import { Switch, Route } from "react-router-dom";
import Page1 from "./pages/page1";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import firebaseConfig from "./configs/firebaseConfig";
import { database } from "firebase/database";
import * as assets from "firebase/storage";
import { firestore } from "firebase/firestore";
import "firebase/auth";
import Login from "./pages/login";
import { VideoPage } from "./pages/videoPage";
import { Profile } from "./pages/profile";

export const firebaseapp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseapp.auth();
export const db = firebaseapp.database();
const st = firebaseapp.storage();
const fs = firebaseapp.firestore();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      comments:[]
    };
    window.mainComponent = this;
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
              />)}
          />

          <Route path = "/login" render = {(props)=>(
            <Login {...props} 
            user = {this.user}
            signInWithGoogle = {this.props.signInWithGoogle}
          />)}></Route>

          <Route path = "/:videoid=>:videoName" render = {(props) => (
            <VideoPage {...props} 
            user = {this.props.user}
            videos = {this.state.videos}
            comments = {this.state.comments}/>
          )}/>
          <Route path = "/profile" render={(props) =>(
            <Profile {...props} 
            user = {this.props.user}
            videos = {this.state.videos}
            comments = {this.state.comments}/>
          )}/>
        </Switch>
      </div>
    );
  }
}

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
    //console.log(comment);

    db.ref("videos/" + key + "/comments").on("value", (snapshot) => {
      
  window.mainComponent.setState({comments:[]});
      snapshot.forEach(function(childSnapshot){
        const newKey = childSnapshot.key;
        console.log(childSnapshot.val());
        window.mainComponent.setState((prevstate) => {
          return{
            comments:[{...childSnapshot.val(), newKey:newKey}, ...prevstate.comments]
          };
        })
      })
    })
   window.mainComponent.setState((prevstate) => {
    return{
      videos: [ {
        name,
        description,
        url,
        key,
        comments,
        username,
        userId
      },...prevstate.videos]
    };
   })
  });
});

export function upload(file, name, description, user) {
  st.ref(`files/${file.name}`).put(file).on("state_changed", snapshot =>{},
   error=>{console.log("error")}, 
   () =>{st.ref(`files/${file.name}`)
   .getDownloadURL()
   .then((url) => {   
    // const username = window.mainComponent.props.user.displayname;
    db.ref("videos/")
   .push({
    name:name,
    url:url,
    description:description,
    username:user.displayName,
    uid:user.uid
   })
  }
  )});
}

export function add_comment(path, comment, username){
  console.log(path);
  db.ref(path).push({
    comment:comment,
    path:path,
    user:username
  })
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);