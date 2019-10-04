const mongoose = require('./db');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const CommentSchema = new Schema({
  content:  String,
  time: Number,
  category: String,
  createdAt:  {type: Date, default: Date.now},
  updatedAt:  {type: Date, default: Date.now},
  courseId: Number,
  userId: Number,
  parentId: Number
});

CommentSchema.plugin(autoIncrement.plugin, {
	model: 'Comment',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = CommentModel;