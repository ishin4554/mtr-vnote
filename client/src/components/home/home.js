import React, { Component } from 'react';
import HeaderContainer from '../../containers/header';
import { Link, Route } from 'react-router-dom';
import storage from '../../utlis/storage';
import './home.sass';

class Home extends Component {
  constructor(props) {
    super(props)
  }

  setUser = () => {
    const {setUser} = this.props;
    const token = storage.getCookie('token');
    if(token) {
      setUser(token);
    } 
  }

  componentDidMount() {
    const {isLogin} = this.props;
    isLogin && this.setUser();
  }

  render() {
    return(
      <div className='home'>
        <HeaderContainer />
        <div className='landing'>
          <div className='landing__info'>
            <h1>VNote</h1>
            <h3>影片學習用的筆記服務</h3>
            <div className='cta__btn'>馬上註冊</div>
          </div>
        </div>
        <div className='feature'>
          <h1>特色</h1>
          <p>VNote 協助你跟著課程影片紀錄筆記並輕鬆結合其他筆記系統</p>
          <div className='feature__list'>
            <div>
              <div className='container'>
                <img src='https://i.imgur.com/KqmNTk1.png'></img>
              </div>
              
              <h2>時間紀錄</h2>
              <p>跟隨時間軸下筆記快速搜尋相關課程片段</p>
            </div>
            <div>
              <div className='container'>
                <img src='https://i.imgur.com/YAMcT5f.png'></img>
              </div>
              <h2>讀書會共筆</h2>
              <p>與讀書會的朋友一起修讀線上課程加速學習過程</p>
            </div>
            <div>
              <div className='container'>
                <img src='https://i.imgur.com/kgqfNpf.png'></img>
              </div>
              <h2>匯出 markdown</h2>
              <p>將筆記輸出成 markdown 格式方便其他軟體匯入</p>
            </div>
          </div>
        </div>
        <div className='cta'>
          <h3>立即開始免費使用</h3>
          <p>所有功能開放使用，持續開發新功能中！</p>
          <div className='cta__btn'>馬上註冊</div>
        </div>
      </div>
    )
  }
}

export default Home;

