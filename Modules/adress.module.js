const { default: mongoose } = require("mongoose");


const addresse = new mongoose.Schema({
    name:{type:String ,require:true},
    nextname:{type:String ,require:true},
    addres:{type:String ,require:true},
    city:{type:String ,require:true},
    totalPreis:{type:String },

    
})

const userAddresse = mongoose.model('addresse',addresse)

module.exports = userAddresse ; 