const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')
require('dotenv').config();

const dbUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:27017/${process.env.DB_NAME}`;
console.log(dbUrl)
mongoose.connect(dbUrl, { useNewUrlParser: true,  useUnifiedTopology: true });
autoIncrement.initialize(mongoose.connection)

module.exports = mongoose;