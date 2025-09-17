import { useState } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
//import Tabslogin from "./Tabslogin";
import "./ModalLogin.css"
import { useEffect } from "react";
import LoginApp from "../login/login";

function ModalLogin() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    handleShow()
  }, [])

  return (
    <>
      <Modal backdropClassName="modal-login" size="lg" show={show} onHide={handleClose} backdrop="static" keyboard="false">
        <Modal.Body>
          <div className="tabs-login-container" >
            <LoginApp />
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default ModalLogin;

