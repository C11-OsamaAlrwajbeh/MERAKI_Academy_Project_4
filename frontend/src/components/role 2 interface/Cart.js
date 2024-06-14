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
 
    return(
    <div className="cart">
   {cart.map((ele , i )=>{
    return <div className="data">
    <img src={ele.imge}/>
    <h1>{ele.title}</h1>
    </div>
    
   })
}

  </div>


     )

    

}



export default Cart