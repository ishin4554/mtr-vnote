import React, { Component } from 'react';
import './editor.sass';

const initialState = {
  content: '',
  category: 'default',
  parentId: null,
  courseId: null,
  time: 0,
  typing: false
}

class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      category: 'default',
      parentId: null,
      courseId: null,
      time: 0,
      typing: false
    }
    this.textareaRef = React.createRef();
  }

  handleInputChange = (evt) => {
    const { player } = this.props;
    if(player.getPlayerState() === 1) {
      player.pauseVideo();
      this.handleTime();
    } else {
      this.handleTime();
    }
    this.setState({
      [evt.target.name] : evt.target.value
    })
    this.autoGrowTextarea()
  }

  handleTime = () => {
    this.setState({
      time: this.props.player.getCurrentTime()
    })
  }
  handleTransTime = (time) => {
    const transTime = time || 0;
    if(transTime !== 0) {
      const sec = Math.floor(time % 60);
      const min = Math.floor((time - sec)/60);
      return {
        sec,
        min
      }
    }
    return {
      sec: 0,
      min: 0
    }
  }
  handleSubmit = (evt) => {
    const { category, content, time, parentId } = this.state;
    const { courseId, userId } = this.props;
    const originContent = this.stripeLinkStr(content);
    const comment = {
      category: category === 'default' ? 'no tag': category, 
      content: originContent,
      time,
      parentId,
      courseId,
      userId
    }
    evt.preventDefault();
    this.props.createComment(comment);
    this.props.player.playVideo();
    this.setState(initialState)
  }

  stripeLinkStr = (content) => {
    const {link} = this.props; 
    if(link) {
      const tag = '>'+link.content+'\n'
      return content.substr(content.indexOf(tag) + tag.length, content.length - 1)
    }
    return content
  }

  autoGrowTextarea = () => {
    const height = this.textareaRef.current.scrollHeight;
    this.textareaRef.current.style.height = height+'px';
  }

  componentDidUpdate(prevProps) {
    const {link, courseId} = this.props; 
    const {content, parentId} = this.state;
    const isReply = parentId && content.includes('>');
    if(link !== prevProps.link && link && !isReply) {
      const tag = '>'+link.content+'\n'
      this.setState({
        content: tag.concat(content),
        parentId: link.id
      })
    }
    if(courseId !== prevProps.courseId) {
      this.setState({
        courseId
      })
    }
  } 

  render() {
    const {content, category} = this.state
    const time = this.handleTransTime(this.state.time)
    return(
      <div className='editor'>
        <form onSubmit={this.handleSubmit}>
          <textarea name='content' value={content} 
                ref={this.textareaRef}
                onChange={this.handleInputChange} 
                placeholder='文章內容'/>
          <button type='submit' className='button'>
            <i className='material-icons md-18'>add_circle_outline</i>
          </button>   
          <div className='editor__nav'>
            <div className='editor__time'>
              <i className='material-icons md-12'>access_time</i>
              <p>{`${time.min}:${time.sec}`}</p>
            </div>
            <select value={category} name='category' 
              className='select' onChange={this.handleInputChange}>
              <option value="default" disabled>筆記種類：</option>
              <option value="note">筆記</option>
              <option value="question">問題</option>
              <option value="idea">點子</option>
            </select>
          </div>
        </form>
      </div>
    )
  }
}

export default Editor;

