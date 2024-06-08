const express = require("express") ; 
const cartRouter = express.Router() ; 
const {create , deleted, find} = require("../controllers/cartController");
const authentication = require("../middleware/authentication");


cartRouter.post("/create/:id" , authentication , create ) ;
cartRouter.get("/find" , authentication , find ) ;  
cartRouter.delete("/delete/:id" , authentication , deleted)




module.exports= cartRouter ; 
