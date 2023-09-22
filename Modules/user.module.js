const  mongoose  = require("mongoose")


const userM = new mongoose.Schema({
    userName :{type: String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
   
  

})


const userModule = mongoose.model('User',userM)

module.exports=userModule ;