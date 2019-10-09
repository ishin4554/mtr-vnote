import React from "react";
import { connect } from "react-redux";
// import { Actions } from "../actions";
// import storage from "../utils/storage";

class Auth extends React.Component {

  render() {
    return this.props.children;
  }
}

const AuthContainer = props => <Auth {...props} />;

const mapDispatchToProps = {
};

export default connect(
  null,
  mapDispatchToProps
)(AuthContainer);
