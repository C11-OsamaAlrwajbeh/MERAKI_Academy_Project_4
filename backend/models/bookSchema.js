const mongoose = require("mongoose") ; 

const book = mongoose.Schema({
title:{type:String } , 
description:{type:String},
imge:{type:String} , 
author: {type: String , required: true },
pages: { type: Number, required: true },
language: { type: String, required: true } ,
genre:{  type: String , required: true} , 
price:{type:Number , required: true} , 
comments:[{type:mongoose.Schema.Types.ObjectId, ref:"Comment" }]
})

module.exports = mongoose.model("Book" , book) ; 

