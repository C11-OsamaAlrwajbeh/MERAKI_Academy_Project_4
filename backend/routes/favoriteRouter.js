const express = require("express") ; 
const { create , add , deleted , find} = require("../controllers/favoriteController");
const authentication = require("../middleware/authentication");
const authorization =require("../middleware/authorization") ; 
const favoriteRouter = express.Router() ; 


favoriteRouter.post("/create" , authentication , create) ; 
favoriteRouter.post("/add/:id", authentication  , add) ; 
favoriteRouter.delete("/delete/:id", authentication , deleted) ; 
favoriteRouter.get("/find" , authentication , find )







module.exports = favoriteRouter ; 