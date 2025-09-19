import './notFound.css'
import { Link } from "react-router-dom";

export  function Notfound(){
    return (
        <div className="contenedornotfound">
            <div>
            <img  className="imagen"   src="https://img.freepik.com/premium-vector/website-page-found-wrong-url-address-error-cartoon-worried-robot-character-site-crash_502272-1904.jpg?w=996"/>
            </div>
            <div>
            <Link to='/home'>
            {/* <button className="botonhome"> Home </button> */}
            <button type="button" class="btn btn-warning">Home</button>
            </Link> 
            </div>
         </div>
    )
}
            