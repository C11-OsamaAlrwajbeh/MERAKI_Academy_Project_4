import axios from "axios" ; 
import { useState } from "react";
import "./login.css"
const Login =()=>{

    const [email ,setEmail] = useState(null) ; 
    const [password , setPassword] = useState(null) ; 
    const [token , setToken] = useState(null) ; 
    const [created , setCreated] = useState(false)
    const [message , setMessage]=useState(null)

    const verify ={email , password} ; 

 const changeEmail =(e)=>{
        setEmail(e.target.value)  
      }

 const changePassword =(e)=>{
        setPassword(e.target.value)  
     }

 const valied = ()=>{
    axios.post("http://localhost:5000/user/login" , verify )
    .then((result)=>{
        setToken(result.data.token) ; 
        setCreated(true) ; 
    }).catch((err)=>{
        setMessage(err.response.data.message)
        setCreated(false)
    })
 }

   

return(
<div className="login">

<h1>Login</h1>

<label> Email </label>
<input onChange={changeEmail} placeholder="User Name"/>

<br/>

<label> Password </label>
<input onChange={changePassword} placeholder="password"/>

<button onClick={valied}> Login </button>

</div>


)



}


export default Login ; 