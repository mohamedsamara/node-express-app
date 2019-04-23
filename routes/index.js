let Movie = require('../models/movie');

const getHomePage = (req, res) => {
  Movie.find({}, function(err, movies) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        movies: movies
      });
    }
  });
};

module.exports = {
  getHomePage
};
