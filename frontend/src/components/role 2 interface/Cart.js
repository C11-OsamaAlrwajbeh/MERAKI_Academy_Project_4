import "./cart.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../App";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [price, setPrice] = useState(0);
    const { token } = useContext(Context);

    const headers = {
        Authorization: `Bearer ${token}`
    };

    const calculateTotalPrice = (cart) => {
        return cart.reduce((total, item) => total + item.book.price * item.quantity, 0);
    };

    useEffect(() => {
        axios.get("http://localhost:5000/cart/find", { headers })
            .then((result) => {
                const fetchedCart = result.data.message.carts;
                console.log(fetchedCart )
                setCart(fetchedCart);
                setPrice(calculateTotalPrice(fetchedCart));
            }).catch((err) => {
                console.log(err);
            });
    }, []);

    const deleted = (ele) => {
        axios.delete(`http://localhost:5000/cart/delete/${ele.book._id}`, { headers })
            .then((result) => {
                const deleteCart = cart.filter(item => item.book._id !== ele.book._id);
                setCart(deleteCart);
                setPrice(calculateTotalPrice(deleteCart));
            }).catch((err) => {
                console.log(err);
            });
    };

    const updateQuantity = (ele, type) => {
        const quantity = type === 'increase' ? ele.quantity + 1 : ele.quantity - 1;
        if (quantity < 1) return;

        axios.put(`http://localhost:5000/cart/update/${ele.book._id}`, { quantity }, { headers })
            .then((result) => {
                const updatedCart = cart.map(item => {
                    if (item.book._id === ele.book._id) {
                        return { ...item, quantity: quantity };
                    }
                    return item;
                });
                setCart(updatedCart);
                setPrice(calculateTotalPrice(updatedCart));
            }).catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="cart">
            <div className="priceAndTotal">
                <h1>Price: {price} J.D</h1>
                <button>Payment</button>
            </div>
            {cart.map((ele, i) => (
                <div key={i} className="data_cart">
                    <div className="imge_cart"><img src={ele.book.imge} alt={ele.book.title} /></div>
                    <div className="title_cart">
                        <h1>{ele.book.title}</h1>
                        <h1>{ele.book.price} J.D</h1>
                    </div>
                    <div className="quantity_cart">
                        <button onClick={() => updateQuantity(ele, 'increase')}>+</button>
                        <h1>{ele.quantity}</h1>
                        <button onClick={() => updateQuantity(ele, 'decrease')}>-</button>
                    </div>
                    <div className="icons">
                        <svg onClick={() => deleted(ele)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="trash" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                        </svg>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cart;
