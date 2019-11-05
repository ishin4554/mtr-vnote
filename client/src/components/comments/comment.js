import React, { Component } from 'react';
import './comments.sass';

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdited: false,
      content: ''
    }
  }

  handleLike = (evt) => {
    evt.stopPropagation();
    const {handleUpdateComment, comment, userId} = this.props;
    const likes = comment.like;
    if(!likes.includes(userId)) {
      handleUpdateComment(comment.id, {like: [...likes, userId]})
    } else {
      handleUpdateComment(comment.id, {like: likes.filter(like => like !== userId)})
    }
  }
  

  handleInputChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleDeleteClick = () => {
    const {comment} = this.props;
    this.props.handleDeleteComment(comment.id)
  }

  handleUpdateSave = (evt) => {
    evt.preventDefault();
    const {comment} = this.props;
    const {content} = this.state;
    this.props.handleUpdateComment(comment.id, {content})
    this.toggleEditComment()
  }

  handleVideoTime = (evt) => {
    evt.stopPropagation()
    const { comment, currentTime } = this.props;
    if(currentTime !== comment.time) {
      const time = comment.time;
      this.props.handleTime(time)
    }
  }

  handleVideoReply = (evt) => {
    evt.stopPropagation()
    const { comment, handleReply } = this.props;
    handleReply(comment)
  }

  handleTransTime = (time) => {
    const sec = Math.floor(time % 60);
    const min = Math.floor((time - sec)/60);
    return {
      sec,
      min
    }
  }

  handleTransCreateTime = (timeStr) => {
    const transTime = new Date(timeStr);
    const passTime = (transTime.getTime() - Date.now())/1000;
    const time = {
      day: -Math.floor(passTime/60/60/24),
      hour: -Math.floor(passTime/60/60),
      minute: -Math.floor(passTime/60)
    }
    if(time.minute < 60) return {unit: 'minutes', time: time.minute}
    if(time.minute >= 60 && time.hour < 24) return {unit: 'hours', time: time.hour}
    if(time.hour >= 24) return {unit: 'days', time: time.day}
  }

  toggleEditComment= () => {
    const {isEdited} = this.state
    const {comment} = this.props
    this.setState({
      isEdited: !isEdited,
      content: comment.content
    })
  }

  render() {
    const {comment, currentTime, isCustom, userId} = this.props;
    const {isEdited, content} = this.state;
    const showTime = this.handleTransTime(comment.time);
    const time = this.handleTransCreateTime(comment.createdAt);
    const isLike = comment.like.includes(userId)
    return (
      <div className={currentTime === comment.time ? 'comment activeTime' : 'comment'} 
        onClick={this.handleVideoTime}>
        <div className='comment__info'>
          <div className='left'>
            <div className='comment__user'>{comment.user.nickname}</div>
            <div className='comment__createTime'>{time.time} {time.unit}</div>
          </div>
          {userId === comment.userId && <div className='comment__nav'>
            <div><i className='material-icons md-10' 
              onClick={this.handleDeleteClick}>delete</i></div>
            <div><i className='material-icons md-10'
              onClick={this.toggleEditComment}>edit</i></div>
          </div>}
        </div>
        <div className='comment__content'>
          {!isEdited && comment.parentId && isCustom && <i className='material-icons md-10'>subdirectory_arrow_right</i>}
          {!isEdited && <div className='comment__time'>
            {showTime.min}:{showTime.sec}
            <i className='material-icons'>access_time</i></div>}
          {!isEdited &&
            <div className='comment__category'>{comment.category}</div>}
          {!isEdited &&
            <div className='comment__text' data-value={comment.time} 
              onClick={this.handleVideoTime}>{comment.content}</div>}
          {isEdited && 
            <div className='comment__edit'>
              <form onSubmit={this.handleUpdateSave}>
                <input type='text' onChange={this.handleInputChange}  
                  value={content} name='content' className='input-text'/>
                <div className='edit__nav'>
                  <div onClick={this.toggleEditComment}>cancel</div>
                  <button type='submit'>Save</button>
                </div>
              </form>
            </div>
          }
        </div>
        {!isEdited && 
          <div className='comment__social'>
            <div className='social__btn' onClick={this.handleVideoReply} ><i className='material-icons md-10'>reply</i>  reply</div>
            <div className='social__btn' onClick={this.handleLike}>
              <i className={isLike ? 'material-icons isLike' : 'material-icons'}>thumb_up</i>
              <span className={isLike ? 'isLike' : ''}>{comment.like.length === 0 ? '' : comment.like.length}</span>
            </div>
          </div>
        }
      </div>
    )
  }
}
export default Comment;
