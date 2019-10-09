import { ofType } from "redux-observable";
import { from } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { ActionTypes, Actions } from "../actions";
import * as api from "../api";

export const createCourse = action$ =>
  action$.pipe(
    ofType(ActionTypes.CREATE_COURSE),
    switchMap(action => 
      from(api.createCourse(action.course)).pipe(
          map(() => Actions.CREATE_COURSE_RESULT(null)),
          catchError(error => Actions.CREATE_COURSE_RESULT(error))
        )
    )
  )

export const getCourse = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_COURSE),
    switchMap(action => 
      from(api.getCourse(action.id)).pipe(
        map(res => Actions.GET_COURSE_RESULT(res.data)),
        catchError(error => Actions.GET_COURSE_RESULT(error))
      )
    )
  )

