const { Router } = require("express");
const Movie = require("./sequelizeModel");
const router = new Router();

// Create a new movie resource
router.post("/movies", (req, res, next) => {
  console.log("Movie posted!", req.body);
  Movie.create(req.body)
    .then(movie => res.json(movie))
    .catch(err => next(err));
});

//Pagination
router.get("/movies", (req, res, next) => {
  const limit = Math.min(req.query.limit || 5, 500);
  const offset = req.query.offset || 0;
  Movie.findAndCountAll({ limit, offset })
    .then(movies => {
      if (!movies) {
        res
          .status(404)
          .send("Oops, no movies here!")
          .end();
      } else {
        res.send({ movies: movies.rows, total: movies.count });
      }
    })
    .catch(error => next(error));
});

//Read a single movie resource
router.get("/movies/:movieId", (req, res, next) => {
  Movie.findByPk(req.params.movieId)
    .then(movie => {
      if (!movie) {
        res
          .status(404)
          .send("We don´t know that movie, try another one!")
          .end();
      } else {
        res.json(movie);
      }
    })
    .catch(next);
});

// Update a movie
router.put("/movies/:movieId", (req, res, next) => {
  Movie.findByPk(req.params.movieId)
    .then(movie => {
      if (movie) {
        movie.update(req.body).then(movie => res.json(movie));
      } else {
        res
          .status(404)
          .send("We don´t know that movie, try another one!")
          .end();
      }
    })
    .catch(next);
});

// Delete a single movie resource
router.delete("/movies/:movieId", (req, res, next) => {
  Movie.destroy({
    where: {
      id: req.params.movieId
    }
  })
    .then(movie => {
      if (movie) {
        console.log(`Movie successfully deleted!`);
        res.status(204).end();
      } else {
        res
          .status(404)
          .send("We don´t know that movie, try another one!")
          .end();
      }
    })
    .catch(next);
});

module.exports = router;
