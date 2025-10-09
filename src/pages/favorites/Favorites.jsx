import { useEffect } from 'react'
import { removeFavorite, getFavoriteList} from '@redux/actions/favorites'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from "../../components/navBar/Navbar";
import "./Favorites.css"

export default function Favorites() {
    
    const dispatch = useDispatch()
    const favourite = useSelector((state) => state.favorites.favorites)
    const userId = JSON.parse(localStorage.getItem("id"))

    useEffect(() => {
      dispatch(getFavoriteList(userId))
    }, [dispatch, userId])

    
    const removeHandler = (comic) => {
        dispatch(removeFavorite(comic.id, userId)) 
        dispatch(getFavoriteList(userId))
    }

    return (
        <div className='containergeneral'>
            <NavBar/>
            <div className='titulonombre'>
                <div>
                    <h1 className="titlefav">  YOUR FAVORITE COMICS </h1>
                </div>
                
            </div>

              <div  className="contenedor">
            {   
                favourite.map(e =>{
                    return(
                        <div className="contendorfav" key={e.id}>
                                <div>
                                <img className='img' src= {e.image} alt="comic"/> 
                                <div className='textos'>
                                <h4 className='namevolume'><b> volume: {e.volume_id}</b></h4>
                                <h4 className='nameissue'><b>issues: {e.issue_number}</b></h4>
                                <h4 className='privevalue'><b>price: {(e.price).toFixed(2)}</b></h4> 
                                </div>
                                </div>
                                <div  className='botonesfav'>
                                    <button className='eliminar' onClick={() => removeHandler(e)}>REMOVE</button> 
                                 </div>
                        </div>
                    )
                 })
                    
                
            }
        </div>            
    </div>
)
}


