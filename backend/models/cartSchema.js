const mongoose = require("mongoose") ; 

const cart = mongoose.Schema({
userId:{type:mongoose.Schema.Types.ObjectId, ref:"User", unique:true } , 
carts:[{
book:{type:mongoose.Schema.Types.ObjectId, ref:"Book" } , 
quantity: { type: Number, required: true, min: 1 }
}]  
})

module.exports = mongoose.model("Cart" , cart) ; 

