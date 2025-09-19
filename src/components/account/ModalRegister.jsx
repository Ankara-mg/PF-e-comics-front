import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import "./ModalLogin.css"
import { useEffect } from "react";
import Register from "../login/Register";

import "./Modalregister.css"


function ModalRegister() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
   handleShow()
  },[])
  
  return (
    <>
      <>
      <div className="modalregister"  >
        <Modal backdropClassName="modal-register"  size="lg" show={show} onHide={handleClose} backdrop="static" keyboard="false">
          <Modal.Body>
            <div className="tabs-login-container"  >
              <Register />
            </div>
          </Modal.Body>
          {/* <Modal.Footer>
            <Link to= '/home'>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            </Link>
          </Modal.Footer> */}
        </Modal>

      </div>

      </>
    </>
  );
}

export default ModalRegister;
