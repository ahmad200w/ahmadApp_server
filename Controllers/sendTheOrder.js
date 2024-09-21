const userModule = require("../Modules/user.module");

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
  module.exports = sendOrder