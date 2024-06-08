const {create , add }= require("../controllers/categoryController") ; 

const express = require("express") ; 
const categoryRouter = express.Router() ; 


categoryRouter.post("/create" , create) ;
categoryRouter.post("/add/:id/:name" , add) 




module.exports = categoryRouter ; 