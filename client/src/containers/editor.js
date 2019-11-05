import React from "react";
import { connect } from "react-redux";
import Editor from "../components/editor";
import { Actions } from "../actions";

const EditorContainer = props => <Editor {...props} />;
const mapStateToProps = store => ({
  player: store.course.player,
  isLoadingCreateComment: store.comment.isLoadingCreateComment,
});

const mapDispatchToProps = {
  createComment: Actions.CREATE_COMMENT,
}
export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer)