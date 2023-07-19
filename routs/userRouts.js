const express =require("express")
const {Login,Register,infoTheAddress} =require('../Controllers/useController')
const {saveTheDate} =require('../Controllers/useCategory')

const userRouts = express.Router()
userRouts.get('/Login',Login)
userRouts.post('/Register',Register)
userRouts.post('/addrese',infoTheAddress)
userRouts.post('/category',saveTheDate)



module.exports=userRouts;