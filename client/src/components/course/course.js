import React, { Component } from 'react';
import './course.sass';
import Video from '../../containers/video';
import Comments from '../../containers/comment';
import Editor from '../../containers/editor';
import Header from '../../containers/header';
import Loading from '../loading';

class Course extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id : '',
      currentReply: null,
      isLoadingVideo: true,
    }
    this.courseRef=React.createRef();
    this.editorRef=React.createRef();
  } 
  
  handleLoading = () => {
    this.setState({
      isLoadingVideo: false
    })
  }
  
  handleReply = (replyId) => {
    this.setState({
      currentReply: replyId
    })
  }

  getCourse = () => {
    const { getCourse } = this.props;
    const { match } = this.props;
    getCourse(match.params.id);
  }

  componentDidMount() {
    this.getCourse();
    this.props.setUser();
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if(match.params.id !== prevProps.match.params.id) {
      this.setState({
        id: match.params.id
      })
    }
  }

  render() {
    const { match, course, isLoadingGetCourse, user } = this.props;
    const { currentReply, isLoadingVideo } = this.state;
    const id = match.params.id;
    return(
      <div>
        {isLoadingGetCourse && isLoadingVideo && <Loading />}
        <Header />
        <div className='course' ref={this.courseRef}>
          {course &&
            <Video url={course.url} handleLoading={this.handleLoading}/>}
          {course &&
            <Editor courseId={id} userId={user.userId} link={currentReply}/>}
          {course &&
            <Comments courseId={id} url={course.url} title={course.title} handleReply={this.handleReply}/>}
        </div>
      </div>
    )
  }
}

export default Course;

