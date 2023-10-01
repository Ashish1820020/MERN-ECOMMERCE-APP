import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import FormatPrice from '../../helper/FormatPrice'
import { addToCart } from '../../../Store/Slices/CartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../../../styles/Button';
import { isPresent } from '../../../utils/checks'
import { removeFromWishlist } from '../../../Store/Slices/WishlistSlice'

const ListView = ({filteredProducts}) => {

  
  const { wishlistProducts } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch ();

  const handleAddToCart = (singleProduct, colors) => {

    dispatch(addToCart({...singleProduct, amount: 1, color: colors[0]}));

    const present = isPresent(wishlistProducts, singleProduct._id, colors[0]);
    if(present) dispatch(removeFromWishlist({_id: singleProduct._id, color: colors[0]}))
  }



  return (
    <Wrapper className="card-container flex">
      {
        filteredProducts.map((currentElement) => {
          const {_id, name, images, price, discountedPrice, bulletHighlights, discount, stock, colors, rating} = currentElement;

          const singleProduct = { _id, name, image:images[0], price, stock, discount, rating };

          return (
            <div className="list-card" key={_id}>
              <div className='list-card-inside'>


                <NavLink className="link" to={`/singleproduct/${_id}`}>
                  <div className="card-image">
                    <div className="left-inside">
                      <figure className='figure'> <img src={images[0]} alt={name} /></figure>
                    </div>
                  </div>
                </NavLink>
        
                <div className="card-data">
                    
                  <NavLink className="link-s" to={`/singleproduct/${_id}`}>
                    <div className="card-data-left flex-column">
                      <div>
                        <h2>{name}</h2>
                        <div className='description'>
                          <ul>
                            {bulletHighlights.map((currentBullet, index) => {
                              return(
                                <li key={index}><p>{currentBullet}</p></li>
                              )
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                    </NavLink>


                    <div className="card-data-right">
                      <p>Availability: <span>{stock} In Stock</span></p>
                      <ul>
                        <li><FormatPrice price={discountedPrice}/></li>
                        <li><del><FormatPrice price={price} /></del></li>
                      </ul>
                      <NavLink className='cart-link' to={'/cart'}>
                        <Button className='btn' 
                          onClick={() => handleAddToCart(singleProduct, colors)}
                          >ADD TO CART
                        </Button>
                        </NavLink>
                    </div>
                  </div>


              </div>
            </div>
                     
          )
        })
      }
    </Wrapper>
  )
}

const Wrapper = styled.section`
  align-items: center;
  flex-direction: column;
  gap: 0.8rem;
  
  
  /* PRODUCTS LIST VIEW CARD */
  .list-card{
    width: 100%;
    margin: auto;
    min-height: 240px;
    background-color: #ffffff;
    box-shadow: 0px 0px 2px 0px black;
    border-radius: 1.3rem;
  }

  .list-card-inside{
    display: flex;
    padding: 1rem;
  }

  .link{
    width: 25%;
  }

  /* LEFT PORTION */
  .card-image {
    .left-inside{
      height: 100%;
      .figure{
        height: 100%;
          &::after {
          border-radius: 10px 0 0 10px;
        }
      }
    }
  }

  .card-data{
    display: flex;
    width: 75%;
    margin: 0 1rem;
    .link-s{
      width: 66%;
    }
  }

  .card-data-left > div:first-child {
    h3{
      color: ${({ theme }) => theme.colors.text};
      text-transform: capitalize;
      font-weight: bolder;
    }
    .description{
      margin-top: 1rem;
      line-height: 2.2rem;
      width: 100%;
    }
    li{list-style: circle;}
    ul {padding-left:1.6rem}
    li {padding-left:1em}
  }
  .card-data-left > div:last-child{
    .btn {
      margin: .5rem 0;
      font-size: 1rem;
      background-color: rgba(224, 224, 224, .9);;
      border: 0.1rem solid rgb(98 84 243);
      border-radius: 5px;
      padding: 0.5rem 1rem;
      
      &:hover {
      background-color: rgba(224, 224, 224, .7);
      }
      &:hover a {
        color: #fff;
      }
      a {
        color: rgb(98 84 243);
        font-size: 1rem;
      }
    }
  }
  .card-data-right{
    display: flex;
    flex-direction: column;
    width: 33%;
    padding: 2rem 0rem 2rem 1rem;
    justify-content: space-around;
    p{
      span{
        color: #47ccde;
      }
    }
    ul{
      display: flex;
      align-items: center;
      gap: 2rem;
    }
  }
  .card-data-right{
    ul > li:first-child{
      font-size: 2rem;
      font-weight: bold;
    }
    ul > li:last-child{
      margin-top: .5rem;
      font-size: 1.6rem;
    }
  }


  @media (max-width: 1050px) {
    .card-data-right{
      ul > li:first-child{
        font-size: 1.8rem;
      }
      ul > li:last-child{
        margin-top: .5rem;
        font-size: 1.4rem;
      }
    }
    .card-data-right ul{
      gap: 1rem;
    }
  }
  @media (max-width: 950px) {
    .card-data-right ul{
      flex-direction: column;
      gap: 0;
    }
  }


  @media (max-width: 800px) {
    .list-card{
      min-height: 200px;
    }
    .btn{
      font-size: 1rem;
    }
    .card-data-right ul{
      flex-direction: row;
      gap: 0;
    }
  }
  @media (max-width: 580px) {
    .card-data-right{
      ul{
        gap: 1rem;
      }
      ul > li:first-child{
        font-size: 1.6rem;
      }
      ul > li:last-child{
        margin-top: .5rem;
        font-size: 1.2rem;
      }
    }
    .hide{
      position: absolute;
      top: -100rem;
    }
    
    .list-card-inside{
      gap: 2rem;
    }
    .link{
      width: 40%;
    }
    .card-data{
      width: 60%;
      flex-direction: column;
      
      .card-data-left{
        width: 100%;
      }
      .card-data-right{
        padding: 1rem;
        width: 100%;
        .link-cart{
          padding-top: 1rem;
        }
      }
    }
    .card-data .link-s{
      width: 100%;
    }
  }


`;

export default ListView;
