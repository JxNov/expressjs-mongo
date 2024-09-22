const mongoose = require("mongoose");
const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;

module.exports = {
  connect: async () => {
    try {
      await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`);

      console.log("Database connected successfully");
    } catch (error) {
      console.error("Error connecting to the database: ", error);
    }
  },
};
