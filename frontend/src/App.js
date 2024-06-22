import React, { useState } from 'react'
import "./App.css";
import { createContext  } from 'react';
import { Router, Routes , Route } from 'react-router-dom';
import Navbar from "./components/shared components/Navbar" ; 
import Login from './components/shared components/Login';
import Register from './components/shared components/Register';
import Home from './components/shared components/Home' ;
import Details from './components/role 2 interface/Details';
import Favierot from './components/role 2 interface/Favierot';
import Cart from './components/role 2 interface/Cart';
import Add from './components/role 1 interface/AddBooks' ; 
import User from './components/role 1 interface/Users';
import Category from "./components/role 1 interface/Category" ; 

export const Context = createContext();
const App = () => {
  
  const [enter , setEnter]=useState(false) ; 
  const [token , setToken] = useState(" "|| localStorage.getItem("token")) ; 
  const[category , setCategory] = useState([]) ; 
  const [role , setRole] = useState("") ; 
  const [nameCategory , setNameCategory]=useState("")
  const [userId , setUserId]=useState(0) ; 
  return (
   <div className="App">
    <Context.Provider value={{token , setToken , enter , setEnter ,
       role , setRole ,  nameCategory , setNameCategory , category , setCategory , userId , setUserId}}>
      <Navbar/>
      <Routes>
      <Route path='/category' element={<Category/>}/>
      <Route path='/user' element={<User/>}/>
      <Route path='/add' element={<Add/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/details' element={<Details/>}/>
      <Route path='/favierot' element={<Favierot/>}/>
      <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </Context.Provider>
      
      
    </div>
  )
}

export default App
