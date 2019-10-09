import { Link, Route } from 'react-router-dom';
import React, { Component } from 'react';
import './header.sass';

class Header extends Component {
  render() {
    return(
      <nav className='navigation'>
        <ul>
          <li>Dashboard</li>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </ul>
      </nav>
    );
  }
}

export default Header;
