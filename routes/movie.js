const express = require('express');
const router = express.Router();

let Movie = require('../models/movie');

router.get('/edit/:id', (req, res) => {
  Movie.findById(req.params.id, function(err, movie) {
    res.render('edit', {
      movie: movie
    });
  });
});

router.post('/edit/:id', function(req, res) {
  let movie = {};
  movie.title = req.body.title;
  movie.year = req.body.year;
  movie.imdb_rating = req.body.rating;
  movie.country = req.body.country;
  movie.language = req.body.language;

  let query = { _id: req.params.id };

  Movie.update(query, movie, function(err, data) {
    if (err) {
      throw err;
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
