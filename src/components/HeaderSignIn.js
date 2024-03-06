import React from 'react';
import SignOut from './SignOut';
import PropTypes from 'prop-types';


export default function HeaderSignIn(props) {

   const userName = props.activeUser;
   const user = props.userList.filter(user => user.name === userName)[0];

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
          <button onClick={props.toggleTheme}>Theme</button>
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
    toggleTheme: PropTypes.func
  }
