const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

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
      req.flash('success', 'Movie Updated');
      res.redirect('/');
    }
  });
});

router.get('/add', (req, res) => {
  res.render('add', {});
});

router.post(
  '/add',
  [
    body('title', 'Title is required')
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body('description', 'Description is required')
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body('year')
      .not()
      .isEmpty()
      .withMessage('Year is required')
      .isNumeric()
      .withMessage('Year must be a number'),
    body('rating')
      .not()
      .isEmpty()
      .withMessage('Rating is required')
      .isNumeric()
      .withMessage('Rating must be a number'),
    body('country', 'Country is required')
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body('language', 'Language is required')
      .not()
      .isEmpty()
      .trim()
      .escape()
  ],
  function(req, res) {
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
          req.flash('success', 'Movie Added');

          res.redirect('/');
        }
      });
    }
  }
);

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
    req.flash('success', 'Movie Deleted');
    res.redirect('/');
  });
});

module.exports = router;
