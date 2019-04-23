const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const config = require('./config/database');
let Movie = require('./models/movie');

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

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');

// homepage route
app.get('/', function(req, res) {
  Movie.find({}, function(err, movies) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        movies: movies
      });
    }
  });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
