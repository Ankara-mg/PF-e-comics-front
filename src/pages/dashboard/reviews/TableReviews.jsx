import { useDispatch } from "react-redux";
import { deleteRating } from "@redux/actions/admin";
import { useNavigate } from 'react-router-dom'
import { Card, Col, Row } from 'react-bootstrap';
import "./TableReviews.css"

const TableReviews = ({ data }) => {
  const dispatch = useDispatch();
  const headers_users = ["Email", "Username", "Description", "Rating", "Remove"]
  const { User, description, rating } = data
  const dataUser = [description, rating]
  const navigate = useNavigate();

  const handleDelete = (data) => {
    const params = {
      "id_review": data.id,
    }
    dispatch(deleteRating(params))
    navigate(0);
  };


  return (
    <div>
      <Card className='user-card'>
        <Row className='border-bottom pb-2 user-card-headers'>
          {
            headers_users?.map((header) => (
              <Col key={header} md={2} className="col-item">
                <span >
                  {header}
                </span>
              </Col >
            ))
          }
        </Row>

        <Row className='mt-2'>
          <Col md={2} className="col-item my-1 px-3">
            <span >
              {User.email}
            </span>
          </Col >

          <Col md={2} className="col-item my-1 px-3">
            <span >
              {User.username}
            </span>
          </Col >

          {
            dataUser?.map(data => (
              <Col key={data} md={2} className="col-item my-1 px-3">
                <span >
                  {data}
                </span>
              </Col >
            ))
          }

          <Col md={2} className="col-item my-1 px-3">
            <span className="material-symbols-outlined delete-review" style={{ paddingLeft: '1rem', userSelect: 'none' }} onClick={() => handleDelete(data)}>
              delete_forever
            </span>
          </Col >

        </Row>
      </Card>
    </div>
  );
};

export default TableReviews;