import React, { Component } from 'react';
import HeaderContainer from '../../containers/header';
import { Link, Route } from 'react-router-dom';
import './dashboard.sass'
class CourseItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {courseItem} = this.props;
    const ytId = courseItem.url.split('v=')[1];
    return (
      <div className='courseItem'>
        <Link to={'/course/'+courseItem.id} className='courseItem__container'>
          <i class="material-icons md-48">play_circle_filled</i>
          <div className='courseItem__img' 
          style={{'background-image': `url(https://img.youtube.com/vi/${ytId}/hqdefault.jpg)`}}></div>
        </Link>
        <div className='courseItem__info'>
          <p className='courseItem__name'>{courseItem.title}</p>
          <select value="default" name='handle' className='courseItem__handle select'>
            <option value="default" disabled>・・・</option>
            <option value="edit">編輯</option>
            <option value="delete">刪除</option>
          </select>
        </div>
      </div>
      
      
    );
  }
}

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id : 1,
    }
  }

  getCoursesList = () => {
    const { getCoursesList } = this.props;
    const { id } = this.state;
    getCoursesList(id);
  }

  componentDidMount() {
    const { isLoadingGetCoursesList } = this.props;
    !isLoadingGetCoursesList && this.getCoursesList();
  }

  render() {
    const {courses, isLoadingGetCoursesList} = this.props;
    return(
      <div>
        <HeaderContainer />
        <div className='dashboard'>
          <div className='dashboard__folder'></div>
          <div className='dashboard__info'>
            <div className='dashboard__nav'>
              <select value="default" name='filter' className='select'>
                <option value="default" disabled>filter</option>
                <option value="time">by video time</option>
                <option value="popular">by popular</option>
                <option value="create">by create time</option>
                <option value="custom">by custom</option>
              </select>
              <div><i class="material-icons md-18">search</i></div>
            </div>
            <div className='dashboard__create'>
              <form>
                <input type='text' name='url' className='input-text'
                  placeholder='輸入 youtube 網址'></input>
                <button type='submit'>送出</button>
              </form>
            </div>
          </div>
          <div className='coursesList'>        
            {courses && 
              courses.map(item => <CourseItem courseItem={item} />)}
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;

