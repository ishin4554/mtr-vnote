const mongoose = require('./db');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const CourseSchema = new Schema({
  url:  String,
  isFinish: Boolean,
  folder: String,
  title: String,
  description: String,
  userId: Number,
  shareList: Array,
  createdAt:  {type: Date, default: Date.now},
  updatedAt:  {type: Date, default: Date.now},
}, { toJSON: { virtuals: true } });

CourseSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: 'id',
  justOne: true
});

CourseSchema.plugin(autoIncrement.plugin, {
	model: 'Course',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

const CourseModel = mongoose.model('Course', CourseSchema);

module.exports = CourseModel;