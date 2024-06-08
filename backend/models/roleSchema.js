const mongoose = require("mongoose") ; 

const role = mongoose.Schema({
role:{type:String} , 
permissions:[String]  
})

module.exports = mongoose.model("Role" , role) ; 

