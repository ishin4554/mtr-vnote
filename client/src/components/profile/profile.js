import React, { Component } from 'react';
import './profile.sass';
import { updateCourse, getUser } from '../../utlis/api';

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

  updateAvatar = (evt) => {
    evt.preventDefault();
    const {url} = this.state;
    const {updateUser, user} = this.props;
    updateUser(user.userId, {url});
    this.toggleEditAvatar();
  }

  updateNickname = (evt) => {
    evt.preventDefault();
    const {name} = this.state;
    const {updateUser, user} = this.props;
    updateUser(user.userId, {nickname: name});
    this.toggleEditName();
  }

  componentDidUpdate(prevProps) {
    const {isLoadingUpdateUser, getUser, user} = this.props;
    if(isLoadingUpdateUser !== prevProps.isLoadingUpdateUser && !isLoadingUpdateUser) {
      getUser(user.userId);
    }
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
          <form onSubmit={this.updateAvatar}>
            <input type='text' name='url'
              onChange={this.handleInputChange}
              className='input-text' value={url}/>
            <p>註：請輸入圖片網址</p>
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
          <form onSubmit={this.updateNickname}>
            <input type='text' name='name'
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
