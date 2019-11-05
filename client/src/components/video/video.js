import React, { Component } from 'react';
import './video.sass';
let resizeId;
class Video extends Component {
  constructor(props) {
    super(props);
    this.videoContainer = React.createRef();
  }

  renderApi = () => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  renderVideo = () => {
    const {setPlayer} = this.props;
    if(!window.YT) {
      this.renderApi();
    } else {
      setPlayer(new window.YT.Player('player', {
        events: {
          'onReady': this.loadVideo
        }      
      }));
    }
  }

  loadVideo = (evt) => {
    const {url} = this.props;
    const videoId = url.split('v=')[1];
    evt.target.loadVideoById(videoId);
    this.setVideoSize(evt);
  }

  setVideoSize = (evt) => {
    const {player} = this.props;
    const width = this.videoContainer.current.offsetWidth;
    player.setSize(width, width*9/16);
  }

  resizeSetSize = () => {
    clearTimeout(resizeId);
    resizeId = setTimeout(this.setVideoSize, 500);
  }

  componentDidMount() {
    this.renderVideo();
    window.onYouTubeIframeAPIReady = () => {
      this.renderVideo()
    }
    window.addEventListener('resize', this.resizeSetSize);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeSetSize)
  }

  render() {
    return (
      <div className='video' ref={this.videoContainer}>
        <div id='player'/>
      </div>
    );
  }
}

export default Video;
