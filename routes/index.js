let Movie = require('../models/movie');

const getHomepage = (req, res) => {
  Movie.find({}, function(err, movies) {
    if (err) {
      throw err;
    } else {
      res.render('index', {
        movies: movies
      });
    }
  });
};

module.exports = {
  getHomepage
};
