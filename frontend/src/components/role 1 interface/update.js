import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate} from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const Update =()=>{
  const navigate = useNavigate() ; 
  const [open, setOpen] = React.useState(true);
  const location = useLocation();
  const { book } = location.state || {};


  const [title , setTitle] = useState("") ; 
  const [description , setDescription] = useState("") ;
  const [imge , setImge] = useState(null) ; 
  const [author , setAuthor] = useState("") ; 
  const [language , setLanguage]=useState("")
  const [genre , setGenre]=useState("")
  const [pages , setPages]=useState(0)
  const [price, setPrice]=useState(0)


  const title_i=(e)=>{
      setTitle(e.target.value) ; 
  }
  const description_i=(e)=>{
      setDescription(e.target.value) ; 
  }
  const imge_i=(e)=>{
      setImge(e.target.value);
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
  
  const price_i=(e)=>{
      setPrice(e.target.value) ; 
  }

  
  const data = {title,description,imge,author,language,genre,pages,price}   
  
  
 

 

  const handleClose = () => {
    setOpen(false);
    navigate("/home")
  };



  const addData=()=>{
      axios.put(`http://localhost:5000/book/update/${book}`, data )
      .then((result)=>{
          console.log(result) ; 
      }).catch((err)=>{
          console.log(err)
      })

      
    }      
  return(
      <div className="add">
          <h1>Add New Book </h1> 
          <img/>
      <div className="add_form">
        <input onChange={title_i} placeholder="title" />
        <input onChange={description_i} placeholder="description"/>
        <input type="file" onChange={imge_i} placeholder="Imge" />
        <input onChange={author_i} placeholder="author"/>
        <input onChange={language_i} placeholder="language"/>
        <input onChange={genre_i} placeholder="genre"/>
        <input onChange={pages_i} placeholder="pages"/>
        <input onChange={price_i} placeholder="price"/>
        <button onClick={addData}> Add </button>
      </div>

    { book ? "" :  <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>



    }

      </div>
  )

}
export default Update ; 





















