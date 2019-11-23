"use strict";
const app = require("./src/app");
const variables = require("./src/config/variables");

app.listen(variables.Api.port, () => {
  console.log(`Api inicialized on port ${variables.Api.port}`);
});
