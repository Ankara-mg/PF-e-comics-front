import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './modalPostReview.css'
import { postRating } from '@redux/actions/ratings'
import Swal from 'sweetalert2'


import { FaStar } from 'react-icons/fa'
import "./starRating.css"

const ModalPostReview = ({ data, theme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [hover, setHover] = useState(null)


  const [show, setShow] = useState(false);

  let localUser = localStorage.getItem("id")

  const [input, setInput] = useState({
    rating: 0,
    description: '',
    ComicId: data.volume_id,
    UserId: localUser ? localUser.slice(1, -1) : "",
    IssueId: data.id,
  })


  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }


  function sendReview() {
    dispatch(postRating(input))
    if (localUser) {
      Swal.fire({
        title: 'Post review',
        text: 'Your review has been posted ok',
        icon: 'success'
      })
    }
    navigate('/user/home')
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Button className="btn-PostReviews" variant="primary" onClick={handleShow}>
        Post Review
      </Button>

      <Modal key={`reviews-${data.id}`} contentClassName={`modal-issue-${theme}`} size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post a your Comic Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='contPost'>
            <div className='star'>
              {[...Array(5)].map((star, i) => {
                let ratingValue = i + 1
                return (
                  <label key={i}>
                    <input
                      type="checkbox"
                      name="rating"
                      value={ratingValue}
                      onClick={(e) => handleChange(e)}
                    />
                    <FaStar
                      className='starPost'
                      color={ratingValue <= (hover || input.rating) ? "#ffc107" : "#e4e5e9"}
                      size={40}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                )
              })}
            </div>
            <textarea name='description' onChange={(e) => handleChange(e)} className="description" cols="50" rows="10" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={sendReview}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalPostReview