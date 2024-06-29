const categoriesSchema = require("../models/categorySchema");


const create = (req , res)=>{
const {name} = req.body ; 
const category = [] ; 




const dbCategory = new categoriesSchema({name , category}) 

dbCategory.save()
.then((result)=>{
res.status(201).json({
success:true  , 
message : "Create Success"
})}).catch((err)=>{
res.status(500).json({
success:false , 
message :"Error Create Category " ,
erorr:err
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
        message : "can not add book"
    })

    res.status(201).json({
    success:true  , 
    message : "Create add"
    })}).catch((err)=>{
    res.status(500).json({
    success:false , 
    message :"Error add" , 
    error:err
    })

    })
    

}

const deleted = (req , res)=>{
    const {id , name} = req.params ; 
    categoriesSchema.findOneAndUpdate({name},{$pull:{books:id}})
    .then((result)=>{
        if(!result)
        return res.status(500).json({
            success: false  , 
            message : "can not delete book"})
    
        res.status(201).json({
        success:true  , 
        message : "Delete Successfully"
        })}).catch((err)=>{
        res.status(201).json({
        success:false , 
        message :"Error Delete"
        })
    
        })

}


const findByName =(req , res)=>{  
const {name} = req.params ;   
categoriesSchema.findOne({name}).populate("books")
.then((result)=>{
    if(!result){
 return res.status(500).json({
    success:false  , 
    message : "not result"
    })
   }
    else{
    res.status(201).json({
    success:true  , 
    message : result
    })
}
    }).catch((err)=>{
    res.status(500).json({
    success:false , 
    message :"Server Error"
    })

    })


}

const find =(req , res)=>{    
    categoriesSchema.find({}).populate("books")
    .then((result)=>{
        if(!result){
     return res.status(500).json({
        success:false  , 
        message : "not result"
        })
       }
        else{
        res.status(201).json({
        success:true  , 
        message : result
        })
    }
        }).catch((err)=>{
        res.status(500).json({
        success:false , 
        message :"Server Error"
        })
    
        })
    
    
    }
    


module.exports = {
    create ,  
    add ,
    deleted, 
    findByName ,
    find
}