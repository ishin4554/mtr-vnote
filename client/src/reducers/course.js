import { ActionTypes } from "../actions";

const defaultState = {
  course: {},
  isLoadingCreateCourse: false,
  isLoadingGetCourse: false,
  isLoadingUpdateCourse: false,
  isLoadingDeleteCourse: false,
  createCourseError: null,
  getCourseError: null,
};

function courseReducers(state = defaultState, action) {
  switch(action.type){
    case ActionTypes.CREATE_COURSE:
      return {
        ...state,
        isLoadingCreateCourse: true
      }

    case ActionTypes.CREATE_COURSE_RESULT:
      return {
        ...state,
        isLoadingCreateCourse: false,
        createCourseError: action.error
      }

    case ActionTypes.GET_COURSE:
      return {
        ...state,
        isLoadingGetCourse: true
      }

    case ActionTypes.GET_COURSE_RESULT:
      return {
        ...state,
        isLoadingGetCourse: false,
        course: action.course,
      }

    case ActionTypes.GET_COURSE_FAILED:
      return {
        ...state,
        getCourseError: action.error,
      }
  
    default: 
      return state;
  }
}

export { courseReducers, defaultState };