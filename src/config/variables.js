const variables = {
  Api: {
    port: process.env.port || 3000
  },
  Database: {
    connection:
      process.env.connection ||
      "mongodb+srv://lucasw:nofood123@cluster0-jliyv.mongodb.net/nofood?retryWrites=true&w=majority"
  },
  Security: {
    secretKey: "3335b5d6c00902318ece201e72db1532",
    expiresIn: "7d"
  }
};

module.exports = variables;
