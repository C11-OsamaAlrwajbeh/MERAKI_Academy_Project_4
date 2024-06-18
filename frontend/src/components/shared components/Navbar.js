import { Link } from "react-router-dom";
import "./navbar.css" ; 
import { useContext, useState } from "react";
import { Context } from "../../App";

const Navbar = ()=>{
    const{enter , role} =useContext(Context) ;  
    const[c , setC] = useState("") ;  
    const s = (e)=>{
        console.log(e.target.value) ; 
            
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
<Link className="link" to={"/login"}> delete Book </Link>
<Link className="link" to={"/register"}> update </Link>
</div>
:
<div className="option">
<select onChange={s}>
    <option value="0">Select car:</option>
    <option value="Action">Audi</option>
    <option value="Arbic">BMW</option>
    <option value="English">Citroen</option>
</select>
<Link className="link" to={"/home"}> Home </Link>
<Link className="link" to={"/favierot"}> favierot</Link>
<Link className="link" to={"/cart"}> Cart </Link>
<Link className="link" to={"/login"}> logout </Link>
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