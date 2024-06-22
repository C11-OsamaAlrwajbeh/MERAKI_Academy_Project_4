import { Link, useNavigate } from "react-router-dom";
import "./navbar.css" ; 
import { useContext, useEffect } from "react";
import { Context } from "../../App";
import axios from "axios";
import { googleLogout } from '@react-oauth/google';

const Navbar = ()=>{
    const navigate = useNavigate();
    const{enter , role  , setNameCategory , category , setCategory ,  setToken ,
        setEnter } =useContext(Context) ;    
   
    const handelSelector = (e)=>{
        setNameCategory(e.target.value) ; 
    }

    useEffect(()=>{ 
        axios.get("http://localhost:5000/category/find")
        .then((result)=>{ 
            setCategory(result.data.message) ; 
        }).catch((err)=>{
            console.log(err) ; 
        })
    } , [setCategory])

    const logout = () =>{
        setEnter(false) ; 
        setToken(null) ; 
        localStorage.clear() ;
        navigate("/login")
        googleLogout();

    }

    return(

        

<div className="Navbar">
<h1> Book Store </h1>

{enter?
role ==="admin"?
<div className="option">

<Link className="link" to={"/add"}> Add Book</Link>
<Link className="link" to={"/user"}> Users</Link>
<Link className="link" to={"/home"}> Books </Link>
<Link className="link" to={"/category"}> Category </Link>
<Link className="link" to={"/register"}> update </Link>
</div>
:
<div className="option">
<select onChange={handelSelector}>
    <option value="all">All</option>
    {
       category.map((ele , i)=>{
       return <option key={i} value={ele.name}>{ele.name}</option>}) 
    }
</select>
<Link className="link" to={"/home"}> Home </Link>
<Link className="link" to={"/favierot"}> favierot</Link>
<Link className="link" to={"/cart"}> Cart </Link>
<Link className="link" onClick={logout}> logout </Link>
<Link className="link" to={"/register"}> About Us</Link>
</div>

:
<div className="option">
<Link className="link" to={"/home"}> Home </Link>
<Link className="link" to={"/login"}> Login </Link>
<Link className="link" to={"/register"}> Register</Link>
</div>

 }
</div>



)



}


export default Navbar ; 