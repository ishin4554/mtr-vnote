import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import './index.sass';
import AuthContainer from './containers/auth';

ReactDOM.render(
  <Provider store = {store}>
    <AuthContainer>
      <App />
    </AuthContainer>
  </Provider>, 
document.getElementById('root'));
