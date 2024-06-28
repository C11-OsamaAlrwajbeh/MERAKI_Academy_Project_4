import axios from "axios";
import { useContext, useState, useEffect } from "react";
import "./login.css"
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';
import Alert from '@mui/material/Alert'


const Login = () => {

    const { setToken, setEnter, setRole, setUserId } = useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [created, setCreated] = useState(false)
    const [message, setMessage] = useState(null)

    const verify = { email, password };

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const valied = () => {
        console.log(verify)
        axios.post("http://localhost:5000/user/login", verify)
            .then((result) => {
                setUserId(result.data.userId)
                setRole(result.data.role.role)
                setToken(result.data.token)
                setEnter(true);
                localStorage.setItem("token", result.data.token)
                setCreated(true);
            }).catch((err) => {
                setMessage(err.response.data.message)
                setCreated(false)
            })
    }

    const credentialResponse=(res)=>{
        const s = jwtDecode(res.credential) ;   
        axios.post("http://localhost:5000/user/login", {email:s.email , password:s.name})
            .then((result) => {
                setUserId(result.data.userId)
                setRole(result.data.role.role)
                setToken(result.data.token)
                setEnter(true);
                localStorage.setItem("token", result.data.token)
                setCreated(true);
            }).catch((err) => {
                setMessage(err.response.data.message)
                setCreated(false)
            })

    }

    const errorMassege = (err)=>{
        console.log(err) ; 

    }


    return (

        <div className="login">

            <h1>Login</h1>

            <label> Email </label>
            <input onChange={changeEmail} placeholder="User Name" />


            <label> Password </label>
            <input type="password" onChange={changePassword} placeholder="password" />

            <button onClick={valied}> Login </button>
    

            <GoogleLogin className="googleLoginButton" 
                onSuccess={credentialResponse }
                onError={errorMassege}
                size ="large"
                type="standard"
                width="200px"
                theme="filled_blue"
                
             />


                {created ?  navigate("/home") :<div className="message_register">{message}</div>}
            <br />


        </div>


    )



}


export default Login 