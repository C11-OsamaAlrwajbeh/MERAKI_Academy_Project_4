import "./user.css"; 
import axios from "axios"
import { useEffect, useState } from "react"
const User=()=>{
 
 const[user , setUser]=useState([]) ; 

 useEffect(()=>{
    axios.get("http://localhost:5000/user/find")
    .then((result)=>{   
        setUser(result.data.message);
    }).catch((err)=>{
        console.log(err) ; 
    })
 } , [])   

 const deleted = (ele)=>{
   axios.delete(`http://localhost:5000/user/delete/${ele._id}`)
   .then((result)=>{   
      setUser(user.filter(element=> ele._id !== element._id)) 
  }).catch((err)=>{
      console.log(err) ; 
 })
}

 return(
    <div className="user"> 
    <div className="name_user">
       <h3>Name</h3>
       <h3>Last Name</h3>
       <h3>Age</h3>
       <h3>Role</h3>
      
    </div>
     {
        user.map((ele , i )=>{
            return<div key={i} className="data_user">
            <p> {ele.name} </p>
            <p> {ele.lastName} </p>
            <p> {ele.age} </p>
            <p> {ele.role.role} </p>
            <button onClick={()=>deleted(ele)} >delete</button>

            </div>
        })
     }   
    </div>
 )


}


export default User ; 