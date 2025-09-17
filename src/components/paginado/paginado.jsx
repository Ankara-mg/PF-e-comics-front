import  { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./paginado.css"

const Paginado = ({ comicPerPage, allComics, paginado, currentPage }) => {
  const pageNumbers = []
  let Paginas = Math.ceil(allComics / comicPerPage)

  const [focus, setFocus] = useState(0);
  let currentPageState = useSelector(state => state.filters.currentPage);

  useEffect(() => {
    setFocus(currentPageState);
  }, [currentPageState])

  for (let i = 1; i <= Paginas; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className="pagination">
        {
          currentPage - 1 > 0 ? (
            <button className="next p-1" onClick={() => paginado(currentPage - 1)}>Prev</button>

          ) : null
        }
        {pageNumbers?.map((number) => (
          <li key={number} >
            <button className={focus === number ? "focus-pagination" : "btn-pagination"} onClick={() => paginado(number)} >
              {number}
            </button>
          </li>
        ))}
        {
          currentPage < Paginas ? (
            <button className="prev p-1" onClick={() => paginado(currentPage + 1)}> Next</button>
          )
            : null
        }
      </ul>
    </nav>
  )
}


export default Paginado