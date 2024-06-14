const bookSchema = require("../models/bookSchema");
const cartSchema = require("../models/cartSchema");


const create = (req, res) => {
    const userId = req.token.userId;
    cartSchema.find({ userId })
        .then((result) => {
            if (result.length === 0) {
                const dbCart = new cartSchema({ userId });
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
            } else {
                res.status(200).json({
                    success: false,
                    message: "The cart already exists",
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "Error finding cart",
                error: err.message,
            });
        });
};

const add =(req , res)=>{
    const userId = req.token.userId;
    const book = req.params.id ; 
    cartSchema.findOneAndUpdate({userId},{ $push:{ carts: book } })
    .then((result) => {
        res.status(200).json({
            success: true,
            message: "Books added to existing cart",
        });
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: "Error updating cart",
            error: err.message
        });
    })

}






const deleted = (req, res) => {
    const userId = req.token.userId;
    const carts = req.params.id;

        cartSchema.findOne({ userId })
            .then((result) => {
                if (result.length === 0) {
                    return res.status(201).json({
                        success: true,
                        message: "not exist cart",

                    })
                } else {
                    cartSchema.updateOne({ userId: userId }, { $pull: { carts: carts } })
                    .then((result) => {
                        if (result.modifiedCount === 0)
                            return res.status(404).json({
                                success: false,
                                message: "The book was not found in the cart"
                            });
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
                });
            })

}


const find = (req, res) => {
    const _id = req.token.userId
    console.log(_id);
    cartSchema.findOne({ userId: _id }).populate("carts")
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




module.exports = {
    create,
    deleted,
    find,
    add 
}