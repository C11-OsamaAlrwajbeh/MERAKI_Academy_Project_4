import React from 'react'
import "./App.css";
import { Router, Routes , Route } from 'react-router-dom';
import Navbar from "./components/shared components/Navbar" ; 
import Login from './components/shared components/Login';
import Register from './components/shared components/Register';
import Home from './components/shared components/Home' ;
import Details from './components/role 2 interface/Details';
const App = () => {
  return (
   <div className="App">
        <Navbar/>
      <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/details' element={<Details/>}/>
      </Routes>
      
      
      
    </div>
  )
}

export default App
