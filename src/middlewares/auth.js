const jwt = require("jsonwebtoken");
const variables = require("../config/variables");

module.exports = async (req, res, next) => {
  var token =
    req.body.token || req.query.query || req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    const decoded = await jwt.verify(token, variables.Security.secretKey);

    req.userLogged = decoded;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid" });
  }
};
