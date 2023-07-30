const  mongoose  = require("mongoose")
const addresse =  require('../Modules/adress.module');

const userM = new mongoose.Schema({
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    token:{type:String}

})


const userModule = mongoose.model('user',userM)

module.exports=userModule ;