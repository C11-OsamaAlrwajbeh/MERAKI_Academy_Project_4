import { Link } from "react-router-dom";
import "./navbar.css" ; 

const Navbar = ()=>{
return(


<div className="Navbar">
<h1> Store Book </h1>

<div className="option">
<Link className="link" to={"/home"}> Home </Link>
<Link className="link" to={"/login"}> Login </Link>
<Link className="link" to={"/register"}> Register</Link>
</div>


</div>



)



}


export default Navbar ; 