const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const variables = require("./config/variables");

class App {
  constructor() {
    this.app = express();

    this.middlewares();

    this.routes();

    mongoose.connect(variables.Database.connection, {
      useNewUrlParser: true
    });
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }

  database() {}
}

module.exports = new App().app;
