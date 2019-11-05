import React, { Component } from 'react';
import './profile.sass';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state={
      name: '',
      url: '',
      isEditName: false,
      isEditAvatar: false,
    }
  }

  toggleEditName = () => {
    const {isEditName} = this.state;
    const {user} = this.props
    this.setState({
      isEditName: !isEditName,
      name: user.nickname
    })
  }

  handleInputChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  toggleEditAvatar = () => {
    const {isEditAvatar} = this.state;
    const {user} = this.props
    this.setState({
      isEditAvatar: !isEditAvatar,
      url: user.url
    })
  }

  render() {
    const {user} =  this.props;
    const {isEditName, isEditAvatar, name, url} = this.state;
    return (
      <div className='profile'>
        <div className='profile__avatar'>
          {!isEditAvatar && <img src={user.url}></img>}
          {!isEditAvatar &&
            <i className='material-icons' onClick={this.toggleEditAvatar}>edit</i>
          }
        </div>
        {isEditAvatar && 
        <div className='comment__edit'>
          <form onSubmit={this.handleUpdateUrl}>
            <input type='text' name='title'
              onChange={this.handleInputChange}
              className='input-text' value={url}/>
            <div className='edit__nav'>
              <div onClick={this.toggleEditAvatar}>cancel</div>
              <button type='submit'>Save</button>
            </div>
          </form>
        </div>}
        {!isEditName && 
        <h2 className='profile__name'>{user.nickname} 的課程
          <i className='material-icons md-10'
              onClick={this.toggleEditName}>edit</i>
        </h2>}
        {isEditName && 
        <div className='comment__edit'>
          <form onSubmit={this.handleUpdateName}>
            <input type='text' name='title'
              onChange={this.handleInputChange}
              className='input-text' value={name}/>
            <div className='edit__nav'>
              <div onClick={this.toggleEditName}>cancel</div>
              <button type='submit'>Save</button>
            </div>
          </form>
        </div>}
      </div>
    );
  }
}

export default Profile;
