import React from 'react';
import PropTypes from 'prop-types';


export default function Header(props) {

    return (
      <div className='header'>
        <span className='header-title'>
        <h3>LOGGER</h3>
        </span>
       
        <ul className='nav'>
          <li>
          <button onClick={props.toggleTheme}>Theme</button>
          </li>
        </ul>
      </div>
    )
  }

  Header.propTypes = {
    toggleTheme: PropTypes.func
  }
