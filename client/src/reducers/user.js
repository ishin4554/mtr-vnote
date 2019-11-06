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
        user: action.user,
        isLoadingGetUser: false
      }

    case ActionTypes.GET_USER_FAILED:
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
        alert('還未登入')
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
      return {
        ...state,
        isLoadingUpdateUser: false,
        updateUserError: action.error
      } 

    case ActionTypes.LOGOUT:
      storage.removeCookie();
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
        isLogin: true
      }

    case ActionTypes.LOGIN_FAILED:
      alert(action.error)
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