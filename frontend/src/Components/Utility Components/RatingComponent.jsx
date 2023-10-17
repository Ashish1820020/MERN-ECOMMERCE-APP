import styled from "styled-components";
import { AiFillStar } from 'react-icons/ai'


const RatingComponent = ({rating}) => {
  return (
    <Wrapper>
      <div>
        <article>{rating}</article>
        <AiFillStar className="star-icon" />
      </div>
      <p>(
          {
            Math.ceil((rating * 15) + 1)
          }
          <span>reviews</span>
        )
      </p>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  div{
    display: flex;
    /* align-items: center; */
    justify-content: center;
    font-size: 12px;
    padding: 2px 4px 2px 6px;
    border-radius: 3px;
    font-weight: 500;
    font-size: 12px;
    vertical-align: middle;
    /* height: 1.8rem;
    width: 3.6rem; */
    color: white;
    background-color: rgba(56,142,60,1);
  }
  .star-icon{
      margin: 2px 0 0 2px;
      /* height: 10px;
      width: 10px; */
  }

  p{
    display: flex;
    align-items: center;
    color: #aeacac;
    font-weight: 600;
    font-size: 13px;
  }
  span{
    margin-left: .5rem;
    font-size: 13px;
  }
`;

export default RatingComponent
