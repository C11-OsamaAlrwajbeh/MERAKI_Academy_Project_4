const express = require("express") ; 
const bookRouter = express.Router() ; 
const {create , findAll , update , deleted} = require("../controllers/bookController");


bookRouter.post("/create" , create ) ; 
bookRouter.get("/find" , findAll) ; 
bookRouter.put("/update/:id" , update) , 
bookRouter.delete("/delete/:id" , deleted)





module.exports= bookRouter ; 
