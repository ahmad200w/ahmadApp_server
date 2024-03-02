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
const sendOrder = async (req, res) => {
  const { userName, email,  orders, total } = req.body;

  if (!userName || !email) {
    return res.status(407).json({ message: "Username, email, and password are required" });
  }

  // تحقق من صحة بنية البيانات للطلبات والمجموع
 

  try {
    let user = await userModule.findOneAndUpdate({ email },{orders,total});
  
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

   
  
    // إضافة طلبات والمجموع للمستخدم
    user.orders = orders;
    user.total =total;
  
    await user.save();
  
    return res.status(200).json({ message: "Order sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  Login,
  Register,
  findeAllUser,
  sendOrder
};
