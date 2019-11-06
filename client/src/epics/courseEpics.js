import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { ActionTypes, Actions } from "../actions";
import * as api from "../utlis/api";

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

export const getCoursesList = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_COURSES_LIST),
    switchMap(action => 
      from(api.getCourses(action.payload)).pipe(
        map(res => Actions.GET_COURSES_LIST_RESULT(res.data)),
        catchError(error => of(Actions.GET_COURSES_LIST_FAILED(error)))
      )
    )
  )

export const deleteCourse = action$ =>
  action$.pipe(
    ofType(ActionTypes.DELETE_COURSE),
    switchMap(action => 
      from(api.deleteCourse(action.id)).pipe(
        map(() => Actions.DELETE_COURSE_RESULT(null)),
        catchError(error => Actions.DELETE_COURSE_RESULT(error))
      )
    )
  )

export const updateCourse = action$ =>
  action$.pipe(
    ofType(ActionTypes.UPDATE_COURSE),
    switchMap(action => 
      from(api.updateCourse(action.id, action.course)).pipe(
        map(() => Actions.UPDATE_COURSE_RESULT(null)),
        catchError(error => Actions.UPDATE_COURSE_RESULT(error))
      )
    )
  )