import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import './header.sass';

class Header extends Component {
  render() {
    return(
      <nav className='navigation'>
        <ul>
          <li>Dashboard</li>

          <div className='navigation__member'>
            <Link className='link' to='/login'>Login</Link>
            <Link className='link' to='/register'>Register</Link>
          </div>
        </ul>
      </nav>
    );
  }
}

export default Header;
