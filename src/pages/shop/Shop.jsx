import React from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/actions/shop_favs_rating";

import NavBar from "../../components/navBar/Navbar";
import "./Shop.css"
import { Link } from "react-router-dom";

const Shop = () => {

  const cart_shopping = useSelector(state => state.shop_fav_rating.cart_shopping)

  const dispatch = useDispatch()

  const removeProduct = (issue) => {
    var confirm = window.confirm(`Remove ${issue.name || 'this issue'} from the Cart?`)
    if (confirm) {
      let carrito = cart_shopping.filter(c => c.id !== issue.id)
      if (carrito.length === 0) {
        localStorage.removeItem("carrito")
      } else {
        localStorage.setItem("carrito", JSON.stringify(carrito))
      }
      dispatch(removeFromCart(issue))
    }
  }

  const removeAll = () => {
    var confirm = window.confirm(`Are you sure you want to empty your shopping cart?`)
    if (confirm) {
      localStorage.removeItem("carrito")
      cart_shopping.map(p => dispatch(removeFromCart(p)))
    }
  }
  const rol = JSON.stringify(localStorage.getItem("ROL"))
  let totalPrice = 0;
  return (
    <>
      <NavBar searchbar={false} />
      <div className="shop-container">
        <ListGroup className="product-list">
          {
            cart_shopping.map(product => {
              totalPrice += product.price
              return (
                <div key={product.id} className="product-container">
                  <img src={product.image} alt={product.name} width='100px' />
                  <div>${Number(product.price).toFixed(2)}</div>
                  <button onClick={() => removeProduct(product)}>REMOVE</button>
                </div>
              )
            })
          }
        </ListGroup>
        {
          totalPrice > 0 ?
            <div className="checkout-box">
              TOTAL: ${Number(totalPrice).toFixed(2)}
              <button onClick={removeAll}>Empty Cart</button>
              <Link to='/user/shop/checkout'>
                <button>BUY</button>
              </Link>
            </div>
            : <div>Your Shopping Cart is empty.</div>
        }
      </div>
    </>
  )
}

export default Shop;