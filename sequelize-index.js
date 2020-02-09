const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

const movieRouter = require("./movie/sequelizeRouter");

const corsMiddleware = cors();
app.use(corsMiddleware);

const parserMiddleware = express.json();
app.use(parserMiddleware);

app.use(movieRouter);

app.listen(port, console.log(`Listening on port: ${port}`));
