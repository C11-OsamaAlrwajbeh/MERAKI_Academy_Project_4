const mongoose = require("mongoose") ; 
const bcrypt = require("bcrypt") ; 
const user = mongoose.Schema({
name:{type:String  , required:true} , 
lastName:{type:String , required:true} , 
age:{type:Number , required:true} , 
role : { type:mongoose.Schema.Types.ObjectId , ref:"Role"} , 
email : {type:String , unique:true},
password:{type:String} 

})


user.pre("save" , async function(){
this.email = this.email.toLowerCase() ; 
console.log(this.password)
this.password = await bcrypt.hash(this.password , 10) 

})



module.exports = mongoose.model("User" , user) ; 