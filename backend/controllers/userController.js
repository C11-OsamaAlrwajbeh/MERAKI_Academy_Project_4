const userSchema = require("../models/userSchema") ; 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register=( req , res )=>{
const {name , lastName , age  , email ,  password  } = req.body
const dbUser = new userSchema({
     name ,
     lastName ,
     age  ,
     email ,  
     password 
})    

dbUser.save()
.then((result)=>{
    
    res.status(201).json({
        success:true  , 
        message:" create success "  
    })
    }).catch((err)=>{
      console.log(err.keyPattern)
     if (err.keyPattern) {
        return res.status(409).json({
              success: false,
              message: `The email already exists`,
            });      
    }
    res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
})
}


const login = (req, res) => {

  if (!req.body.password || !req.body.email){
    return res.status(403).json({
      success: false,
      message: `Must Be Enter Password and Email `,
    })
    }
    const password = req.body.password;
    const email = req.body.email.toLowerCase() ; 
  
    userSchema
      .findOne({ email})
      .populate("role", "-_id -__v")
      .then(async (result) => {
        if (!result) {
          return res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          });
        }
        try {
          const valid = await bcrypt.compare(password, result.password);
          if (!valid) {
            return res.status(403).json({
              success: false,
              message: `The email doesn't exist or The password you’ve entered is incorrect`,
            });
          }
          const payload = {
            userId: result._id,
            name:result.name , 
            lastName: result.lastName , 
            role: result.role,
            age:result.age , 
          };
  
          const options = {
            expiresIn: "60m",
          };
          const token = jwt.sign(payload, process.env.SECRET, options);
          res.status(200).json({
            success: true,
            message: `Valid login credentials`,
            token: token,
            userId:result._id,
            role: result.role,
          });
        } catch (error) {
          throw new Error(error.message);
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
  };

   const findAll = (req , res)=>{
    userSchema.find({})
    .then((result)=>{
       return res.status(200).json({
        success:true , 
        message:result
       })     
    }).catch((err)=>{
        return res.status(500).json({
            success: false , 
            message: "Server Error"

    })
   })


   }

   const deleted = (req, res) => {
    const _id = req.params.id;

    userSchema.deleteOne({ _id })
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            res.status(200).json({
                success: true,
                message: "User deleted"
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "Delete error",
                error: err.message
            });
        });
};
const update = (req, res) => {
  const _id = req.params.id;
  const updateData = req.body;
  console.log(_id)

  userSchema.findByIdAndUpdate(_id, updateData)
      .then((result) => {
          if (!result) {
              return res.status(404).json({
                  success: false,
                  message: "User not found"
              });
          }
          res.status(200).json({
              success: true,
              message: "User updated successfully",
              user: result
          });
      })
      .catch((err) => {
          res.status(500).json({
              success: false,
              message: "Update error",
              error: err.message
          });
      });
};

module.exports = {
register ,
login, 
findAll, 
deleted , 
update,

}
