const mongoose = require("mongoose") ; 

const comment = mongoose.Schema({
comment:{type:String} ,
commenter:{type:mongoose.Schema.Types.ObjectId , ref:"User"}  
})

module.exports = mongoose.model("Comment" , comment) ; 

