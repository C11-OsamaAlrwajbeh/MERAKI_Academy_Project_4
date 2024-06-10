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


const update =(req ,res)=>{
  const {comment} = req.body ; 
  const _id = req.params.id ; 
  commentSchem.findOneAndUpdate({_id},{comment}).then((result)=>{
    res.status(201).json({
      success: true,
      message: `Comment update`,
      comment: result,
    });
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: `Erorr Update`,
      err: err.message,
    });
  });

}
const deleted = (req, res) => {
  const _id = req.params.id;

  commentSchem.deleteOne({ _id })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Comment not found',
        });
      }

        bookSchema.findOneAndUpdate(
        { comments: _id },
        { $pull: { comments: _id } },
        { new: true }
      );
    })
    .then((updatedBook) => {
      if (!updatedBook) {
        return res.status(404).json({
          success: false,
          message: 'Book not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Comment deleted successfully',
        book: updatedBook,
      });
    })
    .catch((err) => {
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: 'Error deleting comment',
          err: err.message,
        });
      }
    });
}

module.exports = {
    create , 
    update , 
    deleted , 
}