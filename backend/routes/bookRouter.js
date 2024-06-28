const multer = require("multer");
const path = require("path");

const express = require("express") ; 
const bookRouter = express.Router() ; 
const {create , findAll , update , deleted, findById} = require("../controllers/bookController");
  
bookRouter.post("/create" , create ) ; 
bookRouter.get("/find" , findAll) ; 
bookRouter.put("/update/:id" , update) , 
bookRouter.delete("/delete/:id" , deleted)
bookRouter.get("/findById/:id" , findById)





module.exports= bookRouter ; 
