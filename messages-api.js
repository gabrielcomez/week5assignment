const express = require("express");
const app = express();
const port = 3000;

function onListen() {
  console.log(`Listening on port: ${port}`);
}

const parserMiddelware = express.json();
app.use(parserMiddelware);

app.post("/messages", (req, res) => {
  console.log(req.body.message);
  if (req.body.message) {
    res.json({
      message: "This is the message that was sent"
    });
  } else {
    res
      .status(404)
      .send("Bad Request")
      .end();
  }
});

app.listen(port, onListen);
