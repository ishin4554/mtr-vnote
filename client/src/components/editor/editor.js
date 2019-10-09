import React, { Component } from 'react';
import './editor.sass';

class SelectEditor extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = (evt) => {
    this.props.handleCategory(evt);
  }

  render() {
    const { categories, info } = this.props;
    return (
      <select value={this.props.default || "DEFAULT"} 
        onChange={this.handleChange} name='category'>
        <option value="DEFAULT" disabled>{info}</option>
        {categories.map(category => {
          return <option value={category}>{category}</option>
        })}
      </select>
    )
  }
}
class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      category: '',
      time: 0,
      typing: false
    }
  }

  handleInputChange = (evt) => {
    this.props.player.pauseVideo();
    this.handleTime();
    this.setState({
      [evt.target.name] : evt.target.value
    })
  }

  handleTime = () => {
    this.setState({
      time: this.props.player.getCurrentTime()
    })
  }

  handleSubmit = (evt) => {
    const { category, content, time } = this.state;
    const { courseId, userId } = this.props;
    const comment = {
      category, 
      content, 
      time,
      courseId,
      userId
    }
    evt.preventDefault();
    this.props.createComment(comment);
    this.props.player.playVideo();
  }

  render() {
    const {content} = this.state
    console.log(this.state);
    return(
      <div className='editor'>
        <form onSubmit={this.handleSubmit}>
          <textarea name='content' value={content} 
                onChange={this.handleInputChange} 
                placeholder='文章內容'/>
          <div className='editor__nav'>
            <div className='editor__time'>{this.state.time}</div>
            <SelectEditor categories={['note','question','idea']} 
              handleCategory={ this.handleInputChange }
              info={'筆記種類'} />
            <button type='submit'> 送出 </button>
          </div>   
        </form>
      </div>
    )
  }
}

export default Editor;

