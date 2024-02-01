import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from './../firebase.js';
import PropTypes from 'prop-types';

function SignOut(props) {
    const [signOutSuccess, setSignOutSuccess] = useState(null);

    function doSignOut() {
        signOut(auth)
        .then(function() {
         setSignOutSuccess('You have successfully signed out!');
         props.onSignOut();
        })
        .catch(function(error) {
            setSignOutSuccess(`There was an error when sign out: ${error.message}!`);
        })
}

return (
    <React.Fragment>
    <h2 className="sign-h2">Sign Out</h2>
    {signOutSuccess}
    <button className="sign-btn" onClick={doSignOut}>Sign Out!</button>
    </React.Fragment>
);
}

SignOut.propTypes = {
    onSignOut: PropTypes.func
}

export default SignOut;