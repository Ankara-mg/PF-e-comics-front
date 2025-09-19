import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import "./starRating.css"


const StarRating = (value) => {
  const [rating, /* setRating */] = useState(value.value)
  const [hover, /* setHover */] = useState(null)

  return (
    <div className='star'>
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1
        return (
          <FaStar
            key={i}
            className='star'
            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            size={40}
          // onMouseEnter={() => setHover(ratingValue)}
          // onMouseLeave={() => setHover(null)}
          />
        )
      })}
    </div>
  )
}

export default StarRating