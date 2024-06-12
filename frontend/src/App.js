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
export const Context = createContext();
const App = () => {
  const [enter , setEnter]=useState(false) ; 
  const [token , setToken] = useState(" "|| localStorage.getItem("token")) ; 
  return (
   <div className="App">
    <Context.Provider value={{token , setToken , enter , setEnter}}>
      <Navbar/>
      <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/details' element={<Details/>}/>
      <Route path='/favierot' element={<Favierot/>}/>
      </Routes>
    </Context.Provider>
      
      
    </div>
  )
}

export default App
