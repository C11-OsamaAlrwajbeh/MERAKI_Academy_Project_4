const mongoose = require("mongoose") ; 

const cart = mongoose.Schema({
userId:{type:mongoose.Schema.Types.ObjectId, ref:"User",unique:true } , 
carts:[{type:mongoose.Schema.Types.ObjectId, ref:"Book" }]  
})

module.exports = mongoose.model("Cart" , cart) ; 

