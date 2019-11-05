import React from "react";
import { connect } from "react-redux";
import Home from "../components/home";
import { Actions } from "../actions";

const HomeContainer = props => <Home {...props} />;
const mapStateToProps = store => ({
  user: store.user.user,
  isLogin: store.user.isLogin
});
const mapDispatchToProps = {
  setUser: Actions.SET_USER,
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)