const favortieSchema = require("../models/favoriteSchema") ; 

const create = (req , res)=>{

 const userId = req.token.userId ; 

 const dbFavortie = new favortieSchema({userId})
 
 dbFavortie.save()
 .then((result)=>{
    res.status(201).json({
    success:true  , 
    message:result
    })})
    .catch((err)=>{
    res.status(500).json({
    success:false , 
    message :"Server Error"
    })
})

}
const add = (req , res)=>{
   const _id = req.params.id ; 
   const userId = req.token.userId ; 
  favortieSchema.findOneAndUpdate({userId} , {$push:{favortie:_id}})
  .then((result)=>{
    res.status(201).json({
    success:true  , 
    message:result
    })})
    .catch((err)=>{
    res.status(500).json({
    success:false , 
    message :"Server Error"
    })
})
}


const deleted = (req , res)=>{

    
}

module.exports={
   create ,  
   add , 
}