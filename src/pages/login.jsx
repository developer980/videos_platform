import React from "react";

function Login(props){
    const{signInWithGoogle, history} = props;
    function handleGoogleLogin(){
        const s = signInWithGoogle();
        s.then(()=>{history.push("/")});
    }
    return(
        <div>
            <button onClick = {handleGoogleLogin} className="Login">
                Login with Google
            </button>
        </div>
    )
}


export default Login;