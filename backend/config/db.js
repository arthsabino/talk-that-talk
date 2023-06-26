const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const url = process.env.MONGO_URI || "";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url, {
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongo DB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
