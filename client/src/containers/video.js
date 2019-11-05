import React from "react";
import { connect } from "react-redux";
import Video from "../components/video";
import { Actions } from "../actions";

const VideoContainer = props => <Video {...props} />;
const mapStateToProps = store => ({
  player: store.course.player,
});

const mapDispatchToProps = {
  setPlayer: Actions.SET_PLAYER,
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer)