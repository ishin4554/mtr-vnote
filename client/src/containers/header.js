import React from "react";
import { connect } from "react-redux";
import Header from "../components/header";
import { Actions } from "../actions";

const HeaderContainer = props => <Header {...props} />;
const mapStateToProps = store => ({
  user: store.user.user,
  isLogin: store.user.isLogin,
  course: store.course.course,
  isLoadingCreateCourse: store.course.isLoadingCreateCourse,
  isLoadingGetCourse: store.course.isLoadingGetCourse,
  getCourseError: store.course.getCourseError,
});

const mapDispatchToProps = {
  createCourse: Actions.CREATE_COURSE,
  getCourse: Actions.GET_COURSE,
  logout: Actions.LOGOUT,
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)