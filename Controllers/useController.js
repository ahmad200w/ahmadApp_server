const userM = require("../Modules/user.module");
const addresse =  require("../Modules/adress.module");
const category = require("./useCategory");


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
            email 
          });
    
          if (oldUser) {
            return res
              .status(207)
              .json({ message: "User Already Exist. Please Login" });
          }
         
    
          const user = await userM.create({
            email:email.toLowerCase(), 
            password
          });
          console.log("user created");
          res.status(200).json(user);
        } catch (e) {
          console.log(e);
          res.status(200).json({message:'done'});
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
  const saveTheDate =async (req,res)=>{
    let categoryN = new category({
        name:req.body.name,
        icon:req.body.icon,
        color:req.body.color


    })
    categoryN  =await category.save();
    if(!categoryN){
        return res.status(404).send('can"t be created! ')
    }else{
        res.send(category)
    }
} 

    

module.exports = {
  Login,
  Register,
  infoTheAddress ,
  saveTheDate
};
