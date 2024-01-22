import React from 'react';
import { Link } from 'react-router-dom';


export default function Header() {

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
          <Link className='menu-link'  to='sign-in'>Sign In</Link>
          </li>
        </ul>
      </div>
    )
  }

