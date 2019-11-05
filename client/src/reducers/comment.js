import { ActionTypes } from "../actions";

const defaultState = {
  comments: [],
  isLoadingCreateComment: false,
  isLoadingGetCommentsList: false,
  isLoadingDeleteComment: false,
  isLoadingUpdateComment: false,
  createCommentError: null,
  getCommentsListError: null,
  deleteCommentError: null,
  updateCommentError: null
};

function commentReducers(state = defaultState, action) {
  switch(action.type){
    case ActionTypes.CREATE_COMMENT:
      return {
        ...state,
        isLoadingCreateComment: true
      }

    case ActionTypes.CREATE_COMMENT_RESULT:
      return {
        ...state,
        isLoadingCreateComment: false,
        createCommentError: action.error
      }

    case ActionTypes.GET_COMMENTS_LIST:
      return {
        ...state,
        isLoadingGetCommentsList: true
      }

    case ActionTypes.GET_COMMENTS_LIST_RESULT:
      return {
        ...state,
        isLoadingGetCommentsList: false,
        comments: action.list
      }

    case ActionTypes.GET_COMMENTS_LIST_FAILED:
      return {
        ...state,
        getCommentsListError: action.error,
      }
    
    case ActionTypes.DELETE_COMMENT: 
      return {
        ...state,
        isLoadingDeleteComment: true
      }

    case ActionTypes.DELETE_COMMENT_RESULT:
      return {
        ...state,
        isLoadingDeleteComment: false,
        deleteCommentError: action.error
      } 

    case ActionTypes.UPDATE_COMMENT: 
      return {
        ...state,
        isLoadingUpdateComment: true
      }

    case ActionTypes.UPDATE_COMMENT_RESULT:
      return {
        ...state,
        isLoadingUpdateComment: false,
        updateCommentError: action.error
      } 
  
    default: 
      return state;
  }
}

export { commentReducers, defaultState };