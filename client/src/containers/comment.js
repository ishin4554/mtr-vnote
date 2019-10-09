import React from "react";
import { connect } from "react-redux";
import Comments from "../components/comments";
import { Actions } from "../actions";

const CommentContainer = props => <Comments {...props} />;
const mapStateToProps = store => ({
  comments: store.comment.comments,
  isLoadingCreateComment: store.comment.isLoadingCreateComment,
  isLoadingGetCommentsList: store.comment.isLoadingGetCommentsList,
  getCommentsListError: store.comment.getCommentsListError,
});

const mapDispatchToProps = {
  createComment: Actions.CREATE_COMMENT,
  getCommentsList: Actions.GET_COMMENTS_LIST,
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer)