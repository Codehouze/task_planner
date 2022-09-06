require("dotenv").config();
const mongoose = require("mongoose");

const mongoDB = process.env.Db_URI;
const connectDB = async () => {
  try {
    const con = await mongoose.connect(mongoDB, {
    //   userNewUrlParser: true,
    //   useUnifiedTopology: false,
    });
    console.log(`Db Connected:${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDB;

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "mongoDB connection error"));
