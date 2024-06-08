const mongoose = require("mongoose") ; 

const favortie = mongoose.Schema({
userId:{type:mongoose.Schema.Types.ObjectId , ref:"User"} , 
favortie:[{type:mongoose.Schema.Types.ObjectId , ref:"Book"}]  
})

module.exports = mongoose.model("favortie" , favortie) ; 

