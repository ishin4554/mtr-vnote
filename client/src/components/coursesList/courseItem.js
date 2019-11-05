import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import time from '../../utlis/time';
class CourseItem extends Component {
  constructor(props) {
    super(props);
    this.state={
      handle: 'default',
      isEdit: false,
      showPublic: false,
      content: '',
    }
  }

  handleInputChange = (evt) => {
    this.setState({
      [evt.target.name] : evt.target.value
    })
  }

  toggleEditCourse = () => {
    const {courseItem} = this.props; 
    const {isEdit} = this.state;
    if(!isEdit) {
      this.setState({
        content: courseItem.title
      })
    }
    this.setState({
      isEdit: !isEdit
    })
  }

  handleUpdateSave = (evt) => {
    const {updateCourse, courseItem} = this.props;
    const {content} = this.state;
    evt.preventDefault();
    updateCourse(courseItem.id, {title: content})
    this.toggleEditCourse();
  }

  componentDidUpdate = (prevProps, prevState) => {
    const {handle} = this.state;
    const {deleteCourse, courseItem} = this.props;
    if(prevState.handle !== handle) {
      switch(handle){
        case 'delete': 
          deleteCourse(courseItem.id)
        case 'edit': 
          this.toggleEditCourse();
        default: 
          this.setState({
            handle: 'default'
          })
      }
      this.setState({
        handle: 'default'
      })
    }
  }

  render() {
    const {courseItem, isShare} = this.props;
    const {handle, isEdit, content} = this.state;
    const ytId = courseItem.url.split('v=')[1];
    const showTime = time.handleTransCreateTime(courseItem.updatedAt);
    return (
      <div className='course__item'>
        <div className='courseItem__container'>
          <div className={courseItem.isFinish ? 'tag isFinish': 'tag'}>
            {courseItem.isFinish ? '完成':'未完成'}
          </div>
          <Link to={'/course/'+courseItem.id}>
            <img className='courseItem__img' 
            src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} />
          </Link>
        </div>
        <div className='courseItem__info'>
          <div className='info'>
            {!isEdit && <div className='courseItem__name'>{courseItem.title}</div>}
            {!isEdit && isShare &&<div className='courseItem__user'>updated {showTime.time} {showTime.unit} ago by {courseItem.user.nickname}</div>}
            {!isEdit && !isShare &&<div className='courseItem__user'>{showTime.time} {showTime.unit} ago</div>}
          </div>
          {isEdit && 
            <div className='comment__edit'>
              <form onSubmit={this.handleUpdateSave}>
                <input type='text' onChange={this.handleInputChange}  
                  value={content} name='content' className='input-text'/>
                <div className='edit__nav'>
                  <div onClick={this.toggleEditCourse}>cancel</div>
                  <button type='submit'>Save</button>
                </div>
              </form>
            </div>
          }
          {!isEdit && !isShare &&
          <select value={handle} 
            onChange={this.handleInputChange} 
            name='handle' className='courseItem__handle select'>
            <option value="default" disabled>・・・</option>
            <option value="edit">編輯</option>
            <option value="delete">刪除</option>
          </select>}
        </div>
      </div>
    );
  }
}

export default CourseItem;
