import { defaultState, userReducers } from './user';
import { ActionTypes } from '../actions';
import expect from 'expect';

describe('reducer', () => {
  it('LOGIN', () => {
    const payload = {
      email: 'cjiowej',
      password: 'jowiejd'
    }
    const action = {
      type: ActionTypes.LOGIN,
      payload,
    }
    expect(userReducers(defaultState, action)).toEqual({ 
      ...defaultState,
      isLoadingLogin: true
    });
  })

  it('LOGIN_RESULT', () => {
    const error = 'cowijdew';
    const action = {
      type: ActionTypes.LOGIN_RESULT,
      error,
    }
    expect(userReducers(defaultState, action)).toEqual({ 
      ...defaultState,
      isLoadingLogin: false,
      loadingLoginError: error
    });
  })

  it('CREATE_USER', () => {
    const payload = {
      email: 'cjiowej',
      password: 'jowiejd'
    }
    const action = {
      type: ActionTypes.CREATE_USER,
      payload,
    }
    expect(userReducers(defaultState, action)).toEqual({ 
      ...defaultState,
      isLoadingCreateUser: true
    });
  })

  it('CREATE_USER_RESULT', () => {
    const error = 'cowijdew';
    const action = {
      type: ActionTypes.CREATE_USER_RESULT,
      error,
    }
    expect(userReducers(defaultState, action)).toEqual({ 
      ...defaultState,
      isLoadingCreateUser: false,
      loadingCreateUserError: error
    });
  })

});