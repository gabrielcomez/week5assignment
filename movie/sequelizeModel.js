const Sequelize = require("sequelize");
const db = require("../sequelize-db");

const Movie = db.define("movie", {
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

module.exports = Movie;
