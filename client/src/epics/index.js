import { combineEpics } from 'redux-observable';
import { keysIn } from 'lodash';
import * as courseEpics from './courseEpics';
import * as commentEpics from './commentEpics';
import * as userEpics from './userEpics';

const combineEpicFunctions = epics => {
  return epics.reduce((arr, epic) => {
    return arr.concat(keysIn(epic).map(key => epic[key]));
  }, []);
};

const epics = combineEpicFunctions([
  courseEpics,
  commentEpics,
  userEpics
]);

export const rootEpic = combineEpics(...epics);
