

import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/actions/shop_favs_rating";
import { getAllPurchases } from "../../redux/actions/shop_favs_rating";
import { Link } from "react-router-dom";
import NavBar from "../../components/navBar/Navbar";
import "./purchase.css"
import { Col, Container, Row, Table } from "react-bootstrap";

const Purchases = () => {
  const dispatch = useDispatch()
    const userId = JSON.parse(localStorage.getItem("id"))
    let purchase = useSelector((state) => state.shop_fav_rating.purchases )
    
    useEffect(() => {
      dispatch(getAllPurchases(userId))
    }, [ userId])


  return (
    <div className="container-shops">
      <NavBar searchbar={false}></NavBar>
      <section className="mt-5">
        <Container className="test-shop py-5 h-100">
          <Row className="justify-content-centers align-items-center h-100">
            <Col>
              <Table responsive>
                {/* Issues */}
                <thead>
                  <tr>
                    <th scope="col" className="h5">
                      Purchase Detail
                    </th>
                    <th scope="col">#Issue number</th>
                    <th scope="col">Format</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
              
                <tbody>
                {
                  purchase.map(product => {
                    
                    return (
                        <tr key={product.id || product.issue_number}>
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
                              <span className="material-symbols-outlined remove-comic">
                              </span>
                            </p>
                          </td>
                        </tr>
                    )
                  })
                }
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Purchases;