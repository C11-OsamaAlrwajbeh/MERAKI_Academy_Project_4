import axios from "axios" ; 
import { useState } from "react";
import "./register.css" 

const Register =()=>{

const [name , setName] = useState(null) ; 
const [lastName , setLastName] = useState(null) ; 
const [age , setAge] = useState(null) ; 
const [email ,setEmail] = useState(null) ; 
const [password , setPassword] = useState(null) ; 
const [created , setCreated] = useState(null) ; 
    
const information = { name , lastName , age, email , password} ; 
const send = () =>{    
axios.post("http://localhost:5000/user/register" , information )
.then((result)=>{  

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

return(

<div className="register">  
<h1>Register</h1>

<label> Name </label>
<input onChange={changeName} placeholder="user name"/>

<br/>

<label> Last Name </label>
<input onChange={changeLastName} placeholder="last name"/>

<br/>
<label> Age </label>
<input onChange={changeAge} placeholder="age"/>

<br/>

<label> Email </label>
<input onChange={changeEmail} placeholder="email"/>

<br/>

<label> Password </label>
<input onChange={changePassword} placeholder="password"/>

<button onClick={send}> Login </button>

{created? <div className="message">{created}</div> : <div className="message"> {created} </div> }
<br/>
  
</div>

 ) 



}


export default Register ; 