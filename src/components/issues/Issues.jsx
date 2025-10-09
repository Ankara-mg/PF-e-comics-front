import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';

import CardIssue from './CardIssue';
import ShoutingBubble from '@components/ShoutingBubble/ShoutingBubble';

import { sortIssues, getIssues } from '@redux/actions/issues';
import { addToCart } from "@redux/actions/shop";

function Issue({ volume_id }) {
  const dispatch = useDispatch();
  const issuesDefault = useSelector((state) => state.comics.issues);
  const issues = useSelector((state) => state.comics.sortedIssues)
  let loading_state = useSelector((state) => state.global.loading);
  const shopping_cart = useSelector(state => state.shop.shoppingCart);
  useEffect(() => {
    dispatch(getIssues(volume_id))
  }, [dispatch, volume_id])

  /**---------------------- BOTON COMPRAR TODOS ------------------------------------ */

  let buyAll = () => {

    let carrito

    if (!localStorage.getItem('cart') || localStorage.getItem('cart') === 'null') {
      carrito = []
    } else {
      carrito = [...JSON.parse(localStorage.getItem('cart'))]
    }

    issues.forEach(issue => {
      const inCart = shopping_cart.some(c => c.id === issue.id)
      if (!inCart) {
        carrito = [...carrito, issue]
        dispatch(addToCart(issue))
      }
    })

    localStorage.setItem("cart", JSON.stringify(carrito))
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
      {
        loading_state ? (
          <div className='pos-loading-issues'>
            <Spinner animation="border" variant="danger" />
          </div>
        ) : (
          issues.length > 0 ?
            issues.map(issue => (
              <CardIssue key={issue.id} data={issue} />
            ))
            :
            <ShoutingBubble>
              <p>Error loading comic issues.</p>
            </ShoutingBubble>
        )
      }
    </div>
  );
}

export default Issue;