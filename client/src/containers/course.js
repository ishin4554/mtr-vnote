import React from "react";
import { connect } from "react-redux";
import Course from "../components/course";
import { Actions } from "../actions";

const CourseContainer = props => <Course {...props} />;
const mapStateToProps = store => ({
  course: store.course.course,
  isLoadingCreateCourse: store.course.isLoadingCreateCourse,
  isLoadingGetCourse: store.course.isLoadingGetCourse,
  getCourseError: store.course.getCourseError,
});

const mapDispatchToProps = {
  createCourse: Actions.CREATE_COURSE,
  getCourse: Actions.GET_COURSE,
}
export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer)