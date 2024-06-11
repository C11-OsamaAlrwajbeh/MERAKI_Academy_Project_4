import "./details.css" ; 
const Details =({data})=>{
return (
<div className="details">
<img src={data.imge}/>
<div className="bookInformation">
<h2><span> Title: </span> {data.title}</h2>
<h2><span> Author: </span>{data.author}</h2>
<h3> <span>Description:</span> {data.description}</h3>
<h3> <span>pages: </span>{data.pages}</h3>
<h3> <span>Language:</span>{data.language}</h3>
<h3><span> Genre :</span>{data.genre}</h3>
<h3><span>Comments:</span>{data.comments}</h3>
</div>
</div>


)


}

export default Details