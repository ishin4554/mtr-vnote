import EasyActions from 'redux-easy-actions';

const { Actions, Constants } = EasyActions({
  // course
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

  GET_COURSES_LIST(type, id) {
    return { type, id };
  },

  GET_COURSES_LIST_RESULT(type, courses) {
    return { type, courses };
  },

  GET_COURSES_LIST_FAILED(type, error) {
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

  // user
  LOGIN(type, payload) {
    return { type, payload };
  },

  LOGIN_RESULT(type, error) {
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