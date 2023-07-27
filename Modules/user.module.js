const  mongoose  = require("mongoose")
const addresse =  require('../Modules/adress.module')
const userM = new mongoose.Schema({
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    addresse :[addresse]

})


const userModule = mongoose.model('user',userM)

module.exports=userModule ;