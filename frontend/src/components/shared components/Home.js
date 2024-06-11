import "./home.css" ; 
import axios from "axios" ; 
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Details from "../role 2 interface/Details";

const Home =()=>{
   const navigate = useNavigate() ; 
   const [data , setData] = useState([]) ;  
   const [ book  , setBook ] = useState(null) ; 

useEffect(()=>{
axios.get("http://localhost:5000/book/find").then((result)=>{
 setData(result.data.message) ; 
 
}).catch((err)=>{
console.log(err) ; 

})

} , [])

if(book){
 return <Details data={book}/>
}



return(
   <div className="home">

   {data.map((ele , i)=>{
     return<div onClick ={()=>{setBook(ele)}}className="data"> 
     <img src={ele.imge}/>
     <h1>{ele.title}</h1>
   
     </div>
   })}


   </div>
)


}


export default Home ; 