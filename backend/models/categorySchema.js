const mongoose = require("mongoose") ; 

const category = mongoose.Schema({
name:{type:String} , 
books:[{type:mongoose.Schema.Types.ObjectId , ref:"Book"}]  
})

module.exports = mongoose.model("Category" , category) ; 

