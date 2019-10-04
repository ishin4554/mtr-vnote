const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./routes');
// const db = require('./models');

const app = express();

// app.use(express.static(path.join(__dirname, '/../client/build')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.options('*', cors());
app.use('/api', routes);

module.exports = app