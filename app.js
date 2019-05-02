const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const path = require('path');

const config = require('./config/database');
const { getHomePage } = require('./routes/index');

mongoose.connect(config.database, { useNewUrlParser: true });
let db = mongoose.connection;

// connect to MongoDB
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// check for MongoDB connection error
db.on('error', function(err) {
  console.log(err);
});

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Express Session Middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
);

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function(req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator());

app.get('/*', function(req, res, next) {
  setTimeout(function() {
    req.session.flash = [];
  }, 3000);

  next();
});

// routes for the app
app.get('/', getHomePage);

// Route Files
let movies = require('./routes/movie');
app.use('/movies', movies);

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
