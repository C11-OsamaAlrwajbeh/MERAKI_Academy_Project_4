import { Link, useNavigate } from "react-router-dom";
import "./navbar.css" ; 
import { useContext, useEffect } from "react";
import { Context } from "../../App";
import axios from "axios";

const Navbar = ()=>{
    const navigate = useNavigate();
    const{enter , role  , setNameCategory , category ,   setToken ,
        setEnter } =useContext(Context) ;    
   
    const handelSelector = (e)=>{
        setNameCategory(e.target.value) ; 
    }



    const logout = () =>{
        setEnter(false) ; 
        setToken(null) ; 
        localStorage.clear() ;
        if(enter === false)
        return navigate("/home") 
     

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
<Link className="link" onClick={logout}> logout </Link>
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
<Link className="link" to={"/favierot"}> favorite</Link>
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