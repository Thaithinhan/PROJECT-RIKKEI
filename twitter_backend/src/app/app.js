const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const CreateError = require('http-errors');
const userRouter = require('../app/routes/userRoute');
const followRouter = require('../app/routes/followRoute');
const tweetRouter = require('../app/routes/tweetRoute');

//Middelware
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.static('public'));

//databasee
require('../libraries/database/connect.mongo');

//route
app.use('/users', userRouter);
app.use('/follow', followRouter);
// app.use('/api/OauthGoogle', googleRouter);
app.use('/tweets', tweetRouter);

//handle error

module.exports = app;
