const express =require("express")
const {Login,Register} =require('../Controllers/useController')
const userRouts = express.Router()
userRouts.get('/Loign',Login)
userRouts.post('/Register',Register)


module.exports=userRouts;