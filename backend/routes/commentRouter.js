const express = require("express") ; 
const commentRouter = express.Router() ; 
const {create} = require("../controllers/commentController");
const authentication = require("../middleware/authentication");

commentRouter.post("/create/:id" , authentication , create ) ; 




module.exports= commentRouter ; 
