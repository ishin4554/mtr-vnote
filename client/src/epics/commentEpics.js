import { ofType } from "redux-observable";
import { from } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { ActionTypes, Actions } from "../actions";
import * as api from "../api";

export const createComment = action$ =>
  action$.pipe(
    ofType(ActionTypes.CREATE_COMMENT),
    switchMap(action => 
      from(api.createComment(action.comment)).pipe(
          map(() => Actions.CREATE_COMMENT_RESULT(null)),
          catchError(error => Actions.CREATE_COMMENT_RESULT(error))
        )
    )
  )

export const getCommentsList = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_COMMENTS_LIST),
    switchMap(action => 
      from(api.getComments(action.payload)).pipe(
          map(res => Actions.GET_COMMENTS_LIST_RESULT(res.data)),
          catchError(error => Actions.GET_COMMENTS_LIST_FAILED(error))
        )
    )
  )
