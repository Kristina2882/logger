import React from 'react';
import PropTypes from 'prop-types';
import { GiUbisoftSun } from "react-icons/gi";
import { GiEvilMoon } from "react-icons/gi";
import { GiFeather } from "react-icons/gi";


export default function Header(props) {
  const styles = { 
    backgroundColor: props.theme.buttonBackground, 
    color: props.theme.buttonTextColor
  }

  const logoStyle = {
    backgroundColor: props.theme.inputBackground,
    color: props.theme.buttonTextColor
  }

    return (
      <div className='header'>
        <div className='header-title'  style={logoStyle}>
        <h3>LOGGER  <GiFeather className='feather'/> </h3> 
       
        </div>
       
        <ul className='nav'>
          <li>
          <button className='toggle-theme' onClick={props.toggleTheme} style={styles}>
          {props.theme.textColor === "#e5bcc4" ? <GiUbisoftSun className='sun'/> : <GiEvilMoon className='moon' />}
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
