import { combineReducers } from "redux";
import { courseReducers as course } from "./course";
import { commentReducers as comment } from "./comment";
import { userReducers as user } from "./user";

const reducer = combineReducers({
  course,
  comment,
  user
});

export default reducer;
