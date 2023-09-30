import { useEffect } from "react";
import styled from "styled-components";
import { setTotal } from '../Store/Slices/CartSlice'
import { useDispatch, useSelector } from "react-redux";
import CartProductSection from "../Components/Cart Sections/CartProductSection";
import PriceSection from "../Components/Cart Sections/PriceSection";
import EmptyCart from "../Components/Utility Components/EmptyCart";

const Cart = () => {

  const dispatch = useDispatch();

  const cartData = useSelector(state => state.cart);
  const {cartProducts} = cartData;
  
  useEffect(() => {
    dispatch(setTotal());
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  // console.log(cartProducts);


  return (
    <Wrapper className="container">

      <div className="cart flex">
      {
        (cartProducts && cartProducts.length === 0) ? 

          <EmptyCart text={'Cart'} />
          :
          <>
            {/* Product Section */}
            <div className="section-product ">
              <CartProductSection />
            </div>

            {/* Price Section */}
            <div className="section-price">
              <PriceSection />
            </div>
          </>
      }
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .cart{
    max-width: 1300px;
    margin: 4rem auto;
    gap: 4rem;
  }
  
  /* SECTION PRODUCT */
  .section-product{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 44%;
  }
  
  /* SECTION PRICE */
  .section-price{
    position: sticky;
    top: 5rem;
    box-shadow: 0px 0px 2px 0px black;
    background-color: #ffffff;
    width: 34%;
    max-height: 34rem;
  }
  
  /* CHECKOUT BUTTON */
  .order-btn{
    padding: 16px 22px;
    background-color: white;
    box-shadow: 0px 0px 2px 0px black;
    button{
      display: flex;
      margin-left: auto;
      background-color: #fb641b;
      border-radius: 5px;
      color: #fff;
      justify-content: center;
      border: none;
      text-transform: uppercase;
      width: 210px;
      padding: 12px 40px;
      font-size: 1.6rem;
      &:hover{
        background-color: #f88247;
      }
    }
  }

  @media (max-width:  950px) {
    .cart{
      flex-direction: column;
      gap: 2rem;
    }

    .section-product{
      margin: 5px auto;
      width: 86%;
    }
    .section-price{
      width: 50%;
      margin-left: auto;
      margin-right: 7%;
    }
    .order-btn{
      padding: 12px 22px;
      button{
        width: 140px;
        padding: 8px 20px;
        font-size: 1.2rem;
        font-weight: 700;
      }
    }
  }
  
  @media (max-width: 544px) {
    .section-product{
      width: 100%;
    }
    .section-price{
      width: 70%;
      margin-left: auto;
      margin-right: 0;
    }
    
    .order-btn{
      padding: 10px 22px;
      button{
        width: 140px;
        padding: 8px 20px;
        font-size: 1.2rem;
        font-weight: 700;
      }
    }
  }

  
  @media (max-width: 420px) {
    .section-price{
      width: 80%;
    }
  }
  @media (max-width: 320px) {
    .section-price{
      width: 100%;
    }
  }
`;

export default Cart;
