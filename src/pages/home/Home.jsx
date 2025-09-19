import "./Home.css"

import { useSelector } from "react-redux";
import { Col, Container, Row, Spinner } from "react-bootstrap";

import NavBar from "@components/navBar/Navbar";
import Carrousel from "@components/carrousel/Carrousel";
import Sidebars from "@components/sidebar/Sidebar";
import CardsGallery from "@components/cards-gallery/CardsGallery";
import Footer from "@components/footer/Footer";
import WhisperBubble from "@components/WhisperBubble/WhisperBubble";

const Home = () => {
  let { isWaking } = useSelector(state => state.comicsReducer);

  return (
    <div className="home-container">
      <Row className="header">
        <NavBar searchbar={true} />
      </Row>

      <div className="wrapper">
        <div className="bkg-home"></div>
        <main className="main">
          <Row>
            <Carrousel />
            <Sidebars />
          </Row>
          <Row className="mt-5">
            <Col md={9} className="container" >
              {
                isWaking ?
                  <CardsGallery />
                  :
                  <Container className="w-75">
                    <WhisperBubble className="mb-5 container d-flex justify-content-center">
                      <Spinner animation="border" variant="danger" />
                      <h2>Waking up server... </h2>
                      <h3>This might take a moment...</h3>
                    </WhisperBubble>
                  </Container>
              }
            </Col>
          </Row>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Home;

