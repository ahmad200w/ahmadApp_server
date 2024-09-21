const userModule = require('../Modules/user.module')
const { comparePassword } = require("../helpers/auth");
const Login = async (req, res) => {
    try {
      //     التحقق من وجود معلومات المستخدم
      const { userName, email, password } = req.body ;
  
  
      if (!userName ||!email || !password) {
        return res.status(407).json({ message: "Email and password are required" });
      }
      const user = await userModule.findOne({ email });
      //bestätige die Email ....
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      } else {
        console.log('User found:', user);
      }
  
      // check if password equel the password ...
  
      const match = await comparePassword(password, user.password);
  
      if (!match) {
        return res.status(401).json({ message: "Invalid password" });
      }
      
  
      if(match){
  
        return res.status(200).json(user);
      }
  
  
    } catch (e) {
      console.log(e);
    }
  };
  module.exports = Login;