const express = require("express") ; 
const commentRouter = express.Router() ; 
const {create , update , deleted} = require("../controllers/commentController");
const authentication = require("../middleware/authentication");



commentRouter.post("/create/:id" , authentication , create ) ; 
commentRouter.put("/update/:id" , authentication , update ) ; 
commentRouter.delete("/delete/:idBook/:id" , deleted ) ; 




module.exports= commentRouter ; 
