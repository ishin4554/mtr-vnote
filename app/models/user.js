const mongoose = require('./db');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

const userSchema = new Schema({
  nickname:  String,
  email: String,
  password: String,
  createdAt:  {type: Date, default: Date.now},
  updatedAt:  {type: Date, default: Date.now},
});

userSchema.plugin(autoIncrement.plugin, {
	model: 'User',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;