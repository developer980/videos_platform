import React from "react";
import "./login.css";
import GoogleIcon from "../../icons/google.svg";
import { db } from "../../App";


//the login page

function Login(props){
    const{signInWithGoogle, history} = props;
    function handleGoogleLogin(){
        const s = signInWithGoogle();
        s.then(()=>{
            history.push("/");
            window.location.reload();
        });
        s.catch(()=>window.location.reload())
    }
    return(
        <div className = 'login-page'>
            <button onClick = {handleGoogleLogin} className="login-btn">
                Login with Google
                <img src={GoogleIcon} alt="" />
            </button>
        </div>
    )
}


export default Login;