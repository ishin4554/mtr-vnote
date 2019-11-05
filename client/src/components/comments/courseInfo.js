import React, { Component } from 'react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import './comments.sass';
import time from '../../utlis/time';

class ShareTag extends Component {
  constructor(props) {
    super(props)
    this.state={
      isChecked: false
    }
  }

  toggleTag = () => {
    const {isChecked} = this.state;
    this.setState({
      isChecked: !isChecked
    })
  }

  handleSetTag = (evt) => {
    this.props.handleTag(evt, {...this.props.user})
  }

  render() {
    const {user, handleTag} = this.props;
    const {isChecked} = this.state;
    return(
      <li className={isChecked ? 'share__tag isChecked' : 'share__tag'}>
        <label htmlFor={user.nickname} onClick={this.toggleTag}>
          {isChecked ? <i className='material-icons'>check</i> : ''}
          {user.nickname}
        </label>
        <input type='checkbox' value={user.id} 
          id={user.nickname} 
          onChange={this.handleSetTag}></input>
      </li>
    )
  }
}

class CourseInfo extends Component {
  constructor(props) {
    super(props)
    this.state={
      users: [],
      email: '',
      choosedList: [],
      isFinish: '',
      isEditDescription: false,
      isEditTitle: false,
      description: '',
      title: ''
    }
    this.handleInputTag$ = new Subject().pipe(debounceTime(300));
  }


  handleUpdateDescription = () => {
    const {updateCourse, course} = this.props;
    const {description} = this.state;
    updateCourse(course.id, {description})
    this.toggleEditDescription();
  }

  handleUpdateTitle = () => {
    const {updateCourse, course} = this.props;
    const {title} = this.state;
    updateCourse(course.id, {title})
    this.toggleEditTitle();
  }

  toggleEditDescription= () => {
    const {isEditDescription} = this.state
    const {course} = this.props
    this.setState({
      isEditDescription: !isEditDescription,
      description: course.description
    })
  }

  toggleEditTitle = () => {
    const {isEditTitle} = this.state;
    const {course} = this.props
    this.setState({
      isEditTitle: !isEditTitle,
      title: course.title
    })
  }


  handleInputChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }



  handleTag = (evt, user) => {
    const {choosedList} = this.state;
    const isChoosed = choosedList.find(item => item.id === user.id);
    if(isChoosed) {
      this.setState({
        choosedList: choosedList.filter(item => item.id !== user.id)
      })
    } else {
      this.setState({
        choosedList: [...choosedList, user]
      })
    }
  }

  handleSubmit = (evt) => {
    const {choosedList} = this.state;
    const {updateCourse, course} = this.props;
    evt.preventDefault();
    updateCourse(course.id, {shareList: choosedList})
  }

  handleUpdateFinish = () => {
    const {updateCourse, course} = this.props;
    updateCourse(course.id, {isFinish: !course.isFinish})
  }

  handleInputTag = (evt) => {
    const email = evt.target.value;
    this.setState({
      [evt.target.name]: email
    })
    email && this.handleInputTag$.next(email);
  }

  componentDidMount() {
    const {getUsers} = this.props;
    this.handleInputTag$
        .subscribe(debounced => getUsers({email: debounced}))
  }

  componentWillUnmount() {
    if (this.handleInputTag$) {
      this.handleInputTag$.unsubscribe();
    }
  }

  componentDidUpdate(prevProps) {
    const {users, course, isLoadingUpdateCourse} = this.props;
    if(prevProps.users !== users) {
      this.setState({
        users
      })
    }
    if(isLoadingUpdateCourse !== prevProps.isLoadingUpdateCourse &&
      !isLoadingUpdateCourse) {
      this.props.getCourse(course.id);
    }
  }

  render() {
    const { course } = this.props;
    const { users, 
      isEditDescription, 
      isEditTitle, 
      description,
      title } = this.state;
    const showTime = time.handleTransCreateTime(course.updatedAt);
    return (
      <div className='course__info'>
        <div className='info'>
          <h3>
            {!isEditTitle && course.title}
            {!isEditTitle && <i className='material-icons md-10'
              onClick={this.toggleEditTitle}>edit</i>}
            <span className={course.isFinish ? 'info__tag isFinish': 'info__tag'} 
            onClick={this.handleUpdateFinish}>
            {course.isFinish ? '完成課程': '尚未完成'}</span>
            {isEditTitle && 
              <div className='comment__edit'>
                <form onSubmit={this.handleUpdateTitle}>
                  <input type='text' name='title'
                    onChange={this.handleInputChange}
                    className='input-text' value={title}/>
                  <div className='edit__nav'>
                    <div onClick={this.toggleEditTitle}>cancel</div>
                    <button type='submit'>Save</button>
                  </div>
                </form>
              </div>}
          </h3>
          <span className='info__time'>updated by {course.user.nickname} {showTime.time} {showTime.unit} ago
          </span>
          {course.description && !isEditDescription &&
            <div>
              <p className='info__description'>{course.description}
              <i className='material-icons md-10'
              onClick={this.toggleEditDescription}>edit</i></p>
            </div>}
          {!course.description && !isEditDescription &&
            <p className='info__description'>新增影片敘述
              <i className='material-icons' onClick={this.toggleEditDescription}>add_circle_outline</i>
            </p>}
          {isEditDescription && 
            <div className='comment__edit'>
              <form onSubmit={this.handleUpdateDescription}>
                <input type='text' name='description'
                  onChange={this.handleInputChange}
                  className='input-text' value={description}/>
                <div className='edit__nav'>
                  <div onClick={this.toggleEditDescription}>cancel</div>
                  <button type='submit'>Save</button>
                </div>
              </form>
            </div>}
        </div>
        <hr />
        <div className='share'>
          <h4>共享權限</h4>
          <form onSubmit={this.handleSubmit}>
            <div className='share__input'>
              <input type='text' name='email'
                className='input-text'
                onChange={this.handleInputTag} 
                placeholder='輸入別人的 email' />
              <button type='submit'>確認新增</button>
            </div>     
            <ul>
              {users && users.map((user, idx) =>
                <ShareTag key={idx} user={user} handleTag={this.handleTag}/>
              )}
            </ul>
          </form>
        </div>
      </div>
    )
  }
}

export default CourseInfo;

