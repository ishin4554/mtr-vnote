import React from "react";
import { connect } from "react-redux";
import Course from "../components/course";
import { Actions } from "../actions";

const CourseContainer = props => <Course {...props} />;
const mapStateToProps = store => ({
  user: store.user.user,
  course: store.course.course,
  player: store.course.player,
  isLoadingCreateCourse: store.course.isLoadingCreateCourse,
  isLoadingGetCourse: store.course.isLoadingGetCourse,
  getCourseError: store.course.getCourseError,
});

const mapDispatchToProps = {
  createCourse: Actions.CREATE_COURSE,
  getCourse: Actions.GET_COURSE,
  setPlayer: Actions.SET_PLAYER,
  setUser: Actions.SET_USER
}
export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer)