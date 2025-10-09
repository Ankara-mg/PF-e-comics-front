import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import ModalInfoIssue from './ModalInfo';

import Card from 'react-bootstrap/Card';
import "./CardIssue.css"

function CardIssue({ data }) {
  const theme_params = useSelector((state) => state.global.theme);
  const { theme } = theme_params
  const [showModal, setShowModal] = useState(false)
  const { id, image } = data

  useEffect(() => {
    setShowModal(() => false)
  }, [showModal])

  const handleModal = () => {
    setShowModal(() => true)
  }

  return (
    <>
      <Card className='ms-5 card-issue' style={{ width: '8rem', height: '1rem' }} onClick={handleModal}>
        <Card.Img src={image} />
      </Card>
      <ModalInfoIssue key={`modal-issue-${id}`} open={showModal} data={data} theme={theme} />
    </>
  );
}

export default CardIssue;