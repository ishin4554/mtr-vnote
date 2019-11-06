import EasyActions from 'redux-easy-actions';

const { Actions, Constants } = EasyActions({
  // course
  SET_PLAYER(type, player) {
    return {type, player}
  },

  GET_PLAYER_FAIL(type, error) {
    return {type, error}
  },

  CREATE_COURSE(type, course) {
    return { type, course };
  },

  CREATE_COURSE_RESULT(type, error) {
    return { type, error };
  },

  GET_COURSE(type, id) {
    return { type, id };
  },

  GET_COURSE_RESULT(type, course) {
    return { type, course };
  },

  GET_COURSE_FAILED(type, error) {
    return { type, error };
  },

  GET_COURSES_LIST(type, payload) {
    return { type, payload };
  },

  GET_COURSES_LIST_RESULT(type, courses) {
    return { type, courses };
  },

  GET_COURSES_LIST_FAILED(type, error) {
    return { type, error };
  },

  DELETE_COURSE(type, id) {
    return { type, id };
  },

  DELETE_COURSE_RESULT(type, error) {
    return { type, error };
  },

  UPDATE_COURSE(type, id, course) {
    return { type, id, course };
  },

  UPDATE_COURSE_RESULT(type, error) {
    return { type, error };
  },
  
  // comment 
  CREATE_COMMENT(type, comment) {
    return { type, comment };
  },

  CREATE_COMMENT_RESULT(type, error) {
    return { type, error };
  },

  GET_COMMENTS_LIST(type, payload) {
    return { type, payload };
  },

  GET_COMMENTS_LIST_RESULT(type, list) {
    return { type, list };
  },

  GET_COMMENTS_LIST_FAILED(type, error) {
    return { type, error };
  },

  DELETE_COMMENT(type, id) {
    return { type, id };
  },

  DELETE_COMMENT_RESULT(type, error) {
    return { type, error };
  },

  UPDATE_COMMENT(type, id, comment) {
    return { type, id, comment };
  },

  UPDATE_COMMENT_RESULT(type, error) {
    return { type, error };
  },

  // user
  GET_USER(type, id) {
    return { type, id };
  },

  GET_USER_RESULT(type, user) {
    return { type, user };
  },

  GET_USER_FAILED(type, error) {
    return { type, error };
  },

  GET_USERS(type, payload) {
    return { type, payload };
  },

  GET_USERS_RESULT(type, users) {
    return { type, users };
  },

  GET_USERS_FAILED(type, error) {
    return { type, error };
  },

  UPDATE_USER(type, id, user) {
    return { type, id, user };
  },

  UPDATE_USER_RESULT(type, error) {
    return { type, error };
  },

  SET_USER(type) {
    return { type };
  },

  LOGOUT(type) {
    return { type };
  },

  LOGIN(type, payload) {
    return { type, payload };
  },

  LOGIN_RESULT(type, user) {
    return { type, user };
  },

  LOGIN_FAILED(type, error) {
    return { type, error };
  },

  CREATE_USER(type, payload) {
    return { type, payload };
  },

  CREATE_USER_RESULT(type, error) {
    return { type, error }
  }
  
  
})

export { Actions, Constants as ActionTypes };