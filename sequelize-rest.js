const express = require("express");
const app = express();
const port = 4000;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "postgres://postgres:secret@localhost:5432/postgres"
);

const Movie = sequelize.define("movie", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  yearOfRelease: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  synopsis: {
    type: Sequelize.STRING,
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
function onListen() {
  console.log(`Listening on port: ${port}`);
}

const parserMiddelware = express.json();
app.use(parserMiddelware);

app.listen(port, onListen);
