import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllVolumes, reset_comicState } from "../../redux/actions/comics";
import { setShoppingCart } from "../../redux/actions/shop_favs_rating";
import { setPage } from "../../redux/actions/filters";
import ComicCard from "../../components/card/Card";
import Paginado from "../paginado/paginado";
import Loading from "../loading/Loading";
import "./CardsGallery.css"

const CardsGallery = () => {
  const dispatch = useDispatch();
  let currentPage = useSelector(state => state.filters.currentPage);
  // eslint-disable-next-line no-unused-vars
  let [comicPerPage, setComicPerPage] = useState(12)
  let comics = useSelector((state) => state.comicsReducer.comics_filter);
  let filters = useSelector((state) => state.filters.filters);
  let loading_state = useSelector((state) => state.comicsReducer.loading);
  let indexOfLastComic = currentPage * comicPerPage;
  let indexOfFirstComic = indexOfLastComic - comicPerPage;
  let currentComic = comics.slice(indexOfFirstComic, indexOfLastComic);

  /** ------- Para traer el carrito desde el back ----- */
  let userId = localStorage.getItem("id")
  
  useEffect(() => {
    if(userId){
      dispatch(setShoppingCart(userId))
    }
  }, [dispatch, userId])

  /**-------- (solo los trae cuando estoy en el Home) -------- */


  useEffect(() => {
    dispatch(reset_comicState())
    if (!filters) {
      dispatch(getAllVolumes())
    }
  }, [dispatch, filters])


  const paginado = pageNumber => {
    dispatch(setPage(pageNumber))
  }

  return (
    <>
      <Paginado
        comicPerPage={comicPerPage}
        allComics={comics.length}
        paginado={paginado}
        currentPage={currentPage}
      />
      <div className='pos-loading-gallery'>
        <Loading data={comics} state={loading_state} />
      </div>
      {
        comics.length > 0 && !loading_state ?
          currentComic.map(c => (
            <ComicCard key={c.id} data={c} />
          )) :
          (<div style={{ height: '800px' }}>

          </div>)
      }
    </>
  )
}

export default CardsGallery;