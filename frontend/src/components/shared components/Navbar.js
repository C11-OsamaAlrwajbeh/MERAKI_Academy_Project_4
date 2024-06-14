import { Link } from "react-router-dom";
import "./navbar.css" ; 
import { useContext } from "react";
import { Context } from "../../App";

const Navbar = ()=>{
    const{enter} =useContext(Context) ;  
return(


<div className="Navbar">
<h1> Store Book </h1>

{enter?
<div className="option">
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