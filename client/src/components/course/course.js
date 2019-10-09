import React, { Component } from 'react';
import './course.sass';
import Comments from '../../containers/comment';
import Editor from '../../containers/editor';
import HeaderContainer from '../../containers/header';

class CourseVideo extends Component {
  constructor(props) {
    super(props);
  }

  renderVideo = () => {
    const {course, handlePlayer} = this.props;
    const videoId = course.url.split('v=')[1];
    handlePlayer(new window.YT.Player('player', {
      videoId,
    })) 
  }

  componentDidMount() {
    if(!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      this.renderVideo();
    }
  }

  componentDidUpdate(prevProps) {
    const {course} = this.props;
    if(course !== prevProps.course) {
      this.renderVideo();
    }
  } 

  render() {
    const {course} = this.props;
    return (
      <div className='video'>
        {course && <div id='player'/>}
      </div>
    );
  }
}

class Course extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id : '',
      player: null,
    }
  }

  handlePlayer = (player) => {
    this.setState({
      player
    }) 
  }

  getCourse = () => {
    const { getCourse } = this.props;
    const { id } = this.state;
    getCourse(id);
  }

  componentDidMount() {
    const { isLoadingGetCourse } = this.props;
    !isLoadingGetCourse && this.getCourse();
  }

  componentDidUpdate(prevProps) {
    const { match, isLoadingGetCourse } = this.props;
    if(match.params.id !== prevProps.match.params.id) {
      this.setState({
        id: match.params.id
      })
    }
    // if(isLoadingGetCourse !== prevProps.isLoadingGetCourse && 
    //   !isLoadingGetCourse) {
    //   this.getCourse(this.state.id);
    // }
  }

  render() {
    const {course, isLoadingGetCourse} = this.props;
    const { id, player } = this.state;
    return(
      <div>
        <HeaderContainer />
        <div className='course'>        
          {!isLoadingGetCourse && <CourseVideo course={course[0]} handlePlayer={this.handlePlayer}/>}
          {!isLoadingGetCourse && <Editor player={player} courseId={id} userId={1}/>}
          {!isLoadingGetCourse && <Comments player={player} courseId={id} course={course}/>}
        </div>
      </div>
    )
  }
}

export default Course;

