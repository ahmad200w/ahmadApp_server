const { hashPassword } = require("../helpers/auth");
const userModule = require("../Modules/user.module");



const Register = async (req, res) => {
    try {
      const { userName, email, password } = req.body;
  
      if (!userName || !email || !password) {
       return res.status(408).json({ message: "All inputs are required" });
       
      }
      // check if the password in DB....
      const oldUser = await userModule.findOne({
        email,
      });
  
      if (oldUser) {
        return res.status(207).json({ message: "User Already Exist" });
      }
  
      // hash the password  ....
      const hashedPassword = await hashPassword(password);
  
      const user = await userModule.create({
        userName: userName,
        email: email,
        password: hashedPassword,
      });
     
  
      
  
      res.status(200).json(user);
      return;
    }
     catch (e) {
      console.log(e);
      res.status(500).json({ message: "No connection" });
    }
  };
  module.exports = Register;