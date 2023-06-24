const express = require("express");
const mongoose = require("mongoose");
const userRouts = require("./routs/userRouts");

const app = express();
app.use(express.json());

const mongooseLink =
  "mongodb+srv://werbung200w:4y6SDvucU5L1Lm1H@ka94.t9hlsdj.mongodb.net/"
mongoose.connect(mongooseLink);


mongoose.connection.on("connected", () => {
 
  console.log("mongo connected");
});



app.get("/app",(req,res)=>{
    res.status(200).json({
        massage:"hi",
        bla:"hhh",
        sl:"ss"
    });
});
app.get("/app1",(req,res)=>{
    res.status(200).json({
        mel:"hi",
        bla:"hhsdfsfh",
        g:"gg"
    });
    
});
app.post("/data",(req,res)=>{
  res.status(200).json({
    name:"ahmad",
    familienam:"kadura",
    geburstag:"29.09.1999"
  })
})
app.get("/data",(req,res)=>{
  res.status(200).json(find({
    name:"ahmad",
    familienam:"kadura",
    geburstag:"29.09.1999"
  }))
})

app.use('/',userRouts)

module.exports = app;
