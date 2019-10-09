import { defaultState, courseReducers } from './course';
import { Actions, ActionTypes } from '../actions';
import expect from 'expect';

describe('reducer', () => {
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
});