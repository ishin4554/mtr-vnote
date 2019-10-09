import React from "react";
import { connect } from "react-redux";
import Dashboard from "../components/dashboard";
import { Actions } from "../actions";

const DashboardContainer = props => <Dashboard {...props} />;
const mapStateToProps = store => ({
  courses: store.course.courses,
  isLoadingGetCoursesList: store.course.isLoadingGetCoursesList,
  getCoursesListError: store.course.getCoursesListError,
});

const mapDispatchToProps = {
  getCoursesList: Actions.GET_COURSES_LIST,
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)