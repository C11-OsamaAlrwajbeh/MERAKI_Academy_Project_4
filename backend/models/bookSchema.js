const mongoose = require("mongoose") ; 

const book = mongoose.Schema({
title:{type:String } , 
description:{type:String},
imge:{type:String} , 
comments:[{type:mongoose.Schema.Types.ObjectId, ref:"Comment" }]
})

module.exports = mongoose.model("Book" , book) ; 

