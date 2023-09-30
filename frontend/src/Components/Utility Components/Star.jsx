import React from 'react'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar} from 'react-icons/ai'


const Star = ({rating}) => {

  let stars = Array.from({length: 5}, (element, index) => {
    let number = index + .5;
    return (
      <span key={index}>
        {
          rating >= index+1 ?
          <FaStar className='icon' />
          :
          rating >= number ?
          <FaStarHalfAlt className='icon' />
          :
          <AiOutlineStar className='icon'/>
        }
      </span>
    )
  });


  return (
    <div className='stars'>
      {
        stars 
      }
     
    <p>({rating} ratings)</p>
    </div>
  )
}

export default Star
