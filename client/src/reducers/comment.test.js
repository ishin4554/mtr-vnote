import { defaultState, commentReducers } from './comment';
import { Actions, ActionTypes } from '../actions';
import expect from 'expect';

describe('comment reducer', () => {
  it('CREATE_COMMENT', () => {
    const action = {
      type: ActionTypes.CREATE_COMMENT,
      comment: {
        time: '116',
        content: '1111111',
        category: 'question',
        courseId: 1,
        userId: 1,
        parentId: null
      }
    }
    expect(commentReducers(defaultState, action)).toEqual({ 
      ...defaultState,
      isLoadingCreateComment: true
    });
  })

  it('CREATE_COMMENT_RESULT', () => {
    const action = {
      type: ActionTypes.CREATE_COMMENT_RESULT,
      error: 'gggggg',
    }
    expect(commentReducers(defaultState, action)).toEqual({ 
      ...defaultState,
      createCommentError: 'gggggg',
      isLoadingCreateComment: false
    });
  })
  it('GET_COMMENTS_LIST', () => {
    const action = {
      type: ActionTypes.GET_COMMENTS_LIST,
      isLoadingGetCommentsList: true,
      info: {
        courseId: 1,
        userId: 1
      }
    }
    expect(commentReducers(defaultState, action)).toEqual({ 
      ...defaultState,
      isLoadingGetCommentsList: true
    });
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
    const action = {
      type: ActionTypes.GET_COMMENTS_LIST_RESULT,
      isLoadingGetCommentsList: false,
      list
    }
    expect(commentReducers(defaultState, action)).toEqual({ 
      ...defaultState,
      isLoadingGetCommentsList: false,
      comments: list
    });
  })

  it('GET_COMMENTS_LIST_FAILED', () => {
    const action = {
      type: ActionTypes.GET_COMMENTS_LIST_FAILED,
      error: 'error'
    }
    expect(commentReducers(defaultState, action)).toEqual({ 
      ...defaultState,
      getCommentsListError: 'error'
    });
  });

  it('DELETE_COMMENT', () => {
    const action = {
      type: ActionTypes.DELETE_COMMENT,
      id: 1
    }
    expect(commentReducers(defaultState, action)).toEqual({ 
      ...defaultState,
      isLoadingDeleteComment: true
    });
  });

  it('DELETE_COMMENT_RESULT', () => {
    const action = {
      type: ActionTypes.DELETE_COMMENT_RESULT,
      error: 'ggggg'
    }
    expect(commentReducers(defaultState, action)).toEqual({ 
      ...defaultState,
      isLoadingDeleteComment: false,
      deleteCommentError: 'ggggg'
    });
  });

  it('UPDATE_COMMENT', () => {
    const action = {
      type: ActionTypes.UPDATE_COMMENT,
      id: 1,
      comment: {
        time: '50',
        content: '3333333',
        category: 'note',
        courseId: 2,
        userId: 1,
        parentId: 1
      }
    }
    expect(commentReducers(defaultState, action)).toEqual({ 
      ...defaultState,
      isLoadingUpdateComment: true
    });
  });

  it('UPDATE_COMMENT_RESULT', () => {
    const action = {
      type: ActionTypes.UPDATE_COMMENT_RESULT,
      error: 'ggggg'
    }
    expect(commentReducers(defaultState, action)).toEqual({ 
      ...defaultState,
      isLoadingUpdateComment: false,
      updateCommentError: 'ggggg'
    });
  });
});