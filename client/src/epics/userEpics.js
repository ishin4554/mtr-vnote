import { ofType } from "redux-observable";
import { from } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { ActionTypes, Actions } from "../actions";
import storage from "../utlis/storage";
import * as api from "../api";

export const login = action$ =>
  action$.pipe(
    ofType(ActionTypes.LOGIN),
    switchMap(action => 
      from(api.login(action.payload)).pipe(
        map(res => {
          storage.addCookie(res.data.token);
          return Actions.LOGIN_RESULT(null);
        }),
        catchError(error => Actions.LOGIN_RESULT(error))
      )
    )
  )

export const createUser = action$ =>
  action$.pipe(
    ofType(ActionTypes.CREATE_USER),
    switchMap(action => 
      from(api.createUser(action.payload)).pipe(
        map(() => Actions.CREATE_USER_RESULT(null)),
        catchError(error => Actions.CREATE_USER_RESULT(error))
      )
    )
  )

