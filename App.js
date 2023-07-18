const express = require("express");
const mongoose = require("mongoose");
const userRouts = require("./routs/userRouts");

const app = express();
app.use(express.json());
require("dotenv").config();

const mongooseLink =
"mongodb+srv://werbung200w:dUh7N1aUWKujmj6Z@ka94.t9hlsdj.mongodb.net/"
mongoose.connect(mongooseLink);


mongoose.connection.on("connected", () => {
 
  console.log("mongo connected");
});

const product =mongoose.Schema({
  name:String,
  userName:String,
  idNummber:Number,
})
const productN =mongoose.model("/products",product)

app.post("/products",(req,res)=>{
  const newProduct =new product({
    name:req.body.name,
    userName:req.body.userName,
    idNummber:req.body.idNummber
  })
  productN.save().then((createProduct)=>{
    res.status(201).json(createProduct)

  }).catch((err)=>{
    res.status(500).json({
      err:err,
      success:false
  })
   

  })


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

module.exports = app;
