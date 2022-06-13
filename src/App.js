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
const firebaseapp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseapp.auth();
const db = firebaseapp.database();
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
    };
    window.mainComponent = this;
  }
  render() {
    console.log(this.state.videos);
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} images={this.state.videos} />}
        />
        <Route exact path="/page1" component={Page1} />
      </Switch>
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

export function add_comment(path, comment){
  db.ref(path).push({
    comment:comment
  })
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);