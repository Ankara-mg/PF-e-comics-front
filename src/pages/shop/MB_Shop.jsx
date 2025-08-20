import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/actions/shop_favs_rating";
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { Link } from "react-router-dom";
import NavBar from "../../components/navBar/Navbar";
import "./MB_Shop.css"
import Swal from "sweetalert2";
import cartIcon from '../../assets/cart2.png'

const ShoppingCart2 = () => {
  const cart_shopping = useSelector(state => state.shop_fav_rating.cart_shopping)
  //JSON.parse(localStorage.getItem('carrito'))
  const dispatch = useDispatch()
  let totalPrice = 0;
  const [compras, setCompras] = useState(false)

  const removeProduct = (issue) => {
    // var confirm = window.confirm(`Remove ${issue.name || 'this issue'} from the Cart?`)
    Swal.fire({
      title: (`Remove ${issue.name || 'this issue'} from the Cart?`),
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'The comic has been removed from your shopping list',
          'success'
        )
        let carrito = cart_shopping.filter(c => c.id !== issue.id)
        if (carrito.length === 0) {
          localStorage.removeItem("carrito")
        } else {
          localStorage.setItem("carrito", JSON.stringify(carrito))
        }
        dispatch(removeFromCart(issue))
      }
    })
    // if (confirm) {
    // }
  }


  const removeAll = () => {
    // var confirm = window.confirm(`Are you sure you want to empty your shopping cart?`)
    Swal.fire({
      title: 'Are you sure?',
      text: (`Are you sure you want to empty your shopping cart?`),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, empty!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your shopping cart is empty.',
          'success'
        )
        localStorage.removeItem("carrito")
        cart_shopping.map(p => dispatch(removeFromCart(p)))
      }
    })
    // if (confirm) {
    // }
  }

  return (
    <div className="container-shop">
      <NavBar searchbar={false}></NavBar>
      <section className="mt-5">
        <Container className="test-shop py-5 h-100">
          <Row className="justify-content-center align-items-center h-100">
            <Col>
              <Table responsive>
                {/* Issues */}
                <th>
                  <tr>
                    <th scope="col" className="h5">
                      Shopping Bag
                    </th>
                    <th scope="col">#Issue number</th>
                    <th scope="col">Format</th>
                    <th scope="col">Price</th>
                    <th scope="col">Remove</th>
                  </tr>
                </th>
                {
                  cart_shopping.length > 0 ? 
                   <Button className="btn-reviews"  variant="primary"    onClick={removeAll} width={50} >
                    Empty cart
                   </Button>
                   :
                   <div></div>
                }
                {
                  cart_shopping.map(product => {
                    totalPrice += product.price
                    return (
                      < tbody >
                        <tr>
                          <th scope="row">
                            <div className="d-flex align-items-center">
                              <img
                                src={product.image}
                                className="rounded-3"
                                style={{ width: "120px" }}
                                alt="Book"
                              />
                              <div className="flex-column ms-4" style={{ width: "140px" }}>
                                <p className="mb-2">{product.name}</p>
                              </div>
                            </div>
                          </th>
                          <td className="align-middle">
                            <p className="mb-0" style={{ fontWeight: "500", paddingLeft: '30%' }}>
                              {product.issue_number}
                            </p>
                          </td>
                          <td className="align-middle">
                            <p className="mb-0" style={{ fontWeight: "500" }}>
                              Digital
                            </p>
                          </td>
                          <td className="align-middle">
                            <p className="mb-0" style={{ fontWeight: "500" }}>
                              ${Number(product.price).toFixed(2)}
                            </p>
                          </td>
                          <td className="align-middle">
                            <p className="mb-0" style={{ fontWeight: "500" }}>
                              <span className="material-symbols-outlined remove-comic " >
                                <button className="btn btn-danger "  onClick={() => removeProduct(product)}>
                                  X
                                </button>
                              </span>
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    )
                  })
                }
              </Table>
            </Col>
          </Row>
                {
                  totalPrice > 0 ?
                      
                    <Link to='/user/shop/checkout' >
                      <Row className="payment-btn">
                        <Button size="lg">
                          <div className="px-2">
                            <span className="px-2">Checkout</span>
                            <span>${Number(totalPrice).toFixed(2)}</span>
                          </div>
                        </Button>
                      </Row>
                    </Link>

                    : 

				            <div class="row">
            					<div class="card-body cart">
                        <div class="col-sm-12 empty-cart-cls text-center">
                          <img src={cartIcon} width="130" height="130" class="img-fluid mb-4 mr-3" />
                          <h3><strong>Your Cart is Empty</strong></h3>
                          <Link to='/user/home'>
                            <button class="btn btn-primary cart-btn-transform m-3" data-abc="true">Continue Shopping</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                }
        </Container>
      </section>
    </div>
  );
}

export default ShoppingCart2;