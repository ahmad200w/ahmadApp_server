const category = require('../Modules/category')

const saveTheDate =async (req,res)=>{
    let category = new category({
        name:req.body.name,
        icon:req.body.icon,
        color:req.body.color


    })
    category  =await category.save();
    if(!category){
        return res.status(404).send('can"t be created! ')
    }else{
        res.send(category)
    }
} 