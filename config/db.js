//mongoose acts as middlemen between code and database
const mongoose = require("mongoose");

//CONFIG IS USED TO DECLARE GLOBAL VARIABLE
const config = require("config");

const db = config.get("mongoURI");

//FUNCTION TO CONNECT TO MONGODB DATABASE OTHERWISE SEND ERROR
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });

    console.log("MongoDB is connected...");
  } catch (err) {
    console.log(err.message);
    //exit process with failure
    process.exit(1);
  }
};
module.exports = connectDB;
