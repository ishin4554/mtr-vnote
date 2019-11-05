import React from "react";
import { connect } from "react-redux";
import CoursesList from "../components/coursesList";
import { Actions } from "../actions";

const CoursesListContainer = props => <CoursesList {...props} />;
const mapStateToProps = store => ({
  user: store.user.user,
  isLogin: store.user.isLogin,
  courses: store.course.courses,
  isLoadingGetCoursesList: store.course.isLoadingGetCoursesList,
  isLoadingCreateCourse: store.course.isLoadingCreateCourse,
  isLoadingCreateCourse: store.course.isLoadingCreateCourse,
  isLoadingDeleteCourse: store.course.isLoadingDeleteCourse,
  isLoadingUpdateCourse: store.course.isLoadingUpdateCourse,
  isLoadingUpdateUser: store.user.isLoadingUpdateUser,
  deleteCourseError: store.course.deleteCourseError,
});

const mapDispatchToProps = {
  setUser: Actions.SET_USER,
  updateUser: Actions.UPDATE_USER,
  getCoursesList: Actions.GET_COURSES_LIST,
  createCourse: Actions.CREATE_COURSE,
  deleteCourse: Actions.DELETE_COURSE,
  updateCourse: Actions.UPDATE_COURSE
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursesListContainer)