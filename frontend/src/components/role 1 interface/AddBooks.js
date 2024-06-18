import axios from "axios" ; 
import "./add.css" ; 
import { useState } from "react";
const Add = ()=>{

    const [title , setTitle] = useState("") ; 
    const [description , setDescription] = useState("") ;
    const [imge , setImge] = useState("") ; 
    const [author , setAuthor] = useState("") ; 
    const [language , setLanguage]=useState("")
    const [genre , setGenre]=useState("")
    const [pages , setPages]=useState(0)



    const title_i=(e)=>{
        setTitle(e.target.value) ; 
    }
    const description_i=(e)=>{
        setDescription(e.target.value) ; 
    }
    const imge_i=(e)=>{
        setImge(e.target.value) ; 
    }
    const author_i=(e)=>{
        setAuthor(e.target.value) ; 
    }
    const language_i=(e)=>{
        setLanguage(e.target.value) ; 
    }
    const genre_i=(e)=>{
        setGenre(e.target.value) ; 
    }
    const pages_i=(e)=>{
        setPages(e.target.value) ; 
    }
    
    


    const data = {title,description,imge,author,language,genre,pages}   
   
    const addData=()=>{
        axios.post("http://localhost:5000/book/create" , data )
        .then((result)=>{
            console.log(result) ; 
        }).catch((err)=>{
            console.log(err)
        })

        
      }      
    return(
        <div className="add">
          <input onChange={title_i} placeholder="title" />
          <input onChange={description_i} placeholder="description"/>
          <input onChange={imge_i} placeholder="imge"/>
          <input onChange={author_i} placeholder="author"/>
          <input onChange={language_i} placeholder="language"/>
          <input onChange={genre_i} placeholder="genre"/>
          <input onChange={pages_i} placeholder="pages"/>
          <button onClick={addData}> Add </button>
        </div>
    )



}
export default Add ; 