import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../App";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;})


const Navbar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const [showLogout  ,setShowLogout]=useState(false) ; 
    const { enter, role, setNameCategory, setToken, setEnter, setSearch } = useContext(Context);
    const [navbarCategory, setNavbarCategory] = useState([])
    const handelSelector = (e) => {
        setNameCategory(e.target.value);
    }


    useEffect(() => {
        axios.get("http://localhost:5000/category/find")
            .then((result) => {
                setNavbarCategory(result.data.message);
            }).catch((err) => {
                console.log(err);
            })
    }, [])
    
    const logout = () => {
        setEnter(false);
        setToken(null);
        localStorage.clear();
        navigate("/home")
        setOpen(false)


    }
    const handleClose = () => {
        setOpen(false);
        setShowLogout(false)
      };
    const serachNavbar =(e)=>{
        setSearch(e.target.value) ; 
    }

        console.log(showLogout) ; 
    return (



        <div className="Navbar">
            <div className="searchAndPageTitle" >
                <h1> Book Store </h1>
                <input type="search" placeholder="search" onChange={serachNavbar}/>
                <select onChange={handelSelector}>
                    <option value="all">All</option>
                    {
                        navbarCategory.map((ele, i) => {
                            return <option key={i} value={ele.name}>{ele.name}</option>
                        })
                    }
                </select>
            </div>
            {enter ?
                role === "admin" ?
                    <div className="option">

                        <Link className="link" to={"/add"}> Add Book</Link>
                        <Link className="link" to={"/user"}> Users</Link>
                        <Link className="link" to={"/home"}> Books </Link>
                        <Link className="link" to={"/category"}> Category </Link>
                        <Link className="link" to={"/update"}> update </Link>
                        <Link className="link" onClick={()=>{setShowLogout(true);setOpen(true);}}>logout </Link>
                    </div>
                    :
                    <div className="option">

                        <Link className="link" to={"/home"}> Home </Link>
                        <Link className="link" to={"/favierot"}> favorite</Link>
                        <Link className="link" to={"/cart"}> Cart </Link>
                        <Link className="link" onClick={()=>{setShowLogout(true);setOpen(true);}}> logout </Link>
                        <Link className="link" to={"/register"}> About Us</Link>
                    </div>

                :
                <div className="option">
                    <Link className="link" to={"/home"}> Home </Link>
                    <Link className="link" to={"/login"}> Login </Link>
                    <Link className="link" to={"/register"}> Register</Link>
                </div>

            }

            { showLogout ?
             <React.Fragment>
             <Dialog
               open={open}
               TransitionComponent={Transition}
               onClose={handleClose}
               aria-describedby="alert-dialog-slide-description"
             >
               <DialogTitle>{"You Want exit from page"}</DialogTitle>
               <DialogContent>
               <DialogContentText id="alert-dialog-slide-description">
                  
                 </DialogContentText>
               </DialogContent>
               <DialogActions>
                 <Button onClick={handleClose}>Disagree</Button>
                 <Button onClick={logout}>Agree</Button>
               </DialogActions>
             </Dialog>
           </React.Fragment> : ""
            }


        </div>

            


    )



}


export default Navbar; 