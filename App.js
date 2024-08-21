const express = require("express");
const mongoose = require("mongoose");
const userRouts = require("./routs/userRouts");
const cors =require("cors");
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

app.use(userRouts)

app.use(express.json());
const mongooseLink ="mongodb+srv://werbung200w:dUh7N1aUWKujmj6Z@ka94.t9hlsdj.mongodb.net/"


mongoose.connect(mongooseLink);


mongoose.connection.on("connected", () => {
 
  console.log("mongo connected");
});


app.use(cors())

module.exports = app;
