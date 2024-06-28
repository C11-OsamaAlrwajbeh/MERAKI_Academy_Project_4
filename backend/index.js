require('dotenv').config ; 
const db = require("./models/db")  ; 
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const roleRouter = require('./routes/roleRouter');
const bookRouter = require("./routes/bookRouter");
const commentRouter = require('./routes/commentRouter');
const cartRouter = require('./routes/cartRouter');
const categoryRouter = require("./routes/categoryRouter") ; 
const favoriteRouter = require("./routes/favoriteRouter") ; 
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname , "images")))

// Handles any other endpoints [unassigned - endpoints]
app.use("/favorite" , favoriteRouter)
app.use("/category" , categoryRouter) ; 
app.use("/cart" , cartRouter) ; 
app.use("/user" , userRouter) ; 
app.use("/role" , roleRouter )
app.use("/book" , bookRouter )
app.use("/comment" , commentRouter )


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
