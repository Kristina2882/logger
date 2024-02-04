import React, {useState} from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import PropTypes from 'prop-types';

export default function SignUp(props) {
    const [signUpSuccess, setSignUpSuccess] = useState(null);

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
         props.onSignUp();
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
        </React.Fragment>
    );
}

SignUp.propTypes = {
    onSignUp: PropTypes.func
}