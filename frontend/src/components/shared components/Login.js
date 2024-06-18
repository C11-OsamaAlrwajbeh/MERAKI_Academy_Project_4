import axios from "axios" ; 
import { useContext, useState } from "react";
import "./login.css"
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
const Login =()=>{
    const { setToken , setEnter ,  setName , setRole} = useContext(Context) ; 
    const navigate = useNavigate() ; 
    const [email ,setEmail] = useState(null) ; 
    const [password , setPassword] = useState(null) ; 
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
       // setRole(result.data.role.role)
        setName(result.data.name); 
        setToken(result.data.token) 
        setEnter(true) ; 
        localStorage.setItem("token",result.data.token)
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

{created? navigate("/home"):<div > {message} </div>}
<br/>

</div>


)



}


export default Login ; 