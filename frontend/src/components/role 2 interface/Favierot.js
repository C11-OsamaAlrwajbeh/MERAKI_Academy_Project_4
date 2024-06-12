import { useContext , useEffect, useState } from "react";
import axios from "axios"; 
import { Context } from "../../App";
import "./favierot.css"
const Favierot = () => {
  const [favierots , setFavierots] = useState([]) ; 
  const { token } = useContext(Context);
const callFavorite= ()=>{
    const headers = {
        Authorization: `Bearer ${token}`};
        axios.get("http://localhost:5000/favorite/find",{headers})
        .then((res)=>{
           setFavierots(res.data.message.favortie)  
         }).catch((err)=>{
            console.log(err) 
         })
}
useEffect(() => {
  callFavorite()
}, [])

  return (
 <div className="favierot">
   {favierots.map((ele , i )=>{
    return <div key={i} className="data">
    <img src={ele.imge}/>
    <h1>{ele.title}</h1>
    </div>
    
   })
}

  </div>
    )
}
  
export default Favierot;