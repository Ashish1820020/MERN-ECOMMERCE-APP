import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ProductCard from '../Components/Utility Components/ProductCard';
import EmptyCart from '../Components/Utility Components/EmptyCart';
import { addToCart } from '../Store/Slices/CartSlice';
import { clearWishlist, removeFromWishlist } from '../Store/Slices/WishlistSlice';
import WishlistProductCard from '../Components/Utility Components/WishlistProductCard';

const Wishlist = () => {
    
  const { wishlistProducts } = useSelector(state => state.wishlist);
  const dispatch =  useDispatch();

  const handleToCart = (elem) => {
    dispatch(addToCart({...elem}));
    dispatch(removeFromWishlist({_id: elem._id, color: elem.color}));
  }

  useEffect(() => {
    localStorage.setItem("wishlistProducts", JSON.stringify(wishlistProducts));
  }, [wishlistProducts]);

  console.log(wishlistProducts);

  return (
    <Wrapper className='container'>
      {
        wishlistProducts.length === 0?

          <EmptyCart text={'Wishlist'}/>
        :
          <>
              <h2>Wishlist</h2>
              <div className="items-container">
                {
                  wishlistProducts.map((elem, index) => {
                    // console.log(elem);
                    return (
                      <div className='wishlist-card' key={elem._id+index}>
                        <WishlistProductCard {...{...elem}}/>
                        <button onClick={() => handleToCart(elem)}>Move to Cart</button>
                      </div>
                    )
                  })
                }
            </div>
            <button className='btn-warning' onClick={() => dispatch(clearWishlist())}>Clear Wishlist</button>
          </>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
margin: 3rem auto 10rem;

  .card{
    margin: 0;
    max-width: 100%;
    box-shadow: 0 0px 0px 0px rgba(0, 0, 0, 0.5);
    height: 400px;
    .card-inside{
      height: 400px;
    }
  }
  
  .wishlist-card{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 270px;
    margin: 1%;
    border-radius: 10px;
    box-shadow: 0 0px 2px 0px rgba(0, 0, 0, 0.5);
  }
  h2{
    text-align: center;
    border-bottom: 2px solid black;
    margin-bottom:  5rem;
  }
  .items-container{
      display: flex;
      flex-wrap: wrap;
  }
  .figure-container{
      position: relative;
  }
  button{
    background-color: rgba(40,116,240,255);
    color: white;
    border: none;
    border-radius: 0;
    border-radius: 0 0 10px 10px;
  }
  .btn-warning{
    background-color: tomato;
    border-radius: 5px;
    float: right;
    margin-top: 2rem;
  }

  @media (max-width: 1470px) {
    .items-container{
      justify-content: space-between;
    }
    .wishlist-card{
      width: 380px;
    }
  }
  @media (max-width: 950px) {
    .wishlist-card{
      width: 300px;
    }
  }
  @media (max-width: 700px) {
    .wishlist-card{
      width: 340px;
    }
  }
`;

export default Wishlist
