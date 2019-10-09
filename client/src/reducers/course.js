import { ActionTypes } from "../actions";

const defaultState = {
  course: {},
  courses: [],
  isLoadingCreateCourse: false,
  isLoadingGetCourse: false,
  isLoadingUpdateCourse: false,
  isLoadingDeleteCourse: false,
  isLoadingGetCoursesList: false,
  createCourseError: null,
  getCourseError: null,
  getCoursesListError: null,
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

    case ActionTypes.GET_COURSES_LIST:
      return {
        ...state,
        isLoadingGetCoursesList: true
      }

    case ActionTypes.GET_COURSES_LIST_RESULT:
      return {
        ...state,
        isLoadingGetCoursesList: false,
        courses: action.courses,
      }

    case ActionTypes.GET_COURSES_LIST_FAILED:
      return {
        ...state,
        getCoursesError: action.error,
      }
  
    default: 
      return state;
  }
}

export { courseReducers, defaultState };