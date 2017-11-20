const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbURL = 'mongodb://localhost/pool-project';

const index = require('./routes/index');
const authController = require ('./routes/authController');
const centerController = require ('./routes/centerController')
const tournamentController = require ('./routes/tournamentController')
const userController = require ('./routes/userController')
mongoose.connect(dbURL).then( () => {
  debug(`Connected to ${dbURL}`);
});

const User = require('./models/User');
const Tournament = require('./models/Tournament');
const Center = require('./models/Center')

mongoose.connect('mongodb://localhost/pool-project');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'MADPool';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);


app.use('/', index);
app.use('/', authController);
app.use('/center', centerController);
app.use('/tournament', tournamentController);
app.use('/user', userController);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
