const categoriesSchema = require("../models/categorySchema");
const userSchema = require("../models/userSchema");


const create = (req , res)=>{
const name = req.body.name ; 

const dbCategory = new categoriesSchema({name}) 

dbCategory.save().then((result)=>{
res.status(201).json({
success:true  , 
message : "Create Success"
})}).catch((err)=>{
res.status(201).json({
success:false , 
message :"Error Create Category "
})
})

}


const add = (req , res)=>{
const {id , name} = req.params; 
categoriesSchema.findOneAndUpdate({name} , {$push:{books:id}})
.then((result)=>{
    if(!result)
    return res.status(500).json({
        success: false  , 
        message : "can not add book"})

    res.status(201).json({
    success:true  , 
    message : "Create add"
    })}).catch((err)=>{
    res.status(201).json({
    success:false , 
    message :"Error add"
    })

    })
    

}









module.exports = {
    create ,  
    add 
}