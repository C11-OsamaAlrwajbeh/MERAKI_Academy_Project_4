require('dotenv').config();
const mongoose = require("mongoose") ; 
const URI = process.env.URI ;  
console.log(URI) ; 

mongoose.connect(URI)
.then((res)=>{
console.log("connect dv") ; 
}).catch((err)=>{
console.log(err) ; 
})


