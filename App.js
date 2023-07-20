const express = require("express");
const mongoose = require("mongoose");
const userRouts = require("./routs/userRouts");
const morgan =require("morgan")
const cors =require("cors")
const app = express();

app.use(express.json());
app.use(morgan('tiny'))
require("dotenv").config();
const api =process.env.API_URL
mongooseLink ="mongodb+srv://werbung200w:dUh7N1aUWKujmj6Z@ka94.t9hlsdj.mongodb.net/"


mongoose.connect(mongooseLink);


mongoose.connection.on("connected", () => {
 
  console.log(api)
  console.log("mongo connected");
});

const product =mongoose.Schema({
  name:String,
  userName:String,
  idNummber:Number,
})
const productN =mongoose.model("/product",product)

app.post("/products",(req,res)=>{
  const newProduct = new productN({
    name: req.body.name,
    userName: req.body.userName,
    idNummber: req.body.idNummber
  })
  newProduct.save((err, createdProduct) => {
    if (err) {
      res.status(500).json({ err: err, success: false });
    } else {
      res.status(201).json(createdProduct);
    }
  });


})


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
app.use(cors())

module.exports = app;
