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

  it('GET_COURSES_LIST', () => {
    const id = 1;
    const expectedAction = {
      type: ActionTypes.GET_COURSES_LIST,
      id
    }
    expect(Actions.GET_COURSES_LIST(id)).toEqual(expectedAction)
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
    const expectedAction = {
      type: ActionTypes.GET_COURSES_LIST_RESULT,
      courses,
    } 
    expect(Actions.GET_COURSES_LIST_RESULT(courses)).toEqual(expectedAction)
  })

  it('GET_COURSES_LIST_FAILED', () => {
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
