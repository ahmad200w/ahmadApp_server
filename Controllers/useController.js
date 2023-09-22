const userModule = require("../Modules/user.module");

const { hashPassword, comparePassword } = require("../helpers/auth");

const Login = async (req, res) => {
  try {
    //     التحقق من وجود معلومات المستخدم
    const { userName, email, password } = req.body ;
    console.log(req.body)

    if (!(userName && email && password)) {
      res.status(407).send("All inputs are requierd");
    }
    const user = await userModule.findOne({ email });
    //bestätige die Email ....
    if (user) {
      res.status(200).json({ user: user });
    }

    // check if password equel the password ...

    const match = await comparePassword(user.password, password);
    if (match) {
      res.status(200).json({ message: "done" });
    }
  } catch (e) {
    console.log(e);
  }
};

const Register = async (req, res) => {
  try {
    const { userName, email, password } = req.body ;

    if (!userName || !email || !password) {
      res.status(408).json({ message: "All inputs are required" });
      return;
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
    console.log(user)
  
    res.status(200).json(user);
    return;
  } 
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "An error occurred" });

    
  }
 
};

module.exports = {
  Login,
  Register,
};
