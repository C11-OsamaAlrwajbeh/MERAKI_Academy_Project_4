const bookSchema = require("../models/bookSchema") ; 

const create =( req , res )=>{
const {title , description, author , language , genre , pages , price  , imge, comments } = req.body
const dbBook = new bookSchema({
    title , description, imge , author , language , genre , pages ,price
})    

dbBook.save()
.then((result)=>{
    res.status(201).json({
        success:true  , 
        message:" create success "  
    })
    }).catch((err)=>{
    res.status(500).json({
        success: false,
        message: `create failed`,
        err: err,
      });
})
}


const findAll = (req , res)=>{
    bookSchema.find({}).populate({
      path: 'comments',
      populate: { path: 'commenter' }
})
    .then((result)=>{
       return res.status(200).json({
        success:true , 
        message:result
       })     
    }).catch((err)=>{
        return res.status(500).json({
            success: false , 
            message: "Error Serves"

    })
   })

}


const findById = (req , res)=>{
  const _id =req.params.id ; 
  bookSchema.findOne({_id}).populate({
    path: 'comments',
    populate: { path: 'commenter' }
})
  .then((result)=>{
     return res.status(200).json({
      success:true , 
      message:result
     })     
  }).catch((err)=>{
      return res.status(500).json({
          success: false , 
          message: "Error Serves"

  })
 })

}



  
 const deleted = (req , res)=>{
    const {id} = req.params ; 
   bookSchema.deleteOne({_id:id}).then((result)=>{
    return res.status(200).json({
     success:true , 
     message:"Deleted Success"
    })     
 }).catch((err)=>{
     return res.status(500).json({
         success: false , 
         message: "Error in deleted book"

 })
 }) 

 }

 const update = (req, res) => {
    const { id } = req.params;
    const bookUpdate = req.body;
  
    bookSchema
      .findByIdAndUpdate({_id:id}, bookUpdate)
      .then((result) => {
        if (result) {
          res.status(200).json({
            success: true,
            message: "Update success",
            data: result,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Book not found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
  };



   
module.exports = {
create ,
findAll , 
findById , 
deleted , 
update , 

}