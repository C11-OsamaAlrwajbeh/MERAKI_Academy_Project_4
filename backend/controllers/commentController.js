const commentSchem = require("../models/commentSchema") ; 
const bookSchema = require("../models/bookSchema") ; 




const create = ( req , res )=>{
 const id = req.params.id  ; 
 const comment = req.body.comment ; 
 const commenter = req.token.userId ; 

 
 const dbComment = new commentSchem({comment , commenter})
 dbComment.save()
 .then((result)=>{
    bookSchema.findOneAndUpdate({_id :id} ,{ $push: { comments: result._id }}).then((result) =>{
        res.status(201).json({
          success: true,
          message: `Comment added`,
          comment: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
}).catch((err)=>{
    res.json(err) ;
 })





}


module.exports = {
    create
}