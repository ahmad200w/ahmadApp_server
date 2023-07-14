const userModule = require("../Modules/user.module");
const addresse =  require("../Modules/adress.module");

const Login = async (req, res) => {
        try {
          //     التحقق من وجود معلومات المستخدم
          const { email, password } = req.body || {};
    
    
          if (!(email && password)) {
            res.status(407).send("All inputs are requierd");
          }
          const user = await userModule.findOne({ email });
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
     
const infoTheAddress = async (req , res) => {
    try {
      const { name, nextname,addres,city,totalPreis } = req.body ||{};

      if (!name || !nextname || !addres || !city) {
        res.status(408).json({ message: "Alle infos sind gefordert" });
      }

      const oldUser = await addresse.findOne({
        name, nextname,addres,city
      });

      if (oldUser) {
        return res
          .status(207)
          .json({ message: "schon bestellt..." });
      }
     

      const user = await addresse.create({
        name,
         nextname,
         addres,
         city
      });
      console.log("Addres ist vorhanden");
      res.status(200).json(user);
    } catch (e) {
      console.log(e);
      res.status(200).json({message:'keine genaue Infos ...'});
    }

  }

    

module.exports = {
  Login,
  Register,
  infoTheAddress ,
};
