import expect from 'expect'
import { Actions, ActionTypes } from './actions';

describe('course actions', () => {
  it('CREATE_COURSE', () => {
    const course = {
      url: 'https://www.youtube.com/watch?v=0kZ3ix3j5Ik',
      title: 'test111',
      description: '人在山的跟朋，時候回到就先走得，墨子空虛故事頭的。篇原我們有沒。',
      folderId: 1,
      updatedAt: Date.now,
      userId: 1,
      id: 1
    }
    const expectedAction = {
      type: ActionTypes.CREATE_COURSE,
      course
    }
    expect(Actions.CREATE_COURSE(course)).toEqual(expectedAction)
  })

  it('CREATE_COURSE_RESULT', () => {
    const error = null;
    const expectedAction = {
      type: ActionTypes.CREATE_COURSE_RESULT,
      error
    }
    expect(Actions.CREATE_COURSE_RESULT(error)).toEqual(expectedAction)
  })

  it('GET_COURSE', () => {
    const id = 1;
    const expectedAction = {
      type: ActionTypes.GET_COURSE,
      id: 1
    }
    expect(Actions.GET_COURSE(id)).toEqual(expectedAction)
  })

  it('GET_COURSE_RESULT', () => {
    const course = {
        id: 1,
        title: 'test',
        url: 'https://ciodsjci',
        description: 'dscnjewnjc'
    };
    const expectedAction = {
      type: ActionTypes.GET_COURSE_RESULT,
      course,
    } 
    expect(Actions.GET_COURSE_RESULT(course)).toEqual(expectedAction)
  })

  it('GET_COURSE_FAILED', () => {
    const error = 'gggggggg';
    const expectedAction = {
      type: ActionTypes.GET_COURSE_FAILED,
      error: 'gggggggg'
    } 
    expect(Actions.GET_COURSE_FAILED(error)).toEqual(expectedAction)
  })
})


describe('comment actions', () => {
  it('CREATE_COMMENT', () => {
    const comment = {
      time: '116',
      content: '1111111',
      category: 'question',
      courseId: 1,
      userId: 1,
      parentId: null
    }
    const expectedAction = {
      type: ActionTypes.CREATE_COMMENT,
      comment
    }
    expect(Actions.CREATE_COMMENT(comment)).toEqual(expectedAction)
  })

  it('CREATE_COMMENT_RESULT', () => {
    const error = null;
    const expectedAction = {
      type: ActionTypes.CREATE_COMMENT_RESULT,
      error
    }
    expect(Actions.CREATE_COMMENT_RESULT(error)).toEqual(expectedAction)
  })

  it('GET_COMMENTS_LIST', () => {
    const payload = {
      courseId: 1,
      userId: 1
    };
    const expectedAction = {
      type: ActionTypes.GET_COMMENTS_LIST,
      payload
    }
    expect(Actions.GET_COMMENTS_LIST(payload)).toEqual(expectedAction)
  })

  it('GET_COMMENTS_LIST_RESULT', () => {
    const list = [
      {
        time: '116',
        content: '1111111',
        category: 'question',
        courseId: 1,
        userId: 1,
        parentId: null
      },
      {
        time: '100',
        content: '2222222',
        category: 'note',
        courseId: 1,
        userId: 1,
        parentId: 1
      },
      {
        time: '50',
        content: '3333333',
        category: 'note',
        courseId: 2,
        userId: 1,
        parentId: 1
      }
    ];
    const expectedAction = {
      type: ActionTypes.GET_COMMENTS_LIST_RESULT,
      list,
    } 
    expect(Actions.GET_COMMENTS_LIST_RESULT(list)).toEqual(expectedAction)
  })

  it('GET_COMMENTS_LIST_FAILED', () => {
    const error = 'gggggggg';
    const expectedAction = {
      type: ActionTypes.GET_COMMENTS_LIST_FAILED,
      error: 'gggggggg'
    } 
    expect(Actions.GET_COMMENTS_LIST_FAILED(error)).toEqual(expectedAction)
  })

  it('LOGIN', () => {
    const payload= {
      email: 'gggg@gmail.com',
      password: '000'
    };
    const expectedAction = {
      type: ActionTypes.LOGIN,
      payload
    } 
    expect(Actions.LOGIN(payload)).toEqual(expectedAction)
  })

  it('LOGIN_RESULT', () => {
    const error = 'gggggggg';
    const expectedAction = {
      type: ActionTypes.LOGIN_RESULT,
      error
    } 
    expect(Actions.LOGIN_RESULT(error)).toEqual(expectedAction)
  })

  it('CREATE_USER', () => {
    const payload= {
      email: 'gggg@gmail.com',
      password: '000'
    };
    const expectedAction = {
      type: ActionTypes.CREATE_USER,
      payload
    } 
    expect(Actions.CREATE_USER(payload)).toEqual(expectedAction)
  })

  it('CREATE_USER_RESULT', () => {
    const error = 'gggggggg';
    const expectedAction = {
      type: ActionTypes.CREATE_USER_RESULT,
      error
    } 
    expect(Actions.CREATE_USER_RESULT(error)).toEqual(expectedAction)
  })
})
