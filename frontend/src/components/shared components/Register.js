import axios from "axios" ; 
import { useState } from "react";
import "./register.css" 
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const Register =()=>{

const [name , setName] = useState(null) ; 
const [lastName , setLastName] = useState(null) ; 
const [age , setAge] = useState(null) ; 
const [email ,setEmail] = useState(null) ; 
const [password , setPassword] = useState(null) ; 
const [created , setCreated] = useState(null) ; 
    
const information = { name , lastName , age:18, email , password} ; 
const send = () =>{    
  console.log(information)
 axios.post("http://localhost:5000/user/register" , information )
.then((result)=>{  
  console.log(result)
   setCreated(result.data.message) 
}).catch((err)=>{
  console.log(err)
   setCreated(err.response.data.message)
})
}

const changeName =(e)=>{
  setName(e.target.value)  
}

const changeLastName =(e)=>{
    setLastName(e.target.value)  
  }
  const changeAge =(e)=>{
    setAge(e.target.value)  
  }
  const changeEmail =(e)=>{
    setEmail(e.target.value)  
  }
  const changePassword =(e)=>{
    setPassword(e.target.value)  
  }

  const credentialResponse=(res)=>{
    const s = jwtDecode(res.credential) ;  
     axios.post("http://localhost:5000/user/register" , {name:s.given_name , lastName:s.family_name , age:22 ,  email:s.email ,  password:s.name} )
    .then((result)=>{  
     setCreated(result.data.message) 
   }).catch((err)=>{
    console.log(err)
    setCreated(err.response.data.message)
})
     
    
    

}

  const errorMassege = (err)=>{
    console.log(err) ; 

 }




return(

<div className="register">  
<h1>Register</h1>

<label> Name </label>
<input onChange={changeName} placeholder="user name"/>



<label> Last Name </label>
<input onChange={changeLastName} placeholder="last name"/>


<label> Age </label>
<input onChange={changeAge} placeholder="age"/>



<label> Email </label>
<input onChange={changeEmail} placeholder="email"/>


<label> Password </label>
<input type="password" onChange={changePassword} placeholder="password"/>

<button onClick={send}> Login </button>

<GoogleLogin className="googleLoginButton"
onSuccess={credentialResponse}
onError={errorMassege}
size ="large"
type="standard"
width="200px"
theme="filled_blue"
          

/>


{created? <div className="message_register">{created}</div> : <div className="message_register"> {created} </div> }
<br/>
  
</div>

 ) 



}


export default Register ; 