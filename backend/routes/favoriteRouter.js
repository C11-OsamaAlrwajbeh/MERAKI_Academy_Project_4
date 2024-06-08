const express = require("express") ; 
const { create , add , deleted} = require("../controllers/favoriteController");
const authentication = require("../middleware/authentication");
const favoriteRouter = express.Router() ; 


favoriteRouter.post("/create", authentication , create) ; 
favoriteRouter.post("/add/:id", authentication , add) ; 
favoriteRouter.delete("/delete/:id", authentication , deleted) ; 







module.exports = favoriteRouter ; 