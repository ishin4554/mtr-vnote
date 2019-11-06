import { ActionTypes } from "../actions";

const defaultState = {
  course: {},
  courses: [],
  player: null,
  isLoadingSetPlayer: true,
  isLoadingCreateCourse: false,
  isLoadingGetCourse: false,
  isLoadingUpdateCourse: false,
  isLoadingDeleteCourse: false,
  isLoadingGetCoursesList: false,
  createCourseError: null,
  getCourseError: null,
  getCoursesListError: null,
  deleteCourseError: null,
};

function courseReducers(state = defaultState, action) {
  switch(action.type){
    case ActionTypes.SET_PLAYER:
      return {
        ...state,
        player: action.player,
        isLoadingSetPlayer: true
      }
    
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
        course: {...action.course.course, share: action.course.share}
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
      alert(action.error)
      window.location = '/#/login'
      return {
        ...state,
        getCoursesError: action.error,
      }

    case ActionTypes.DELETE_COURSE:
    return {
      ...state,
      isLoadingDeleteCourse: true
    }

    case ActionTypes.DELETE_COURSE_RESULT:
      return {
        ...state,
        isLoadingDeleteCourse: false,
        deleteCourseError: action.error,
      }

    case ActionTypes.UPDATE_COURSE: 
      return {
        ...state,
        isLoadingUpdateCourse: true
      }

    case ActionTypes.UPDATE_COURSE_RESULT:
      return {
        ...state,
        isLoadingUpdateCourse: false,
        updateCourseError: action.error
      } 

    default: 
      return state;
  }
}

export { courseReducers, defaultState };