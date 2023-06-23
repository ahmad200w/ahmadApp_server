const express =require("express")
const {Login,Register} =require('../Controllers/useController')
const userRouts = express.Router()
userRouts.get('/Login',Login)
userRouts.post('/Register',Register)


module.exports=userRouts;