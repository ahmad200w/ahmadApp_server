const userModule = require('../Modules/user.module')

const { hashPassword, comparePassword } = require("../helpers/auth");
const setArr =[]



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
    res.status(500).json({ message: "somting worng" });
  }
};
const Login = async (req, res) => {
  try {
    //     التحقق من وجود معلومات المستخدم
    const { userName, email, password } = req.body ;


    if (!(userName && email && password)) {
      res.status(407).send("All inputs are requierd");
    }
    const user = await userModule.findOne({ email });
    //bestätige die Email ....
    if (!user) {
      
     return res.status(401).json({ massage :"error "});
    }else{
      console.log('Sw')
    }

    // check if password equel the password ...

    const match = await comparePassword(user.password, password );
    console.log(match)
    if (!match) {
     return res.status(401).json({ message: "no hash" });
    }
  } catch (e) {
    console.log(e);
  }
};
const findeAllUser =async (req, res)=>{
  const {userName}= req.body;

  try{
    const start = await userModule.find()
    if(start){
      return res.status(200).json(start)
    }

    
  


  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "somting worngx" });
  }
 
}

module.exports = {
  Login,
  Register,
  findeAllUser
};
