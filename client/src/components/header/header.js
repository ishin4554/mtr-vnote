import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import logo from '../../logo.svg';
import './header.sass';

class Header extends Component {
  handleLogout = () => {
    const {logout} = this.props;
    logout();
  }

  render() {
    const {isLogin, user} = this.props;
    return(
      <nav className='navigation'>
        <ul>
          <div className='logo'>
            <img src={logo} className="App-logo" alt="logo" />
            <Link to='/' className='link'><p>VNote</p></Link>
          </div>
          <div className='navigation__member'>
            {isLogin &&
              <Link to='/courses' className='link'>{user.nickname}'s dashboard</Link>}
            {!isLogin && 
              <Link className='link' to='/login'>Login</Link>}
            {!isLogin && 
            <Link className='link' to='/register'>Register</Link>}
            {isLogin && 
              <Link className='link' to='/' onClick={this.handleLogout}>Logout</Link>}
          </div>
        </ul>
      </nav>
    );
  }
}

export default Header;
