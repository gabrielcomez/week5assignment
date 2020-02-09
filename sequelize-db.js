const Sequelize = require("sequelize");
const databaseUrl = "postgres://postgres:password@localhost:5432/postgres";
const db = new Sequelize(databaseUrl);

db.sync({ force: false })
  .then(() => console.log("Table created successfully"))
  .catch(err => {
    console.error("Unable to create table, shutting down...", err);
    process.exit(1);
  });

module.exports = db;
