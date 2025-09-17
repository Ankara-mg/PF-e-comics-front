import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getIssues } from "../../redux/actions/comics";
import { sortIssues } from '../../redux/actions/filters';
import { addToCart } from "../../redux/actions/shop_favs_rating";
import Loading from "../loading/Loading";
import CardIssue from './CardIssue';


function Issue({ volume_id }) {
  const dispatch = useDispatch();
  const issuesDefault = useSelector((state) => state.comicsReducer.issues);
  const issues = useSelector((state) => state.comicsReducer.issues_sorting)
  let loading_state = useSelector((state) => state.comicsReducer.loading_issues);
  const shopping_cart = useSelector(state => state.shop_fav_rating.cart_shopping);
  useEffect(() => {
    dispatch(getIssues(volume_id))
  }, [dispatch, volume_id])

  /**---------------------- BOTON COMPRAR TODOS ------------------------------------ */

  let buyAll = () => {

    let carrito

    if (!localStorage.getItem('carrito') || localStorage.getItem('carrito') === 'null') {
      carrito = []
    } else {
      carrito = [...JSON.parse(localStorage.getItem('carrito'))]
    }

    issues.forEach(issue => {
      const inCart = shopping_cart.some(c => c.id === issue.id)
      if (!inCart) {
        carrito = [...carrito, issue]
        dispatch(addToCart(issue))
      }
    })

    localStorage.setItem("carrito", JSON.stringify(carrito))
  }

  /**-------------------------------------------------------------------------- */


  /* ORDENAMIENTO POR RATING */
  const [ordenarPor, setOrdenarPor] = useState('default')

  const handleSelectSort = (orden) => {
    setOrdenarPor(orden.target.value)
  }

  useEffect(() => {
    dispatch(sortIssues(ordenarPor, issuesDefault))
  },[ordenarPor])

  const rol = JSON.parse(localStorage.getItem("ROL"))
  return (
    <div className='container'>
      <div className='row justify-content-center px-5 mb-5'>
        {
          rol === "USER" ?
            <button onClick={buyAll} className='btn btn-light btn-lg'>
              BUY ALL COMICS!
            </button>
            :
            null
        }
      </div> <br /> <br />
      <div className='row justify-content-center px-5 mb-5'>
          <h2 className='text-center'>
            Sort Issues By...
          </h2>
        <select id="sort" className='form-select' onChange={(sel) => handleSelectSort(sel)}>
          <option value='default' selected>Default</option>
          <option value='issueNum'>Issue Number</option>
          <option value='ratingAsc'>Rating Ascending</option>
          <option value='ratingDesc'>Rating Descending</option>
          <option value='priceAsc'>Price Ascending</option>
          <option value='priceDesc'>Price Descending</option>
        </select>
      </div>
      <div className='pos-loading-issues'>
        <Loading data={issues} state={loading_state} timeWait={5000} />
      </div>
      {
        issues.length > 0 && !loading_state &&
        issues.map(issue => (
          <CardIssue key={issue.id} data={issue} />
        ))
      }
    </div>
  );
}

export default Issue;