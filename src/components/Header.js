import React from 'react';
import PropTypes from 'prop-types';


export default function Header(props) {

  const styles = { 
    backgroundColor: props.theme.buttonBackground, 
    color: props.theme.buttonTextColor
  }

    return (
      <div className='header'>
        <span className='header-title'>
        <h3>LOGGER</h3>
        </span>
       
        <ul className='nav'>
          <li>
          <button className='toggle-theme' onClick={props.toggleTheme} style={styles}>
          {props.theme.textColor === "#e5bcc4" ? "toggle light theme" : "toggle dark theme"}
          </button>
          </li>
        </ul>
      </div>
    )
  }

  Header.propTypes = {
    toggleTheme: PropTypes.func,
    theme: PropTypes.object
  }
