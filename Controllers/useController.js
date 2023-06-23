const mongoose = require("mongoose");
const userM = require("../Modules/user.module");

const Login = async (req, res) => {
        try {
          //     التحقق من وجود معلومات المستخدم
          const { email, password } = req.body || {};
    
    
          if (!(email && password)) {
            res.status(407).send("All inputs are requierd");
          }
          const user = await userM.findOne({ email });
          //bestätige die Email ....
          if (user) {
            res.status(200).json({ user: user });
          }
        } catch (e) {
          console.log(e);
        }
      }


      const Register = async (req , res) => {
        try {
          const { email, password } = req.body ||{};
    
          if (!email || !password) {
            res.status(408).json({ message: "All inputs are required" });
          }
    
          const oldUser = await userM.findOne({
            email , 
            password
          });
    
          if (oldUser) {
            return res
              .status(207)
              .json({ message: "User Already Exist. Please Login" });
          }
         
    
          const user = await userM.create({
            email , 
            password
          });
          console.log("user created");
          res.status(200).json(user);
        } catch (e) {
          console.log(e);
          res.status(200).json({message:'you have password'});
        }

      }


module.exports = {
  Login,
  Register,
};
