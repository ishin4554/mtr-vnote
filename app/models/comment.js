const mongoose = require('./db');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const CommentSchema = new Schema({
  content:  String,
  time: Number,
  category: String,
  createdAt:  {type: Date, default: Date.now},
  updatedAt:  {type: Date, default: Date.now},
  like: Array,
  courseId: Number,
  userId: Number,
  parentId: Number
}, { toJSON: { virtuals: true } });

CommentSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: 'id',
  justOne: true
});

CommentSchema.plugin(autoIncrement.plugin, {
	model: 'Comment',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = CommentModel;