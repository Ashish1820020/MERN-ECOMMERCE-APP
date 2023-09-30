import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import ProductCard from '../../Utility Components/ProductCard'

const GridView = ({filteredProducts}) => {
  return (
    <Wrapper>
      {
        filteredProducts.map((currentElem) => {
          return (
            // <NavLink className="link" key={currentElem._id} to={`/singleproduct/${currentElem._id}`}>
              <ProductCard key={currentElem._id}  {...currentElem}/>
            // </NavLink>
          )
        })
      }
    </Wrapper>
  )
}
const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;


  .card{
    min-width: 200px;
    width: 300px;
    height: 43rem;
    .card-inside{
      display: flex;
      flex-direction: column;
      height: 100%;
    
      .figure-container{
        height: 240px;
        
        .figure{
          padding: 0 10px;
          height: 100%;
          
          img{
              height: 18rem;
          }
        }
      }
    }
  }

    
  @media (max-width: 1560px) {
    .card{
      width: 250px;
    }
  }
  @media (max-width: 1160px) {
    .card{
      width: 300px;
    }
  }
  @media (max-width: 900px) {
    .card{
      width: 255px;
    }
    
  }
  @media (max-width: 770px) {
    .card{
      width: 275px;
    }
  }
  @media (max-width: 600px) {
    .card{
      width: 420px;
    }
  }
`;

export default GridView;
