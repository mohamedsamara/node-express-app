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
  movie.description = req.body.description;
  movie.year = req.body.year;
  movie.imdb_rating = req.body.rating;
  movie.country = req.body.country;
  movie.language = req.body.language;

  let query = { _id: req.params.id };

  Movie.updateOne(query, movie, function(err, data) {
    if (err) {
      throw err;
    } else {
      res.redirect('/');
    }
  });
});

router.get('/add', (req, res) => {
  res.render('add', {});
});

router.post('/add', function(req, res) {
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('description', 'Description is required').notEmpty();
  req.checkBody('year', 'Year is required').notEmpty();
  req.checkBody('rating', 'Rating is required').notEmpty();
  req.checkBody('country', 'Country is required').notEmpty();
  req.checkBody('language', 'Language is required').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if (errors) {
    res.render('add', {
      errors: errors
    });
  } else {
    let movie = new Movie();
    movie.title = req.body.title;
    movie.description = req.body.description;
    movie.year = req.body.year;
    movie.imdb_rating = req.body.rating;
    movie.country = req.body.country;
    movie.language = req.body.language;

    movie.save(function(err) {
      if (err) {
        throw err;
      } else {
        res.redirect('/');
      }
    });
  }
});

router.get('/:id', function(req, res) {
  Movie.findById(req.params.id, function(err, movie) {
    res.render('view', {
      movie: movie
    });
  });
});

router.get('/delete/:id', function(req, res) {
  let query = { _id: req.params.id };

  Movie.deleteOne(query, function(err) {
    if (err) {
      throw err;
    }
    res.redirect('/');
  });
});

module.exports = router;
