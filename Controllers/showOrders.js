const userModule = require("../Modules/user.module");

const usersOrder = async (req, res) => {
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
      res.status(500).json({ message: "No connection" });
    }
  };
  module.exports  = usersOrder