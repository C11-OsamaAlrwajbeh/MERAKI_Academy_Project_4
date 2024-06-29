import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import * as React from 'react';

const Update = () => {
  const location = useLocation();
  const { book } = location.state || {}; 
  const [title, setTitle] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [author, setAuthor] = useState(''); 
  const [language, setLanguage] = useState('');
  const [message, setMesage] = useState('');
  const [genre, setGenre] = useState('');
  const [pages, setPages] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState(null);
  const [imge, setImge] = useState(null);
  const [image, setImage] = useState(null); 

  useEffect(() => {
    if (book) {
      axios.get(`http://localhost:5000/book/findById/${book}`)
        .then((result) => {
          const bookData = result.data.message;
          setTitle(bookData.title);
          setDescription(bookData.description);
          setAuthor(bookData.author);
          setLanguage(bookData.language);
          setGenre(bookData.genre);
          setImg(bookData.imge);
          setPages(bookData.pages);
          setPrice(bookData.price);
        }).catch((err) => {
          console.log(err);
        });
    }
  }, [book]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]); 
  const handleAuthorChange = (e) => setAuthor(e.target.value);
  const handleLanguageChange = (e) => setLanguage(e.target.value);
  const handleGenreChange = (e) => setGenre(e.target.value);
  const handlePagesChange = (e) => setPages(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);

  const uploadImage = () => {
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "project4");
      formData.append("cloud_name", "di4g8kexu");

      fetch("https://api.cloudinary.com/v1_1/di4g8kexu/image/upload", {
        method: "post",
        body: formData
      })
        .then(resp => resp.json())
        .then(data => {
          setImge(data.url);
          updateBook(data.url);
        })
        .catch(err => console.log(err.message));
    } else {
      updateBook(img);
    }
  };

  const updateBook = (imageUrl) => {
    const data_book = { title, description, imge: imageUrl, author, language, genre, pages, price };
    axios.put(`http://localhost:5000/book/update/${book}`, data_book)
      .then((result) => {
        setMesage(result.data.message);
      }).catch((err) => {
        setMesage(err);
      });
  };

  const handleUpdateClick = () => {
    uploadImage();
  };

  return (
    <div className="add">
      <h1>Update Book</h1>
      {img && <img src={img} alt="Book cover" />}
      <div className="add_form">
        <input value={title} onChange={handleTitleChange} placeholder="Title" />
        <input value={description} onChange={handleDescriptionChange} placeholder="Description" />
        <input type="file" onChange={handleImageChange} placeholder="Image" />
        <input value={author} onChange={handleAuthorChange} placeholder="Author" />
        <input value={language} onChange={handleLanguageChange} placeholder="Language" />
        <input value={genre} onChange={handleGenreChange} placeholder="Genre" />
        <input value={pages} onChange={handlePagesChange} placeholder="Pages" />
        <input value={price} onChange={handlePriceChange} placeholder="Price" />
        <button onClick={handleUpdateClick}>Update</button>
      </div>

      {message ? <div className="message">{message}</div> : <div className="message">{message}</div>}
    </div>
  );
};

export default Update;
