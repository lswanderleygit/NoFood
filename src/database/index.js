const mongoose = require("mongoose");

const variables = require("../config/variables");

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = mongoose.connect(variables.Database.connection);
  }
}

module.exports = new Database();
