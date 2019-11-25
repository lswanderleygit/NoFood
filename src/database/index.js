const mongoose = require("mongoose");

const variables = require("../config/svariables");

class Database {
  constructor() {
    this.connection = mongoose.connect(variables.Database.connection);
  }
}

module.exports = new Database();
