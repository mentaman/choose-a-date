process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
require('./config/env');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const config = require('./config/webpack.config.prod');
let compiler = webpack(config);

var indexRouter = require('./routes/index');
var datesRouter = require('./routes/dates');

var app = express();

// view engine setup
app.use(middleware(compiler, {
  publicPath: config.output.publicPath,  
}));
app.use(cors({origin: '*'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//app.use(express.static(path.join(__dirname, './build')));
app.use('/dates', datesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
