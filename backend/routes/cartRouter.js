const express = require("express") ; 
const cartRouter = express.Router() ; 
const {create , deleted, find , add , updateQuantity} = require("../controllers/cartController");
const authentication = require("../middleware/authentication");


cartRouter.post("/create" , authentication , create ) ;
cartRouter.get("/find" , authentication , find ) ;  
cartRouter.post("/add/:id" , authentication , add ) ;  
cartRouter.delete("/delete/:id" , authentication , deleted)
cartRouter.put('/update/:id', authentication, updateQuantity);



module.exports= cartRouter ; 
