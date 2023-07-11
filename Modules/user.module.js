const  mongoose  = require("mongoose")

const userM = new mongoose.Schema({
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true}
})
const addresse = new mongoose.Schema({
    name:{type:String ,require:true},
    nextname:{type:String ,require:true}
    ,addres:{type:String ,require:true},
    city:{type:String ,require:true},
    totalPreis:{type:String },
    
})

const userModule = mongoose.model('user',userM)
const userAddresse = mongoose.model('addresse',addresse)

module.exports={userModule,userAddresse}