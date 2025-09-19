import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function DismissibleExample() {
  const [showA, setShowA] = useState(true);
  // const [showB, setShowB] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  // const toggleShowB = () => setShowB(!showB);

  return (
    <Row onClick={toggleShowA}>
      asfd
      <Col md={6} className="mb-2">

        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}

export default DismissibleExample;