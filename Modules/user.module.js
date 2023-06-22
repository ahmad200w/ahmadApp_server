const  mongoose  = require("mongoose")

const userM = new mongoose.Schema({
    email:{type:String,require:true},
    password:{type:String,require:true}
})

const userModule = mongoose.model('user',userM)

module.exports=userModule