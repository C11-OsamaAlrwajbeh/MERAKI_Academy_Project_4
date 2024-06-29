import "./home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../App";
import Slideshow from "./slider";
import About from "../role 1 interface/About" ; 


const Home = () => {
   const navigate = useNavigate() ; 
   const { enter , role, token,  nameCategory , search } = useContext(Context);
   const [data, setData] = useState([]);
   const [book, setBook] = useState(null);
   const headers = {
      Authorization: `Bearer ${token}`
   };
   
   useEffect(() => {
      if (nameCategory ==="" || nameCategory ==="all") {
      axios.get("http://localhost:5000/book/find")
         .then((result) => {
            setData(result.data.message);
         })
         .catch((err) => {
            console.log(err);
         });
      }
   }, [nameCategory]);

   useEffect(() => {
      if(enter && role ==="user"){
         axios.post("http://localhost:5000/favorite/create", "", { headers })
            .then((res) => {
               console.log(res);
            })
            .catch((err) => {
               console.log(err);
            });
         }
   }, [headers]);

   useEffect(() => {
      if(enter && role ==="user"){
      axios.post("http://localhost:5000/cart/create", "", { headers })
         .then((res) => {
            console.log(res);
         })
         .catch((err) => {
            console.log(err);
         });
      }
   }, [headers]);

   useEffect(() => {
      if (nameCategory.toLowerCase() === "ooo" || nameCategory.toLowerCase() === "historical" || nameCategory.toLowerCase() === "religious") {
         axios.get(`http://localhost:5000/category/find/${nameCategory}`)
            .then((result) => {
               setData(result.data.message.books);
            })
            .catch((err) => {
               console.log(err);
            });
      }
   }, [nameCategory]);


   const BookDeleted =(element)=>{
      axios.delete(`http://localhost:5000/book/delete/${element}`)
      .then((res)=>{
      setData(data.filter((ele)=> ele._id !== element))
   }).catch((err)=>{
      console.log(err) ; 
   })

   }


   const handleUpdate=(ele)=>{
      navigate("/update" , { state: { book: ele }} )
   }



   return (
      <div>
      <div className="container">
         <Slideshow/>
      <div className="home">
         {data.filter((item)=>search.toLowerCase()=== "" ? item : item.title.toLowerCase().includes(search))
         .map((ele, i) => (
            <div key={i} className="data_home">
               <img onClick={() => { navigate("/details" , {state:ele._id}) }} src={ele.imge} alt={ele.title} />
               <h1>{ele.title}</h1>
               <p className="price">{ele.price} J.d</p>

               {enter ?
               role === "user" ?
                      <div className="icons">
                     <svg onClick={() => {
                        axios.post(`http://localhost:5000/favorite/add/${ele._id}`, "", { headers })
                           .then((result) => {
                              console.log(result);
                           })
                           .catch((err) => {
                              console.log(err);
                           });
                     }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                     </svg>
                     
                     <svg onClick={() => {
                        axios.post(`http://localhost:5000/cart/add/${ele._id}`, "", { headers })
                           .then((result) => {
                              console.log(result);
                           })
                           .catch((err) => {
                              console.log(err);
                           });
                     }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="carts" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                     </svg>
                  </div>
               /*---------------------------------------------------------------------------------------------------------------------------*/
            :<div className="icons">   
            <svg onClick={()=>{BookDeleted(ele._id)}}  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="trash" viewBox="0 0 16 16">
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
            </svg>

            <svg  onClick={()=> handleUpdate(ele._id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="gear" viewBox="0 0 16 16">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
            </svg>


            </div>
            
             : " "
            }
            </div>
         ))}
      </div>
            
      </div>
      <About/>
      </div>
   );
}

export default Home;
