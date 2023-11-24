const mongoose = require('mongoose');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
require('../hackatweet-backend/models/connection')

var app = express();
const cors = require('cors');
app.use(cors());

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
