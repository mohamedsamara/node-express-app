const express = require('express');
const mongoose = require('mongoose');

const config = require('./config/database');

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

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
