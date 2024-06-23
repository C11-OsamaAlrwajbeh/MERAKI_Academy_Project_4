import "./home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Details from "../role 2 interface/Details";
import { Context } from "../../App";

const Home = () => {
   const { enter , role, token,  nameCategory } = useContext(Context);
   const [data, setData] = useState([]);
   const [book, setBook] = useState(null);
   console.log(data) ; 
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
         if(enter){
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
      if(enter){
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
      if (nameCategory === "action" || nameCategory === "historical" || nameCategory === "cartoon") {
         axios.get(`http://localhost:5000/category/find/${nameCategory}`)
            .then((result) => {
               setData(result.data.message.books);
            })
            .catch((err) => {
               console.log(err);
            });
      }
   }, [nameCategory]);

   if (book) {
      return <Details data={book._id} />;
   }

   const BookDeleted =(element)=>{
      axios.delete(`http://localhost:5000/book/delete/${element}`)
      .then((res)=>{
      setData(data.filter((ele)=> ele._id !== element))
   }).catch((err)=>{
      console.log(err) ; 
   })

   }



   return (
      <div className="home">
         {data.map((ele, i) => (
            <div key={i} className="data">
               <img onClick={() => { setBook(ele); }} src={ele.imge} alt={ele.title} />
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
            :  <div className="icons">   
            <svg     onClick={()=>{BookDeleted(ele._id)}}  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="trash" viewBox="0 0 16 16">
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
            </svg>
            </div>
            
             : " "
            }
            </div>
         ))}
      </div>
   );
}

export default Home;
