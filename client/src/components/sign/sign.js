import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'; 
// import storage from '../../utlis/storage';
import './sign.sass';
class Sign extends Component{
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  handleInputChange = (evt) => {
    this.setState({
      [evt.target.name] : evt.target.value
    })
  }

  handleLoginForm = (evt) => {
    evt.preventDefault()
    const { match, history, login, createUser } = this.props;
    const { email, password } = this.state;
    const payload = {
      email,
      password
    }
    if(match.path === '/login') {
      login(payload);
    } else {
      createUser(payload);
    }
    console.log(payload)
    // history.push('/work')
  }

  render() {
    const {email, password} = this.state;
    const route = this.props.match.path
    return(
      <div className='sign'>
        <div className='sign___previous'>上一頁</div>
        <h1 className='sign__title'>{route === '/login' ? 'Login' : 'Register'}</h1>
        <form onSubmit={this.handleLoginForm}>
          <div className='sign__username'>
            Email <br /> <input type='text' name='email' value={email} 
              onChange={this.handleInputChange} />
          </div>
          <div className='sign__password'>
            密碼 <br /> <input type='password' name='password' value={password} 
              onChange={this.handleInputChange} />  
          </div>
          <button className='sign__btn' type='submit'>{route === '/login' ? '登入' : '註冊'}</button>
          <div className='sign__info'>
            {route === '/login' && 
            <div className='sign__forget'>忘記密碼？</div> }
            {route === '/login' && 
            <div className='sign__forget'>沒有帳號？</div> }
            {route === '/register' && <div className='sign__forget'>已有帳號？</div> }
          </div>
        </form>

      </div>
    )
  }
}

export default withRouter(Sign);
