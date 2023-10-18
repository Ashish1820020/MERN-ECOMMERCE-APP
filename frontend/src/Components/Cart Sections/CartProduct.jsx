import React from "react";
import RatingComponent from "../Utility Components/RatingComponent";
import FormatPrice from "../helper/FormatPrice";
import styled from "styled-components";
import ProductAmountButton from "../Utility Components/ProductAmountButton";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  setIncrease,
  setDecrease,
} from "../../Store/Slices/CartSlice";
import { addToWishlist } from "../../Store/Slices/WishlistSlice";
import { useLocation, useNavigate } from "react-router-dom";

const CartProduct = ({ currentElement }) => {
  const { _id, name, price, image, color, amount, discount, rating, stock } = currentElement;

    
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const toWishlist = () => {
    dispatch(removeFromCart({ _id, color }));
    dispatch(addToWishlist({ ...currentElement }));
  };

  return (
    <Wrapper className="product-card">
      <div className="product-card-inside">
        {/* Left Portion */}
        <div className="left">
          <div className="left-top">
            <figure>
              <img src={image} alt="Hero" className="img-style" />
            </figure>
          </div>

          <div className="left-bottom">
            <div className="amount-toggle">
              <ProductAmountButton
                {...{ _id, color, setIncrease, setDecrease, amount }}
              />
            </div>
          </div>
        </div>

        {/* Center Section */}
        <div className="center">
          <div className="product-details">
            <h2>{name}</h2>
            <RatingComponent rating={rating} />

            <div className="color">
              <p>Color: </p>
              <div style={{ backgroundColor: `${color}` }} />
            </div>

            <div className="product-price-data">
              <p>
                {" "}
                Special Price:
                <span>
                  <FormatPrice
                    className="price"
                    price={price}
                    discount={discount}
                  />
                </span>
                <del>{<FormatPrice className="price" price={price} />}</del>
              </p>
            </div>
          </div>

          {
            location.pathname.includes('/checkout')?
              null
            :
              <div className="center-bottom">
                <button onClick={() => dispatch(removeFromCart({ _id, color }))}>
                  Remove
                </button>
                <button onClick={() => isLoggedIn? toWishlist() : navigate('/loginsignup', {state: location.pathname})}>
                  Move to Wishlist
                </button>
              </div>
          }
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: rgba(256, 256, 256, 0.88);

  .product-card-inside {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 20rem;
    background-color: #f5f5f500;
    padding: 0.5rem 1.5rem;
    box-shadow: 0px 0px 2px 0px black;
  }

  // <----Left Section---->
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    width: 28%;
    padding: 5px;
    cursor: pointer;
    .left-top {
      height: 70%;
      figure {
        height: 100%;
        width: 100%;
        padding: 0 2.5rem;

        img {
          height: 100%;
          width: 100%;
          object-fit: contain;
        }
      }
    }

    //-----left-bottom-----
    .left-bottom {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 20%;
    }
  }

  // <----Center Section---->
  .center {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 61%;
    height: 100%;
    padding: 0.5rem 1rem;

    h2 {
      text-transform: capitalize;
    }

    .product-details {
      height: 80%;

      .stars {
        margin: 0.2rem 0;
      }
      .color {
        margin: 0.3rem 0;
      }

      .product-price-data {
        p {
          color: green;
          font-size: 1.2rem;
          font-weight: 600;
        }
        span {
          margin-left: 1rem;
          color: black;
          font-weight: 800;
          margin-right: 1.2rem;
        }
        del {
          color: black;
          font-size: 1.2rem;
        }
      }
    }
    .center-bottom {
      display: flex;
      align-items: center;
      gap: 2rem;
      height: 20%;

      button {
        padding: 0.5rem 0;
        background-color: white;
        font-weight: bolder;
        font-size: 1.4rem;
        text-transform: uppercase;
        border: none;
        &:hover {
          color: #6c77f3;
        }
      }
    }
  }

  /* FOR COLOR CONTENT */
  .color {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-top: 1rem;
    p {
      font-size: 1.25rem;
    }
    div {
      border: 1px solid gray;
      display: inline-block;
      height: 1.2rem;
      width: 2.4rem;
    }
  }

  @media (max-width: 950px) {
    .product-card-inside {
      height: 18rem;
    }
    .left {
      width: 38%;
    }
  }

  @media (max-width: 544px) {
    .center{
      padding-right: 0;
    }
  }
  @media (max-width: 450px) {
    .product-card-inside {
      padding: 1rem 0;
    }
    .left > .left-top > figure {
      padding: 0 1rem;
    }
    .center .center-bottom{
      gap: 1rem;
    }
    .center .center-bottom button{
      font-size: 1.1rem;
    }
  }
`;

export default CartProduct;
