import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export default function Header(props) {

    return (
      <div className='header'>
        <span className='header-title'>
        <Link className='menu-link' to='/'>LOGGER</Link>
        </span>
       
        <ul className='nav'>
          <li>
          <Link className='menu-link' to='/'>Home</Link>
          </li>
          <li>
          <Link className='menu-link'  to='sign-in'>{props.inOrOut}</Link>
          </li>
        </ul>
      </div>
    )
  }

  Header.propTypes = {
    inOrOut: PropTypes.string
  }

