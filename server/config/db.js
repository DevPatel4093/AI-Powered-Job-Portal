const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "jobportal"
    });

    console.log("MongoDB Connected");
    console.log("Database:", mongoose.connection.name);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;