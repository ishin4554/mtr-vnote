import React, { Component } from 'react';
import ExportModal from './exportModal';
import course from '../../containers/course';
import './comments.sass';

class Comment extends Component {
  constructor(props) {
    super(props)
  }
  handleVideoTime = (evt) => {
    const time = evt.target.attributes['data-value'].value;
    this.props.handleTime(time)
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
    if(time.minute > 60 && time.hour < 24) return {unit: 'hours', time: time.hour}
    if(time.hour > 24) return {unit: 'days', time: time.day}
  }

  render() {
    const {comment} = this.props;
    const showTime = this.handleTransTime(comment.time);
    const time = this.handleTransCreateTime(comment.createdAt);
    return(
      <div className='comment'>
        <div className='comment__info'>
          <div className='comment__user'>{comment.userId}</div>
          <div className='comment__createTime'>{time.time} {time.unit}</div>
        </div>
        <div className='comment__content'>
          <div className='comment__time'>{showTime.min}:{showTime.sec}</div>
          <div className='comment__category'>{comment.category}</div>
          <div className='comment__text'data-value={comment.time} onClick={this.handleVideoTime}>{comment.content}</div>
        </div>
      </div>
    )
  }
}

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state={
      category: '',
      showExport: false,
    }
  }

  setVideoTime = (time) => {
    this.props.player.seekTo(time);
    this.props.player.playVideo();
  }

  getCommentsList = () => {
    const { courseId, getCommentsList } = this.props;
    const payload = {
      userId: 1,
      courseId
    }
    getCommentsList(payload);
  }

  showExport = () => {
    const {showExport} = this.state;
    this.setState({
      showExport: !showExport
    }) 
  }

  componentDidMount() {
    const { isLoadingGetCommentsList } = this.props;
    !isLoadingGetCommentsList && this.getCommentsList();
  }

  componentDidUpdate(prevProps) {
    const { isLoadingCreateComment } = this.props;
    if(isLoadingCreateComment !== prevProps.isLoadingCreateComment) {
      this.getCommentsList();
    }
  }

  render() {
    const {comments} = this.props;
    return(
      <div className='comments'>
        <div className='comments__nav'>
          <select value="default" name='filter'>
            <option value="default" disabled>filter</option>
            <option value="time">by video time</option>
            <option value="popular">by popular</option>
            <option value="create">by create time</option>
            <option value="custom">by custom</option>
          </select>
          <div className='nav__right'>
            <div><i class="material-icons md-18">search</i></div>
            <div onClick={this.showExport}><i class="material-icons md-18">vertical_align_bottom</i></div>
          </div>
        </div>
        {this.state.showExport && <ExportModal url={course.url} comments={comments} />}
        <div className='comments__board'>
          {comments && 
            comments.map((comment, idx) => <Comment key={idx} comment={comment} handleTime={this.setVideoTime}/>)}
        </div>
      </div>
    )
  }
}

export default Comments;

