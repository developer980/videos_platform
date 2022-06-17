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
          <Route exact path="/page1" component={Page1} />
        </Switch>
      </div>
    );
  }
}

db.ref("/videos").on("value", (snapshot) => {
  window.mainComponent.setState({ videos: [] });
  window.mainComponent.setState({comments:[]});
  snapshot.forEach(function (childSnapshot) {

    const name = childSnapshot.val().name;
    const description = childSnapshot.val().description;
    const url = childSnapshot.val().url;
    const key = childSnapshot.key;
    const comment = childSnapshot.val().comments;
    console.log(comment);

    db.ref("videos/" + key + "/comments").on("value", (snapshot) => {
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
      },...prevstate.videos]
    };
   })
  });
});

export function upload(file, name, description) {
  st.ref(`files/${file.name}`).put(file).on("state_changed", snapshot =>{},
   error=>{console.log("error")}, 
   () =>{st.ref(`files/${file.name}`)
   .getDownloadURL()
   .then((url) => {db.ref("videos/")
   .push({
    name:name,
    url:url,
    description:description,
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