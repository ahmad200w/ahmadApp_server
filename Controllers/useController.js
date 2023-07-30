const userM = require("../Modules/user.module");
const addresse = require("../Modules/adress.module");
const category = require("./useCategory");
const {
  hashPassword,
  comparePassword
}= require('../helpers/auth')
const jwt =require('jsonwebtoken');
const { token } = require("morgan");



const Login = async (req, res) => {
  try {
    //     التحقق من وجود معلومات المستخدم
    const { email, password } = req.body || {};

    if (!(email && password )) {
      res.status(407).send("All inputs are requierd");
    }
    const user = await userM.findOne({ email });
    //bestätige die Email ....
    if (user) {
      res.status(200).json({ user: user });
    }

    // check if password equel the password ...

    const match = await comparePassword(password,userM.password)
    JWT_SECRET ="LLDWDCEWEFIBJFKFO2323R3EFF"

    if(user&& match){
     const token = jwt.sign({email:user.email,id:user._id},JWT_SECRET);
       
     user.token = token
     res.status(200).json({ user: user });

    }
    if(!match){


   
      res.status(400).json('password is not matched ')
    }
   
    
  }
   catch (e) {
    console.log(e);
  }
};

const Register = async (req, res) => {
  try {
    const { email, password } = req.body || {};

   

    if (!email || !password) {
      res.status(408).json({ message: "All inputs are required" });
      return;
    }
// check if the password in DB....
    const oldUser = await userM.findOne({
      email,
    });

    if (oldUser) {
      return res
        .status(207)
        .json({ message: "User Already Exist" });
    }
  
    // hash the password  ....
    const hashedPassword = await hashPassword(password)
    JWT_SECRET ="LLDWDCEWEFIBJFKFO2323R3EFF"
    const token = jwt.sign({email:user.email,id:user._id},JWT_SECRET);
    user.token = token
  
    const user = await userM.create({
      email: email,
      password :hashedPassword,
    });
    console.log(password)
    console.log("user created");
    res.status(200).json(user);
    return;

  } catch (e) {
    console.log(e);
   
  }
  res.status(200).json({ message: "done" });
};

const infoTheAddress = async (req, res) => {
  try {
    const { name, nextname, addres, city, totalPreis } = req.body || {};

    if (!name || !nextname || !addres || !city) {
      res.status(408).json({ message: "Alle infos sind gefordert" });
    }

    const oldUser = await addresse.findOne({
      name,
      nextname,
      addres,
      city,
    });

    if (oldUser) {
      return res.status(207).json({ message: "schon bestellt..." });
    }

    const user = await addresse.create({
      name,
      nextname,
      addres,
      city,
    });
    console.log("Addres ist vorhanden");
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(200).json({ message: "keine genaue Infos ..." });
  }
};
const saveTheDate = async (req, res) => {
  let categoryN = new category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  categoryN = await categoryN.save();
  if (!categoryN) {
    return res.status(404).send('can"t be created! ');
  } else {
    res.send(categoryN);
  }
};
const deletById = (req, res) => {
  category
    .findById(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "the category has deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "somting worng" });
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
};
const upDateTheData = async (req, res) => {
  const category = await category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  );

  if (!category) {
    return res.status(404).send('can"t be created! ');
  } else {
    res.send(category);
  }
};

const findProduct = async (req, res) => {
  const categorys = await category.find();
  if (!categorys) {
    res.status(500).json({ success: false });
  }
  res.send(categorys);
};

module.exports = {
  Login,
  Register,
  infoTheAddress,
  saveTheDate,

  deletById,
  upDateTheData,
  findProduct,
};
