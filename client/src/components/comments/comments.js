import React, { Component } from 'react';
import Comment from './comment';
import './comments.sass';
import CourseInfo from './courseInfo';

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state={
      category: '',
      orderBy: 'default',
      filterBy: 'default',
      searchBy: '',
      seekTime: null,
      currentTime: null,
      currentReply: null,
      isSearch: false,
      isSort: false,
      isSwap: false,
      showInfo: false,
    }
    this.copyRef = React.createRef()
  }

  swapComments = () => {
    const {isSwap} = this.state;
    this.setState({
      isSwap: !isSwap
    })
  }

  toggleInfo = () => {
    const { showInfo } = this.state;
    this.setState({
      showInfo: !showInfo
    })
  }

  toggleCustomSort = () => {
    const { isSort } = this.state;
    this.setState({
      isSort: !isSort
    })
  }

  handleSearchComments = () => {
    const {isSearch} = this.state; 
    this.setState({
      isSearch: !isSearch
    })
  }

  searchComments = (comments) => {
    const { searchBy } = this.state;
    if(searchBy) {
      return [...comments].filter(comment => comment.content.includes(searchBy))
    }
    return comments
  }

  filterComments = (comments) => {
    const { filterBy } = this.state;
    if(filterBy !== 'default') {
      return [...comments].filter(comment => comment.category === filterBy)
    }
    return comments
  }

  sortComments = (comments) => {
    const { orderBy } = this.state;
    switch(orderBy) {
      case 'like':
        return [...comments].sort((a, b) => a.like.length - b.like.length)
      case 'create':
        return [...comments].sort((a, b) => a.id - b.id)
      case 'time':
        return [...comments].sort((a, b) => a.time - b.time)
      case 'custom':
        return [...new Set([...comments].reduce((acc, parent) => {
          const arr = comments.reduce((acc, child) => {
            if(parent.id === child.parentId) {
              acc.push(child)
            }
            return acc
          }, [])
          arr.unshift(parent)
          acc.push(arr);
          return acc;
        }, []).flat())];
      default:
        return [...comments]
    }
  }

  getCommentsList = () => {
    const { courseId, getCommentsList } = this.props;
    const payload = {
      userId: '',
      courseId
    }
    getCommentsList(payload);
  }
  
  handleInputChange = (evt) => {
    this.setState({
      [evt.target.name] : evt.target.value
    })
  }

  handleDeleteComment  = (id) => {
    this.props.deleteComment(id)
  }


  handleUpdateComment = (id, comment) => {
    const {updateComment} = this.props;
    updateComment(id, comment);
  }

  handleTime = (time) => {
    const { player } = this.props;
    this.setState({
      currentTime: player && player.getCurrentTime(),
      seekTime: time
    })
    if(player) {
      player.seekTo(time);
      player.pauseVideo();
    }
  }

  transExport = (comments, url, title) => {
    let longText = '# '+title;
    comments.forEach(comment => {
      const time = this.handleTransTime(comment.time)
      longText += `
        [${time.min}:${time.sec}](${url}&t=${comment.time}s)
        ${comment.content}`
    })
    return longText;
  }

  handleTransTime = (time) => {
    const sec = Math.floor(time % 60);
    const min = Math.floor((time - sec)/60);
    return {
      sec,
      min
    }
  }

  copyExport = () => {
    this.copyRef.current.select();
    document.execCommand("Copy");
    alert('複製成功')
  }
  
  backToLast = () => {
    this.props.player.seekTo(this.state.currentTime)
  }

  componentDidMount() {
    const { isLoadingGetCommentsList } = this.props;
    !isLoadingGetCommentsList && this.getCommentsList();
    this.setState({
      comments: this.props.comments
    })
  }

  componentDidUpdate(prevProps) {
    const { 
      isLoadingCreateComment, 
      isLoadingDeleteComment,
      isLoadingUpdateComment } = this.props;
    if(isLoadingCreateComment !== prevProps.isLoadingCreateComment &&
      !isLoadingCreateComment) {
      this.getCommentsList();
    }
    if(isLoadingDeleteComment !== prevProps.isLoadingDeleteComment &&
      !isLoadingDeleteComment) {
      this.getCommentsList();
    }
    if(isLoadingUpdateComment !== prevProps.isLoadingUpdateComment &&
      !isLoadingUpdateComment) {
      this.getCommentsList();
    }
  }

  render() {
    const { 
      comments, 
      url, 
      title, 
      course, 
      users, 
      user,
      getUsers,
      updateCourse, getCourse, isLoadingUpdateCourse } = this.props;
    const { 
      orderBy, 
      filterBy, 
      searchBy, 
      isSearch, 
      isSwap, 
      seekTime, 
      currentTime,
      showInfo } = this.state;
    const time = this.handleTransTime(currentTime)
    const commentList = this.sortComments(this.filterComments(this.searchComments(comments)));
    if(isSwap) {
      commentList.reverse()
    }
    return (
      <div className='comments'>  
        {comments && commentList && 
          <textarea ref={this.copyRef} className='comments__export'
            onChange={this.handleChange}
            value={this.transExport(commentList, url, title)} />}              
        {seekTime && 
          <div className='board__now' onClick={this.backToLast}>
            回到剛剛瀏覽的位置 {time.min}:{time.sec}
          </div>}
        <div className='comments__nav'>
          <div className='nav__left'>
            <i className="material-icons" onClick={this.swapComments}>swap_vert</i>
            <select value={orderBy} name='orderBy' 
              className='select' onChange={this.handleInputChange}>
              <option value="default" disabled>筆記排序</option>
              <option value="time">影片時間</option>
              <option value="popular">讚數</option>
              <option value="create">建立時間</option>
              <option value="custom">子母留言</option>
            </select>
            <select value={filterBy} name='filterBy' 
              className='select' onChange={this.handleInputChange}>
              <option value="default">全部筆記</option>
              <option value="question">問題</option>
              <option value="note">筆記</option>
              <option value="idea">點子</option>
            </select>
          </div>
          <div className='nav__right'>
            <div onClick={this.handleSearchComments}><i className="material-icons">search</i></div>
            <div onClick={this.toggleInfo}><i className="material-icons">info</i></div>
            <div onClick={this.copyExport}>
              <i className="material-icons">vertical_align_bottom</i>
            </div>
          </div>
        </div>
        {isSearch && 
          <div className='nav__search'>
            <input type='text' onChange={this.handleInputChange}
              placeholder='搜尋留言'  
              value={searchBy} name='searchBy' className='input-text'/>
          </div>}
        <div className='comments__board'>
          {!showInfo && comments && commentList.length === 0 && 
            <div className='comments__add'>
              <div><i className="material-icons">fiber_new</i></div>
              <div>快來新增筆記:)</div>
            </div>
          }
          {showInfo && 
            <CourseInfo course={course} users={users} 
              getCourse={getCourse} isLoadingUpdateCourse={isLoadingUpdateCourse}
              getUsers={getUsers} updateCourse={updateCourse} toggleInfo={this.toggleInfo}/>}
          {!showInfo && comments && commentList && commentList.map((comment, idx) => 
            <Comment key={idx} 
              comment={comment} isCustom={orderBy==='custom'}
              userId={user.userId}
              handleDeleteComment={this.handleDeleteComment}
              handleUpdateComment={this.handleUpdateComment}
              handleReply = {this.props.handleReply}
              currentTime={seekTime} handleTime={this.handleTime}/>)}
        </div>
      </div>
    )
  }
}

export default Comments;

