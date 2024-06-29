import axios from "axios";
import { useState, useEffect, useContext } from "react";
import "./category.css";
import { Context } from "../../App";

const Category = () => {
    const {createCategory , setCreateCategory} = useContext(Context)
    const [dataCategory, setDataCategory] = useState([]); // 
    const [id , setId] = useState(0) ; 
    const [message , setMessage]=useState("") ; 
    const[category , setCategory] = useState([]) ; 
    


    useEffect(()=>{ 
        axios.get("http://localhost:5000/category/find")
        .then((result)=>{ 
            setCategory(result.data.message) ; 
        }).catch((err)=>{
            console.log(err) ; 
        })
    } , [createCategory])
    
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
            console.log(result.data.message) ; 
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const inputCategory=(e)=>{
        setCreateCategory(e.target.value) ; 

    }

    const handelClikcCreate=()=>{
        console.log(createCategory)
        axios.post("http://localhost:5000/category/create",{name:createCategory}) 
        .then((result) => {
            setMessage(result.data.message) ; 
            setCreateCategory([...category, { name: createCategory }]);
        
        })
        .catch((err) => {
            setMessage(err.response.data.message);
        });
    }


    return (
        <div className="category">
            <div className="create_class_category">
             <label>Create New Category</label>
             <input placeholder="Enter Category" onChange={inputCategory}/> 
             <button onClick={handelClikcCreate}>Create</button>
             {message ? <div className="message_Category">{message}</div> : <div className="message_Category">{message}</div>}
            </div>
        <div className="category_form">
          


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
        </div>
    );
};

export default Category;