const bookSchema = require("../models/bookSchema");
const cartSchema = require("../models/cartSchema");


const create = (req, res) => {
    const userId = req.token.userId;

                cartSchema.find({userId})
                .then((result)=>{
                    if(result.length=== 0 ){
                           const dbCart = new cartSchema({userId:userId  , carts:[]})  ;
                           dbCart.save()
                            .then((result) => {
                                res.status(201).json({
                                    success: true,
                                    message: "New cart created ",
                                });
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    success: false,
                                    message: "Error saving new cart",
                                    error: err.message,
                                });
                            });
                    }else{

                        res.status(200).json({
                            success: true,
                            message: "alredy exist cart",
                                    });
                                }
                }).catch((err)=>{
                    res.status(500).json({
                        success: false,
                        message: "Error saving new cart",
                        error: err.message,
                })
            })
               
           
}

const add = (req, res) => {
    const userId = req.token.userId;
    const _id = req.params.id;
    const quantity = 1

    cartSchema.findOneAndUpdate(
        { userId },
        { $push:{ carts: { book:_id , quantity } }}
    )
    .then((result) => {
        res.status(200).json({
            success: true,
            message: "Book added to existing cart",
        });
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: "Error updating cart",
            error: err.message,
        });
    });
};






const deleted = (req, res) => {
    const userId = req.token.userId;
    const book = req.params.id;

   

        cartSchema.findOne({ userId })
            .then((result) => {
                if (result.length === 0) {
                    return res.status(201).json({
                        success: true,
                        message: "not exist cart",

                    })
                } else {
                    cartSchema.findOneAndUpdate({ userId:userId },{ $pull:{carts:{book:book}}})
                    .then((result) => {
                        if (!result){
                            return res.status(404).json({
                                success: false,
                                message: "The book was not found in the cart"
                            });
                        }
                        res.status(200).json({
                            success: true,
                            message: "book delete from cart ",
                        });
                    }).catch((err) => {
                        res.status(500).json({
                            success: false,
                            message: "Error in deleted book",
                            error: err.message
                        });
                    })

                }
            })
            .catch((err) => {
                res.status(500).json({
                    success: false,
                    message: "Erorr Server",
                    error:err.message
                });
            })

}


const find = (req, res) => {
    const _id = req.token.userId
    cartSchema.findOne({ userId: _id }).populate({
        path: 'carts',
        populate: { path: 'book' }
  })
        .then((result) => {
            res.status(200).json({
                success: true,
                message: result
            })
        }).catch((err) => {
            res.status(404).json({
                success: false,
                message: err
            })
        })

}

const updateQuantity = (req, res) => {
    const userId = req.token.userId;
    const bookId = req.params.id;
    const { quantity } = req.body;

    console.log(quantity, bookId);

    cartSchema.findOneAndUpdate(
        { userId, "carts.book": bookId },
        { $set: { "carts.$.quantity": quantity } }, // Use positional operator `$` to update the correct item in the array
        { new: true } // Return the updated document
    )
    .then((result) => {
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Book not found in the cart",
            });
        }
        res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            data: result // Optionally return the updated cart
        });
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message: "Error updating cart",
            error: err.message,
        });
    });
};


module.exports = {
    create,
    deleted,
    find,
    add ,
    updateQuantity
}