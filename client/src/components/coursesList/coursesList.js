import React, { Component } from 'react';
import HeaderContainer from '../../containers/header';
import CourseItem from './courseItem';
import Profile from '../profile';

import './coursesList.sass'

class CoursesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      title: '',
      description: '',
      showPublic: false,
      isCreate: false,
      message: '',
    }
  }

  handleInputChange = (evt) => {
    this.setState({
      [evt.target.name] : evt.target.value
    })
  }


  transUrl = (url) => {
    const base = url.split('?')[0];
    const query = url.split('?')[1].split('&')[0];
    return base+'?'+query
  }

  handleSubmitModal = (evt) => {
    evt.preventDefault()
    const {isCreate} = this.state;
    this.setState({
      isCreate: !isCreate,
    })
  }

  handleSubmit = (evt) =>{
    evt.preventDefault()
    const {url, title, description, isPublic, isCreate} = this.state;
    const {createCourse, user} = this.props;
    
    if(!title) {
      this.setState({
        message: '請輸入標題'
      })
    } else if(!url.includes('youtube')) {
      this.setState({
        message: '請輸入 youtube 網址'
      })
    } else {
      createCourse({
        url: this.transUrl(url),
        title,
        description,
        isPublic: isPublic === 'on' ? true : false,
        userId: user.userId,
      })
      this.setState({
        isCreate: !isCreate,
        message: '',
        title: '',
        description: '',
        url: ''
      })
    }
  }

  getCoursesList = () => {
    const { getCoursesList, match, user } = this.props;
      this.setState({
        showPublic: false
      })
      getCoursesList({userId: user.userId, isPublic: false});
  }

  componentDidMount() {
    const { isLoadingGetCoursesList, isLogin, setUser, match } = this.props;
    if(match.path === '/all') {
      !isLoadingGetCoursesList && this.getCoursesList();
    } else {
      if(isLogin) {
        this.getCoursesList();
      } else {
        setUser();
      }
    }
  }
  

  componentDidUpdate(prevProps) {
    const { 
      isLoadingCreateCourse,
      isLoadingUpdateCourse,
      isLoadingDeleteCourse,
      isLogin,
      match
    } = this.props;
    if(match.path !== prevProps.match.path) {
      this.getCoursesList();
    }
    if(isLogin !== prevProps.isLogin && isLogin) {
      this.getCoursesList();
    }
    if(isLoadingCreateCourse !== prevProps.isLoadingCreateCourse &&
      !isLoadingCreateCourse){
      this.getCoursesList()
    }
    if(isLoadingUpdateCourse !== prevProps.isLoadingUpdateCourse &&
      !isLoadingUpdateCourse){
      this.getCoursesList()
    }
    if(isLoadingDeleteCourse !== prevProps.isLoadingDeleteCourse &&
      !isLoadingDeleteCourse){
      this.getCoursesList()
    }
  }

  render() {
    const {
      courses, 
      user,
      getUser,
      isLogin,
      isLoadingUpdateUser,
      isLoadingGetCoursesList, 
      isLoadingCreateCourse,
      deleteCourse,
      updateCourse,
      updateUser} = this.props;
    const {isCreate, message, url} = this.state;
    const loading = isLoadingGetCoursesList || isLoadingCreateCourse;
    return(
      <div>
        <HeaderContainer />
        <div>
          {isCreate && 
            <form className='modal__video' onSubmit={this.handleSubmit}>
              <h1>影片資訊</h1>
              <div className='modal__message'>{message}</div>
              <p>標題</p>
              <input type='text' name='title' placeholder='必填：請輸入標題' onChange={this.handleInputChange}/>
              <p>敘述</p>
              <input type='text' name='description' placeholder='關於影片的敘述' onChange={this.handleInputChange}/>
              <div className='modal__nav'>
                <button type='submit'>送出</button>
                <div className='modal__cancel' onClick={this.handleSubmitModal}>cancel</div>
              </div>
            </form>}
          <div className='dashboard__create'>
            <form onSubmit={this.handleSubmitModal}>
              <input type='text' name='url' className='input-text' value={url}
                placeholder='輸入 youtube 網址' onChange={this.handleInputChange}></input>
              <button type='submit' className='button'><i className='material-icons md-18'>add_circle_outline</i></button>
            </form>
          </div>
          <div className='courses__board'>
            <div>
              {isLogin && 
                <Profile user={user} updateUser={updateUser} getUser={getUser}
                  isLoadingUpdateUser={isLoadingUpdateUser}/>}
              <hr/>   
              <div className='courses__list'>     
              {!loading && isLogin &&
                courses.filter(item => item.userId === user.userId)
                  .map((item, idx) => 
                  <CourseItem key={idx} courseItem={item}
                    isShare={false}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}/>)}
              </div>
            </div>
            <div>
              <h3>共筆課程</h3>
              <hr/>
              <div className='courses__list'>
                {!loading &&
                  courses.filter(item => item.userId !== user.userId)
                    .map((item, idx) => 
                    <CourseItem key={idx} isShare={true} courseItem={item} />)}
              </div>        
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CoursesList;

