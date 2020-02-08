const express = require("express");
const app = express();
const port = 4000;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "postgres://postgres:secret@localhost:5432/postgres"
);

const Movie = sequelize.define("movie", {
  title: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  yearOfRelease: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  synopsis: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

sequelize
  .sync()
  .then(() => console.log("Table created successfully"))
  .catch(err => {
    console.error("Unable to create table, shutting down...", err);
    process.exit(1);
  });

const parserMiddelware = express.json();
app.use(parserMiddelware);

// Create a new movie resource
app.post("/movies", (req, res, next) => {
  console.log("Movie posted!", req.body);
  Movie.create(req.body)
    .then(movie => res.json(movie))
    .catch(err => next(err));
});

//Read all movies (initial)
// app.get("/movies", (req, res, next) => {
//   Movie.findAll()
//     .then(movies => {
//       if (!movies) {
//         res
//           .status(404)
//           .send("Oops, no movies here!")
//           .end();
//       } else {
//         res.json(movies);
//       }
//     })
//     .catch(next);
// });

//Pagination
app.get("/movies", (req, res, next) => {
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
app.get("/movies/:movieId", (req, res, next) => {
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
app.put("/movies/:movieId", (req, res, next) => {
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
app.delete("/movies/:movieId", (req, res, next) => {
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

app.listen(port, console.log(`Listening on port: ${port}`));
