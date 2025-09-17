import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import "./Loading.css"

const Loading = ({ data, state, timeWait = 2500 }) => {
  let [error, setError] = useState(false);

  useEffect(() => {
    if (data.length > 0) {
      setError(false)
    } else {
      setTimeout(() => {
        setError(true)
      }, timeWait);
    }
  }, [data, error, timeWait])


  if (error) return (<p className='notFound'>Comics not found</p >)
  return (
    <>
      {
        state && <Spinner className='spinner' animation="border" variant="danger" />
      }
    </>
  );
};

export default Loading;