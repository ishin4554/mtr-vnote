import { defaultState, courseReducers } from './course';
import { Actions, ActionTypes } from '../actions';
import expect from 'expect';

describe('create course reducer', () => {
  it('CREATE_COURSE', () => {
    const action = {
      type: ActionTypes.CREATE_COURSE,
      course : {
        url: 'https://www.youtube.com/watch?v=0kZ3ix3j5Ik',
        title: 'test111',
        description: '人在山的跟朋，時候回到就先走得，墨子空虛故事頭的。篇原我們有沒。',
        folderId: 1,
        updatedAt: Date.now,
        userId: 1,
        id: 1
      }
    }
    expect(courseReducers(defaultState, action)).toEqual({ 
      ...defaultState,
      isLoadingCreateCourse: true
    });
  })

  it('CREATE_COURSE_RESULT', () => {
    const action = {
      type: ActionTypes.CREATE_COURSE_RESULT,
      error: 'gggggg',
    }
    expect(courseReducers(defaultState, action)).toEqual({ 
      ...defaultState,
      createCourseError: 'gggggg',
      isLoadingCreateCourse: false
    });
  })
})
describe('get course reducer', () => {
  it('GET_COURSE', () => {
    const action = {
      type: ActionTypes.GET_COURSE,
      isLoadingGetCourse: true
    }
    expect(courseReducers(defaultState, action)).toEqual({ 
      ...defaultState,
      isLoadingGetCourse: true
    });
  })

  it('GET_COURSE_RESULT', () => {
    const course = {
      url: 'https://www.youtube.com/watch?v=0kZ3ix3j5Ik',
      title: 'test111',
      description: '人在山的跟朋，時候回到就先走得，墨子空虛故事頭的。篇原我們有沒。',
      folderId: 1,
      updatedAt: Date.now,
      userId: 1
    }
    const action = {
      type: ActionTypes.GET_COURSE_RESULT,
      isLoadingGetCourse: false,
      course
    }
    expect(courseReducers(defaultState, action)).toEqual({ 
      ...defaultState,
      isLoadingGetCourse: false,
      course
    });
  })

  it('GET_COURSE_FAILED', () => {
    const action = {
      type: ActionTypes.GET_COURSE_FAILED,
      error: 'error'
    }
    expect(courseReducers(defaultState, action)).toEqual({ 
      ...defaultState,
      getCourseError: 'error'
    });
  });

  it('GET_COURSES_LIST', () => {
    const action = {
      type: ActionTypes.GET_COURSES_LIST,
      isLoadingGetCoursesList: true
    }
    expect(courseReducers(defaultState, action)).toEqual({ 
      ...defaultState,
      isLoadingGetCoursesList: true
    });
  })

  it('GET_COURSES_LIST_RESULT', () => {
    const courses = [
      {
        url: 'https://www.youtube.com/watch?v=0kZ3ix3j5Ik',
        title: 'test111',
        description: '人在山的跟朋，時候回到就先走得，墨子空虛故事頭的。篇原我們有沒。',
        folderId: 1,
        updatedAt: Date.now,
        userId: 1
      },
      {
        url: 'https://www.youtube.com/watch?v=njlABvVRB68',
        title: 'test222',
        description: '真的我不，接著山的兩個問問像也系統，停止我忘腦袋的玩的一，部',
        folderId: 1,
        updatedAt: Date.now,
        userId: 1
      },
      {
        url: 'https://www.youtube.com/watch?v=-P1kAZxbD80',
        title: 'test333',
        description: '的，圖片牙齒掉了是開狀況的名。可以忘卻社團才會有些兩眼時常，出了好像沒用在家奶奶要一，發噗認真拿到臉色可以，更新靈',
        folderId: 2,
        updatedAt: Date.now,
        userId: 2
      },
    ]
    const action = {
      type: ActionTypes.GET_COURSES_LIST_RESULT,
      isLoadingGetCoursesList: false,
      courses
    }
    expect(courseReducers(defaultState, action)).toEqual({ 
      ...defaultState,
      isLoadingGetCoursesList: false,
      courses
    });
  })

  it('GET_COURSES_LIST_FAILED', () => {
    const action = {
      type: ActionTypes.GET_COURSES_LIST_FAILED,
      error: 'error'
    }
    expect(courseReducers(defaultState, action)).toEqual({ 
      ...defaultState,
      getCoursesError: 'error'
    });
  });
});