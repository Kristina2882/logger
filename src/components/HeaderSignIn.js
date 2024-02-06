import React from 'react';
import SignOut from './SignOut';
import PropTypes from 'prop-types';


export default function HeaderSignIn(props) {

    return (
      <div className='header'>
        <span className='header-title'>
        <h3>LOGGER</h3>
        </span>
       
        <ul className='nav'>
          <li>
          User Profile
          </li>
          <li>
          Theme
          </li>
          <li>
            <SignOut onSignOut={() => props.onSignOut()}/>
          </li>
        </ul>
      </div>
    )
  }

  HeaderSignIn.propTypes = {
    onSignOut: PropTypes.func
  }
