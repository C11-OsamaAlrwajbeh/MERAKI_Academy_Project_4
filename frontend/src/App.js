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
import Update from "./components/role 1 interface/update" 




export const Context = createContext();
const App = () => {
  const [createCategory , setCreateCategory]=useState("") ; 
  const [enter , setEnter]=useState(false) ; 
  const [token , setToken] = useState(" "|| localStorage.getItem("token")) ; 
  const [role , setRole] = useState("") ; 
  const [nameCategory , setNameCategory]=useState("")
  const [userId , setUserId]=useState(0) ; 
  const [search, setSearch] = useState("") ; 
  return (
   <div className="App">
    <Context.Provider value={{token , setToken , enter , setEnter ,
       role , setRole ,  nameCategory , setNameCategory  ,userId , setUserId ,search, setSearch , createCategory , setCreateCategory}}>
      <Navbar/>
      <Routes>
      <Route path='/update' element={<Update/>}/>
      <Route path='/category' element={<Category/>}/>
      <Route path='/user' element={<User/>}/>
      <Route path='/add' element={<Add/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/details' element={<Details/>}/>
      <Route path='/favierot' element={<Favierot/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/details' element={<Details/>}/>
      </Routes>
    </Context.Provider>
    
      
    </div>
  )
}

export default App
