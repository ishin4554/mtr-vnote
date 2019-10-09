import React from "react";
import { connect } from "react-redux";
import Sign from "../components/sign";
import { Actions } from "../actions";

const SignContainer = props => <Sign {...props} />;
const mapStateToProps = store => ({

});

const mapDispatchToProps = {
  login: Actions.LOGIN,
  createUser: Actions.CREATE_USER,
}
export default connect(mapStateToProps, mapDispatchToProps)(SignContainer)