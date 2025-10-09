import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllRatings } from "@redux/actions/admin";
import TableReviews from './TableReviews';

const Reviews = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.ratings.ratings);

  useEffect(() => {
    dispatch(getAllRatings())
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