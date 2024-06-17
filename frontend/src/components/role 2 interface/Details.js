import { useContext, useEffect, useState } from "react";
import "./details.css";
import axios from "axios";
import { Context } from "../../App";

const Details = ({ data }) => {
    console.log(data);
    const { token, name, enter } = useContext(Context);
    const [comment, setComment] = useState("");
    const [book, setBook] = useState("");
    const [comments, setComments] = useState([]);
    console.log(comments);

    useEffect(() => {
        axios.get(`http://localhost:5000/book/findById/${data}`)
            .then((result) => {
                setBook(result.data.message);
                setComments(result.data.message.comments);
            }).catch((err) => {
                console.log(err);
            });
    }, []);

    const headers = {
        Authorization: `Bearer ${token}`
    }

    const handelWriteComment = (e) => {
        setComment(e.target.value);
    }

    const handelClickedAddComment = () => {
        axios.post(`http://localhost:5000/comment/create/${data}`, { comment }, { headers })
        .then((result) => {
            axios.get(`http://localhost:5000/book/findById/${data}`)
                .then((result) => {
                    setBook(result.data.message);
                    setComments(result.data.message.comments);
                    setComment("");
                }).catch((err) => {
                    console.log(err);
                });
        }).catch((err) => {
            console.log(err);
        });
    }

    const deleted = (ele) => {
        console.log(ele._id)
        axios.delete(`http://localhost:5000/comment/delete/${data}/${ele._id}`, { headers })
                    .then((result) => {
                        setComments(comments.filter(comment => comment._id !== ele._id))
                    }).catch((err) => {
                        console.log(err);
                    });
         
    }

    return (
        <div className="page">
            <div className="details">   
                <img src={book.imge} alt="Book cover"/>
                <div className="bookInformation">
                    <h2> <span> Title: </span> {book.title}</h2>
                    <h2> <span> Author: </span>{book.author}</h2>
                    <h3> <span>Description:</span> {book.description}</h3>
                    <h3> <span>Pages: </span>{book.pages}</h3>
                    <h3> <span>Language:</span>{book.language}</h3>
                    <h3><span> Genre :</span>{book.genre}</h3>
                </div>
            </div>
            <div className="box_comments">
                <h2>Comments:</h2>
                {enter ?
                    <label> <input onChange={handelWriteComment} value={comment} placeholder="Add Comment" /> <button onClick={handelClickedAddComment}> Add </button> </label>
                    : ""}
                {comments.map((ele, i) => {
                    return <div key={i} className="comments">
                        <div className="iconsAndName">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                            </svg>
                            <span>{ele.commenter.name}</span>
                        </div>
                        <p>{ele.comment}</p>
                        <div className="icons">
                            <svg onClick={() => { deleted(ele) }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="trash" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                            </svg>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
}

export default Details;
