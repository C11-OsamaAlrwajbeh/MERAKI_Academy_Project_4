const bcrypt = require ("bcrypt")

const bcrypte = async (req , res , next)=>{

    req.body.email = req.body.email.toLowerCase() ; 
    req.body.password = await bcrypt.hash(req.body.password , 10)  ; 
    next() ;
    }


module.exports = bcrypte ;     