const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const variables = require("./config/variables");

class App {
  constructor() {
    this.app = express();

    this.middlewares();

    this.routes();

    this.database();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }

  database() {
    mongoose.set("useCreateIndex", true);
    mongoose.connect(variables.Database.connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
}

module.exports = new App().app;
