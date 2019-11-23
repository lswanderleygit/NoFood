const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.listen(3000, () => {
  console.log("Server api NoFood init in the port 3000");
});
