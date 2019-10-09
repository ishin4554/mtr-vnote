import { ActionTypes } from "../actions";

const defaultState = {
  isLoadingCreateUser: false,
  isLoadingLogin: false,
  loadingCreateUserError: null,
  loadingLoginError: null,
};

function userReducers(state = defaultState, action) {
  switch(action.type){
    case ActionTypes.LOGIN:
      return {
        ...state,
        isLoadingLogin: true
      }

    case ActionTypes.LOGIN_RESULT:
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