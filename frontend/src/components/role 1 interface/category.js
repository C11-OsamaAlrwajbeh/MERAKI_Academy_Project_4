import axios from "axios";
import { useState, useEffect, useContext } from "react";
import "./category.css";
import { Context } from "../../App";

const Category = () => {
    const {category} = useContext(Context) ; 
    const [dataCategory, setDataCategory] = useState([]); // 
    const [adminCategory , setAdminCategory ] = useState("") ; // 
    const [id , setId] = useState(0) ; 
    
    useEffect(() => {
        axios.get("http://localhost:5000/book/find")
            .then((result) => {
                setDataCategory(result.data.message);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const dd = (e)=>{ 
        axios.post(`http://localhost:5000/category/add/${id}/${e.target.value}`)
        .then((result) => {
            console.log(result) ; 
        })
        .catch((err) => {
            console.log(err);
        });


    }

    return (
        <div className="category">
            {dataCategory.map((elements, i) => {
                return (
                    <div className="category-books" key={i}>
                        <img src={elements.imge}  />
                        <h1>{elements.title}</h1>
                        <select onClick={()=>{setId(elements._id)}} onChange={dd}>
                            <option value="all">All</option>
                            {
                             category.map((ele , i)=>{
                             return <option key={i} value={ele.name}>{ele.name}</option>}) 
                            } 
                        </select>
                    </div>
                );
            })}
        </div>
    );
};

export default Category;