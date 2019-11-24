const variables = {
  Api: {
    port: process.env.port || 3000
  },
  Database: {
    connection:
      process.env.connection ||
      "mongodb+srv://lucasw:nofood123@cluster0-jliyv.mongodb.net/test?retryWrites=true&w=majority"
  }
};

module.exports = variables;
