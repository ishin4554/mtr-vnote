import { ActionTypes } from "../actions";
import storage from '../utlis/storage';
import jwtDecode from "jwt-decode";

const defaultState = {
  user: {},
  users: [],
  isLogin: false,
  isLoadingCreateUser: false,
  isLoadingLogin: false,
  isLoadingGetUser: false,
  isLoadingGetUsers: false,
  isLoadingUpdateUser: false,
  loadingCreateUserError: null,
  loadingLoginError: null,
  loadingGetUsersError: null, 
  loadingGetUserError: null,
  updateUserError: null,
};

function userReducers(state = defaultState, action) {
  switch(action.type){
    case ActionTypes.GET_USER:
      return {
        ...state,
        isLoadingGetUser: true
      }

    case ActionTypes.GET_USER_RESULT:
      return {
        ...state,
        user: {...action.user, userId: action.user.id},
        isLoadingGetUser: false
      }

    case ActionTypes.GET_USER_FAILED:
      alert(action.error.message)
      return {
        ...state,
        loadingGetUserError: action.error
      }

    case ActionTypes.GET_USERS:
      return {
        ...state,
        isLoadingGetUsers: true
      }

    case ActionTypes.GET_USERS_RESULT:
      return {
        ...state,
        users: action.users,
        isLoadingGetUsers: false
      }

    case ActionTypes.GET_USERS_FAILED:
      alert(action.error.message)
      return {
        ...state,
        loadingGetUsersError: action.error
      }

    case ActionTypes.SET_USER:
      const token = storage.getCookie('token')
      const { exp } = jwtDecode(token);
      const isExpired = Date.now() / 1000 > exp;
      if(token && !isExpired) {
        return {
          ...state,
          user: jwtDecode(token).payload,
          isLogin: true,
        }
      } else {
        alert('token 逾期，請重新登入')
        window.location='/#/login'
        return {
          ...state,
          user: null,
          isLogin: false,
        }
      }

    case ActionTypes.UPDATE_USER: 
      return {
        ...state,
        isLoadingUpdateUser: true
      }

    case ActionTypes.UPDATE_USER_RESULT:
      if(action.error) {
        alert(action.error.message);
      }
      return {
        ...state,
        isLoadingUpdateUser: false,
        updateUserError: action.error
      } 

    case ActionTypes.LOGOUT:
      storage.removeCookie();
      alert('登出成功')
      return {
        ...state,
        user: null,
        isLogin: false
      }

    case ActionTypes.LOGIN:
      return {
        ...state,
        isLoadingLogin: true
      }

    case ActionTypes.LOGIN_RESULT:
      return {
        ...state,
        isLoadingLogin: false,
        user: action.user,
        isLogin: true,
        loadingLoginError: null
      }

    case ActionTypes.LOGIN_FAILED:
      alert(action.error.message);
      return {
        ...state,
        isLoadingLogin: false,
        loadingLoginError: action.error
      }

    case ActionTypes.CREATE_USER:
      return {
        ...state,
        isLoadingCreateUser: true
      }

    case ActionTypes.CREATE_USER_RESULT:
      if(action.error) {
        alert(action.error.message);
      }
      return {
        ...state,
        isLoadingCreateUser: false,
        loadingCreateUserError: action.error,
      }
  
    default: 
      return state;
  }
}

export { userReducers, defaultState };