import React from "react";
import { connect } from "react-redux";
import Sign from "../components/sign";
import { Actions } from "../actions";

const SignContainer = props => <Sign {...props} />;
const mapStateToProps = store => ({
  isLogin: store.user.isLogin,
  isLoadingLogin: store.user.isLoadingLogin,
  isLoadingCreateUser: store.user.isLoadingCreateUser,
  loadingCreateUserError: store.user.loadingCreateUserError,
  loadingLoginError: store.user.loadingLoginError,
});

const mapDispatchToProps = {
  login: Actions.LOGIN,
  createUser: Actions.CREATE_USER,
  setUser: Actions.SET_USER
}
export default connect(mapStateToProps, mapDispatchToProps)(SignContainer)