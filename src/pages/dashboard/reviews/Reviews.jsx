import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllReviews } from "../../../redux/actions/admin";
import TableReviews from './TableReviews';

const Reviews = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.admin.reviews);

  useEffect(() => {
    dispatch(getAllReviews())
  }, [dispatch])

  return (
    <div className='mainAdm'>
      <h2>Reviews</h2>
      {
        reviews?.map(user => (
          <TableReviews key={user.id} data={user} />
        ))
      }
    </div>
  );
};

export default Reviews;