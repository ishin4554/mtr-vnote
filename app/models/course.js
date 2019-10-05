const mongoose = require('./db');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const CourseSchema = new Schema({
  url:  String,
  description: String,
  folder: String,
  title: String,
  userId: Number,
  createdAt:  {type: Date, default: Date.now},
  updatedAt:  {type: Date, default: Date.now},
});

CourseSchema.plugin(autoIncrement.plugin, {
	model: 'Course',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

const CourseModel = mongoose.model('Course', CourseSchema);

module.exports = CourseModel;