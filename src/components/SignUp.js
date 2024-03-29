import React, {useContext, useState} from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import PropTypes from 'prop-types';
import { ThemeContext } from '../theme-context';

export default function SignUp(props) {
    const [signUpSuccess, setSignUpSuccess] = useState(null);

    const theme = useContext(ThemeContext);

    const inputStyle = {
        backgroundColor: theme.inputBackground
    }

    function doSignUp(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const firstName = event.target.firstName.value;
        const surname = event.target.surname.value;
        const dob = event.target.dob.value;
        const status = "regular";
      
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
         setSignUpSuccess(`You have successfully signed up, ${userCredential.user.email}!`);
         props.onSignUp( {name: email, firstName: firstName, surname: surname, dob: dob, status: status});

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
            style={inputStyle}
            />
             <input
            name="password"
            type="password"
            placeholder="Enter your password"
            style={inputStyle}
            />
             <input
            name="firstName"
            type="text"
            placeholder="Enter your first name"
            style={inputStyle}
            />
             <input
            name="surname"
            type="text"
            placeholder="Enter your surnname"
            style={inputStyle}
            />
             <input
            name="dob"
            type="date"
            placeholder="Select your date of birth"
            style={inputStyle}
            />

            <button type="submit" className="sign-btn">Sign Up!</button>
            </form>
        </React.Fragment>
    );
}

SignUp.propTypes = {
    onSignUp: PropTypes.func
}