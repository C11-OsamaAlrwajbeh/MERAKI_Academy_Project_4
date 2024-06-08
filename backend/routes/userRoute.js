const express = require("express") ; 
const userRouter = express.Router() ; 
const {register , login , findAll , deleted , update} = require("../controllers/userController");
const authentication = require("../middleware/authentication");
const bcrypte = require("../middleware/bcrypt")

userRouter.post("/create" , register ) ; 
userRouter.post("/login"  , login  )
userRouter.put("/update/:id" , bcrypte ,  update )
userRouter.get("/find" , authentication , findAll )
userRouter.delete("/delete/:id" , deleted)




module.exports= userRouter ; 
