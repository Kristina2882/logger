import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './../firebase.js';
import { db } from "./../firebase.js";
import { addDoc, collection } from "firebase/firestore";
import PropTypes from 'prop-types';

function SignIn(props) {
    const [signUpSuccess, setSignUpSuccess] = useState(null);
    const [signInSuccess, setSignInSuccess] = useState(null);

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

    function doSignUp(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const firstName = event.target.firstName.value;
        const surname = event.target.surname.value;
        const dob = event.target.dob.value;


        addDoc(collection(db, 'users'), {name: email, firstName: firstName, surname: surname, dob: dob});
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
         setSignUpSuccess(`You have successfully signed up, ${userCredential.user.email}!`);
         props.onSignIn();
        })
        .catch((error) => {
        setSignUpSuccess(`There was an error when sign up: ${error.message}!`);
        });
    }

    return (
        <React.Fragment>
            <h2 className="sign-h2">Sign Up</h2>
            {signUpSuccess}
            <form className="sign-form" onSubmit={doSignUp}>
            <input
            name="email"
            type="email"
            placeholder="Enter your email"
            />
             <input
            name="password"
            type="password"
            placeholder="Enter your password"
            />
             <input
            name="firstName"
            type="text"
            placeholder="Enter your first name"
            />
             <input
            name="surname"
            type="text"
            placeholder="Enter your surnname"
            />
             <input
            name="dob"
            type="date"
            placeholder="Select your date of birth"
            />


            <button type="submit" className="sign-btn">Sign Up!</button>
            </form>

            <h2 className="sign-h2">Sign In</h2>
            {signInSuccess}
            <form className="sign-form"  onSubmit={doSignIn}>
            <input
            name="email"
            type="email"
            placeholder="Enter your email"
            />
             <input
            name="password"
            type="password"
            placeholder="Enter your password"
            />
            <button type="submit" className="sign-btn">Sign In!</button>
            </form>

        </React.Fragment>
    );
}

SignIn.propTypes = {
 onSignIn: PropTypes.func
}

export default SignIn;