import axios from "axios";
import "./add.css";
import { useState, useEffect } from "react";

const Add = () => {
    const [image, setImage] = useState("");
    const [message, setMessage] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imge, setImge] = useState("");
    const [author, setAuthor] = useState("");
    const [language, setLanguage] = useState("");
    const [genre, setGenre] = useState("");
    const [pages, setPages] = useState("");
    const [price, setPrice] = useState("");

    const title_i = (e) => setTitle(e.target.value);
    const description_i = (e) => setDescription(e.target.value);
    const author_i = (e) => setAuthor(e.target.value);
    const language_i = (e) => setLanguage(e.target.value);
    const genre_i = (e) => setGenre(e.target.value);
    const pages_i = (e) => setPages(e.target.value);
    const price_i = (e) => setPrice(e.target.value);

    const addData = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "project4");
        data.append("cloud_name", "di4g8kexu");

        fetch("https://api.cloudinary.com/v1_1/di4g8kexu/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setImge(data.url);
            })
            .catch(err => console.log(err.message));
    };

    useEffect(() => {
        if (imge) {
            const data_book = { title, description, imge, author, language, genre, pages, price };
            axios.post("http://localhost:5000/book/create", data_book)
                .then(result => {
                    setMessage(result.data.message);
                })
                .catch(err => setMessage(err.response.data.message));
        }
    }, [imge]);

    return (
        <div>
            <div className="add">
                <h1>Add New Book</h1>
                <div className="add_form">
                    <input onChange={title_i} placeholder="title" />
                    <input onChange={description_i} placeholder="description" />
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} placeholder="Image" />
                    <input onChange={author_i} placeholder="author" />
                    <input onChange={language_i} placeholder="language" />
                    <input onChange={genre_i} placeholder="genre" />
                    <input onChange={pages_i} placeholder="pages" />
                    <input onChange={price_i} placeholder="price" />
                    <button onClick={addData}>Add</button>
                </div>

                {message ? <div className="message"> {message} </div> : <div className="message"> {message} </div>}
            </div>
        </div>
    );
};

export default Add;
