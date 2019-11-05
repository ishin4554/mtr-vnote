import React from "react";
import { connect } from "react-redux";
import Sign from "../components/sign";
import { Actions } from "../actions";

const SignContainer = props => <Sign {...props} />;
const mapStateToProps = store => ({
  isLogin: store.user.isLogin,
  isLoadingLogin: store.user.isLoadingLogin
});

const mapDispatchToProps = {
  login: Actions.LOGIN,
  createUser: Actions.CREATE_USER,
}
export default connect(mapStateToProps, mapDispatchToProps)(SignContainer)