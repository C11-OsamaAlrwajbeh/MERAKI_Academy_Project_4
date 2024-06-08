const express = require("express") ; 
const roleRouter = express.Router() ; 
const {create} = require("../controllers/roleController")

roleRouter.post("/create" , create ) ; 




module.exports= roleRouter ; 
