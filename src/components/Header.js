import React from 'react';
import PropTypes from 'prop-types';
import { GiUbisoftSun } from "react-icons/gi";
import { GiEvilMoon } from "react-icons/gi";


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
          {props.theme.textColor === "#e5bcc4" ? <GiUbisoftSun /> : <GiEvilMoon />}
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
