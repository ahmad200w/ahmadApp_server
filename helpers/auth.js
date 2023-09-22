const bcrypt = require('bcrypt')



const hashPassword = (password)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(10,(err,salt)=>{
            if(err){
                reject(err)
            }
            bcrypt.hash(password,salt,(err,hash)=>{
                if(err){
                    reject(err)
                }
                resolve(hash)
            })

        })
    })
}



const comparePassword =(password,hashed)=>{

    return bcrypt.compare(password,hashed).then((result) => {
        return result;
      })
      .catch((err) => {
        throw err; // يمكنك التعامل مع الخطأ هنا أو إعادة رميه للأعلى للتعامل معه في مكان آخر.
      });
}
module.exports ={
    hashPassword,
    comparePassword
}