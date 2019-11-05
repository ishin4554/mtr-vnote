import React from "react";
import { connect } from "react-redux";
import Comments from "../components/comments";
import { Actions } from "../actions";

const CommentContainer = props => <Comments {...props} />;
const mapStateToProps = store => ({
  course: store.course.course,
  comments: store.comment.comments,
  player: store.course.player,
  users: store.user.users,
  user: store.user.user,
  isLoadingCreateComment: store.comment.isLoadingCreateComment,
  isLoadingGetCommentsList: store.comment.isLoadingGetCommentsList,
  isLoadingDeleteComment: store.comment.isLoadingDeleteComment,
  isLoadingUpdateComment: store.comment.isLoadingUpdateComment,
  isLoadingUpdateCourse: store.course.isLoadingUpdateCourse,
  getCommentsListError: store.comment.getCommentsListError,
  createCommentError: store.comment.createCommentError,
  deleteCommentError: store.comment.deleteCommentError,
  updateCommentError: store.comment.updateCommentError,
});

const mapDispatchToProps = {
  updateCourse: Actions.UPDATE_COURSE,
  getCourse: Actions.GET_COURSE,
  createComment: Actions.CREATE_COMMENT,
  getCommentsList: Actions.GET_COMMENTS_LIST,
  deleteComment: Actions.DELETE_COMMENT,
  updateComment: Actions.UPDATE_COMMENT,
  getUsers: Actions.GET_USERS
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer)