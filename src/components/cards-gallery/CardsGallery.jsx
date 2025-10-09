import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllComics, /* resetComics */ } from "@redux/actions/comics";
import { getShoppingCart } from "@redux/actions/shop";
import { setCurrentPage } from "@redux/reducers/global";
import ComicCard from "../../components/card/Card";
import Paginado from "../paginado/paginado";
import Spinner from 'react-bootstrap/Spinner';
import "./CardsGallery.css"

const CardsGallery = () => {
  const dispatch = useDispatch();
  let currentPage = useSelector(state => state.global.currentPage);
  // eslint-disable-next-line no-unused-vars
  let [comicPerPage, setComicPerPage] = useState(12)
  let comics = useSelector((state) => state.comics.filteredComics);
  // let filters = useSelector((state) => state.filters.filters);
  let loading_state = useSelector((state) => state.global.loading);
  let indexOfLastComic = currentPage * comicPerPage;
  let indexOfFirstComic = indexOfLastComic - comicPerPage;
  let currentComic = comics.slice(indexOfFirstComic, indexOfLastComic);

  /** ------- Para traer el carrito desde el back ----- */
  let userId = localStorage.getItem("id")

  useEffect(() => {
    if (userId) {
      dispatch(getShoppingCart(userId))
    }
  }, [dispatch, userId])

  /**-------- (solo los trae cuando estoy en el Home) -------- */


  useEffect(() => {
    dispatch(getAllComics())
/*     dispatch(resetComics())
    if (!filters) {
    }
  }, [dispatch, filters]) */
  }, [dispatch])


  const paginado = pageNumber => {
    dispatch(setCurrentPage(pageNumber))
  }

  return (
    <>
      <Paginado
        comicPerPage={comicPerPage}
        allComics={comics.length}
        paginado={paginado}
        currentPage={currentPage}
      />
      {
        loading_state ? (
          <div className='pos-loading-gallery'>
            <Spinner animation="border" variant="danger" />
          </div>
        ) : (
          comics.length > 0 ?
            currentComic.map(c => (
              <ComicCard key={c.id} data={c} />
            )) :
            (<div style={{ height: '800px' }} />)
        )
      }
    </>
  )
}

export default CardsGallery;