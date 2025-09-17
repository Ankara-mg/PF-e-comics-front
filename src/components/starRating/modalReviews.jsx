import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./modalReviews.css"
import StarRating from './starRating';
import { getReviews } from '../../redux/actions/reviews'

const ModalReviews = ({ data, theme }) => {
  const dispatch = useDispatch();
  const datitos = {
    volumeId: data.volume_id,
    IssueId: data.id
  }

  useEffect(() => {
    dispatch(getReviews(datitos))
  }, [dispatch])

  let reviews = useSelector(state => state.reviews)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <>
      <Button className="btn-reviews" variant="primary" onClick={handleShow} width={50} >
        See Reviews
      </Button>

      <Modal contentClassName={`modal-issue-${theme}`} size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comic Review </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="contReviews">
            {reviews.reviews.map((e, i) => {
              return (
                <div className='reviewsCont'>
                  <h4>{e.User.username}</h4>
                  <StarRating key={i} value={e.rating} />
                  <p>{e.description}</p>
                  <hr />
                </div>
              )
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default ModalReviews