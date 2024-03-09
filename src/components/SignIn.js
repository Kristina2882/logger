import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './../firebase.js';
import PropTypes from 'prop-types';
import { ThemeContext } from "../theme-context.js";

function SignIn(props) {
    const [signInSuccess, setSignInSuccess] = useState(null);

    const theme = useContext(ThemeContext);
    const inputStyle = {
        backgroundColor: theme.inputBackground
    }

    function doSignIn(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setSignInSuccess(`You have successfully signed in, ${userCredential.user.email}!`);
            props.onSignIn();
        })
        .catch((error) => {
            setSignInSuccess(`There was an error when sign in: ${error.message}!`);
        })

        
    }

    return (
        <React.Fragment>

            <h2 className="sign-h2">Sign In</h2>
            {signInSuccess}
            <form className="sign-form"  onSubmit={doSignIn}>
            <input
            name="email"
            type="email"
            placeholder="Enter your email"
            style={inputStyle}
            />
             <input
            name="password"
            type="password"
            placeholder="Enter your password"
            style={inputStyle}
            />
            <button type="submit" className="sign-btn">Sign In!</button>
            </form>
            <button className="sign-btn" onClick={() => props.onRegisterClick()}>Register</button>

        </React.Fragment>
    );
}

SignIn.propTypes = {
 onSignIn: PropTypes.func,
 onRegisterClick: PropTypes.func
}

export default SignIn;