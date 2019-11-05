import React, { Component } from 'react';
import './video.sass';

window.onYouTubeIframeAPIReady = (cb) => {
  cb && cb()
}

class Video extends Component {
  constructor(props) {
    super(props);
  }

  renderApi = () => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  renderVideo = () => {
    const {course, setPlayer} = this.props;
    const videoId = course.url.split('v=')[1];
    if(!window.YT) {
      this.renderApi();
    } else {
      setPlayer(new window.YT.Player('player', {
        width: 720,
        height: 480,
        videoId,
        events: {
          'onReady': (event) => {
            event.target.playVideo();
            this.props.handleLoading();
          },
        }
      }));
    }
  }

  componentDidMount() {
    window.onYouTubeIframeAPIReady(this.renderVideo);
  }  

  render() {
    return (
      <div className='modal'>
        <div id='player'/>
      </div>
    );
  }
}

export default Video;
