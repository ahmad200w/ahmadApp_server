const express =require("express")
const {Login,Register,infoTheAddress} =require('../Controllers/useController')

const userRouts = express.Router()
userRouts.get('/Login',Login)
userRouts.post('/Register',Register)
userRouts.post('/addrese',infoTheAddress)



module.exports=userRouts;