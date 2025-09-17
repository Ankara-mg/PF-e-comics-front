import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite, addFavorite, addToCart, removeFromCart } from "../../redux/actions/shop_favs_rating";


import { Col, Row } from 'react-bootstrap'

import "./ShoppingBar.css"

const ShoppingBar = ({ price, comic }) => {
  const favourite = useSelector((state) => state.shop_fav_rating.favourite)
  const dispatch = useDispatch();
  //const cart_shopping = useSelector((state) => state.cart_shopping);
  const idUsuer = JSON.parse(localStorage.getItem("id"))
  /* ----------- Revisar si el comic ya está comprado ------- */

  const cart_shopping = useSelector((state) => state.shop_fav_rating.cart_shopping);
  const [countProducts, setCountProducts] = useState(cart_shopping.length);
  const [comprado, setComprado] = useState(
    cart_shopping.some(c => c.id === comic.id)
  )

  /* ----------- Botones agregar y quitar ------- */

  const addProducts = () => {
    setCountProducts(() => countProducts + 1);

    let carrito

    if (!localStorage.getItem('carrito') || localStorage.getItem('carrito') === 'null') {
      carrito = []
      carrito.push(comic)
      dispatch(addToCart(comic))
      setComprado(true)
    } else {
      carrito = [...JSON.parse(localStorage.getItem('carrito'))]
      const inCart = carrito.some(c => c.id === comic.id)
      if (!inCart) {
        carrito = [...carrito, comic]
        dispatch(addToCart(comic))
        setComprado(true)
      }
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  const removeProducts = () => {
    setCountProducts(() => countProducts - 1)
    dispatch(removeFromCart(comic))

    let carrito = [...JSON.parse(localStorage.getItem('carrito'))]
    carrito = carrito.filter(c => c.id !== comic.id)
    localStorage.setItem("carrito", JSON.stringify(carrito));
    setComprado(false)
  }

  /* ---------------------------------------------------------- */

  const addFavhandler = async () => {
    // e.preventDefault()
    dispatch(addFavorite(comic.id, idUsuer))
  }

  const remuveFavhandler = (e) => {
    e.preventDefault()
    dispatch(removeFavorite(comic.id,idUsuer))
  }

  const rol = JSON.parse(localStorage.getItem("ROL"))
  return (
    <div className="shopping-container">
      <Row>
        {favourite ?
          <Col md={1} >
            {
              rol === "USER" ?
                <button className="fav-icon" style={favourite ? { backgroundColor: "red", color: "white", border: "white" } : { backgroundColor: "transparent" }} onClick={addFavhandler}>
                  <span className="material-symbols-outlined">
                    heart_plus
                  </span>
                </button> :
                null
            }
          </Col>
          :
          <button className="fav-icon" onClick={remuveFavhandler}>
            remuve_Fav
          </button>
        }

        {
          !comprado ?
            <Col md={1}  >
              {rol === "USER" ?
                <button className="shopping-icon" onClick={addProducts}>
                  <span className="material-symbols-outlined">
                    add_shopping_cart
                  </span>
                </button> :
                null
              }
            </Col>
            :
            <button className="remove-shopping-icon" onClick={removeProducts}>
              <span className="material-symbols-outlined danger">
                remove_shopping_cart
              </span>
            </button>
        }

        <Col >
          <span className="shopping-price">
            ${Number(price).toFixed(2)}
          </span>
        </Col>
      </Row>
    </div>
  )
}

export default ShoppingBar;
