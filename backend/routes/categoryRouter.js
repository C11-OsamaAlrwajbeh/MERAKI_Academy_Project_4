const {create , add  , deleted , find, findByName}= require("../controllers/categoryController") ; 

const express = require("express") ; 
const categoryRouter = express.Router() ; 


categoryRouter.post("/create" , create) ;
categoryRouter.post("/add/:id/:name" , add) 
categoryRouter.delete("/delete/:id/:name" , deleted ) 
categoryRouter.get("/find/:name" , findByName ) 
categoryRouter.get("/find" , find)



module.exports = categoryRouter ; 