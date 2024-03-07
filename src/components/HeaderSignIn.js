import React from 'react';
import SignOut from './SignOut';
import PropTypes from 'prop-types';


export default function HeaderSignIn(props) {

   const userName = props.activeUser;
   const user = props.userList.filter(user => user.name === userName)[0];

   const styles = { 
    backgroundColor: props.theme.buttonBackground, 
    color: props.theme.textColor 
  }
    return (
      <div className='header'>
        <span className='header-title'>
        <h3>LOGGER</h3>
        </span>
       
        <ul className='nav'>
          <li onClick={() => props.onNameClick()}>
        {user.firstName} {user.surname}
          </li>
          <li>
          <button className='toggle-theme'  onClick={props.toggleTheme} style={styles}>
          {props.theme.textColor === "#e5bcc4" ? "toggle light theme" : "toggle dark theme"}
          </button>
          </li>
          <li>
            <SignOut onSignOut={() => props.onSignOut()}/>
          </li>
        </ul>
      </div>
    )
  }

  HeaderSignIn.propTypes = {
    onSignOut: PropTypes.func,
    activeUser: PropTypes.string,
    userList: PropTypes.array,
    onNameClick: PropTypes.func,
    toggleTheme: PropTypes.func,
    theme: PropTypes.object
  }
