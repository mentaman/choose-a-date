const env = 'production';
process.env.NODE_ENV = env;
process.env.BABEL_ENV = env;
require('./config/env');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var datesRouter = require('./routes/dates');

var app = express();
if(env.toLowerCase() === 'development') {
  console.log("use webpack")
  const webpack = require('webpack');
  const middleware = require('webpack-dev-middleware');
  const config = require('./config/webpack.config.dev');
  let compiler = webpack(config);
  app.use(middleware(compiler, {
    publicPath: config.output.publicPath,  
  }));
}
// view engine setup

app.use(cors({origin: '*'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//app.use(express.static(path.join(__dirname, './build')));
app.use('/dates', datesRouter);
app.use(express.static(path.join(__dirname, 'build')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send("Not found");
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log("error", err);
  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
