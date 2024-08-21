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




const ordertherUser = async (req, res) => {
  try {
    // استخدم aggregate لتصفية المستخدمين وعرض الحقول المطلوبة فقط
    const usersWithOrders = await userModule.aggregate([
      { $match: { 'orders.0': { $exists: true } } }, // تصفية المستخدمين الذين لديهم طلبات
      { $project: { password: 0
        ,_id:0
       } } // استبعاد كلمة المرور من النتائج
    ]);

    // إرسال الاستجابة بنجاح
    return res.status(200).json(usersWithOrders);
    
  } catch (e) {
    // تسجيل الخطأ وإرسال رسالة خطأ
    console.error(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};



const sendOrder = async (req, res) => {
  const { userName, email, orders, total } = req.body;

  // التحقق من وجود كل من userName و email
  if (!userName || !email) {
    return res.status(400).json({ message: "Username and email are required" });
  }

  // التحقق من صحة البيانات
  if (!orders || typeof total !== 'number') {
    return res.status(400).json({ message: "Invalid orders or total amount" });
  }

  try {
    // تحديث المستخدم بناءً على البريد الإلكتروني
    let user = await userModule.findOne({ email });

    // التحقق من وجود المستخدم
    if (!user) {
      return res.status(404).json({ message: "User with this email not found" });
    }

    // تحديث معلومات الطلبات والمجموع
    user.orders = orders;
    user.total = total;

    // حفظ التعديلات
    await user.save();

    return res.status(200).json({ message: "Order sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to complete the order" });
  }
};

module.exports = {
  Login,
  Register,
  ordertherUser,
  sendOrder
};
