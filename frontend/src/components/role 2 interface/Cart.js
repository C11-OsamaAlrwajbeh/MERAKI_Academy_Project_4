import "./cart.css" ; 
import axios from "axios"; 
import { useContext, useEffect, useState } from "react";
import { Context } from "../../App";
const Cart = ()=>{
    const [cart , setCart] = useState([]); 
    const {token} = useContext(Context) ; 

    const headers = {
        Authorization: `Bearer ${token}`
     }

     useEffect(()=>{
    axios.get("http://localhost:5000/cart/find" ,{headers}).then((result)=>{
     setCart(result.data.message.carts) ; 
    }).catch((err)=>{
     console.log(err) ; 
    })
     } , [])

     const deleted = (ele)=>{
      axios.delete(`http://localhost:5000/cart/delete/${ele._id}` ,{headers})
      .then((result)=>
      {console.log(result)
         setCart(prevCart => prevCart.filter(item => item._id !== ele._id))
   }).catch((err)=>{
     console.log(err)
   })


     }
 
    return(
    <div className="cart">
   {cart.map((ele , i )=>{
    return <div className="data">
    <img src={ele.imge}/>
    <h1>{ele.title}</h1>
    
    <div className="icons">   
    <svg  onClick={()=>deleted(ele)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="trash" viewBox="0 0 16 16">
    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
    </svg>
    </div>
    
    
    </div>
    
   })
}

  </div>


     )

    

}



export default Cart