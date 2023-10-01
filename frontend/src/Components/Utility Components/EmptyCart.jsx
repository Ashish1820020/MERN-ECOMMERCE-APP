import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const EmptyCart = ({ text }) => {
  return (
    <Wrapper className="empty-cart">
      <div className="empty-cart-inside">
        <figure>
          <img src={import.meta.env.VITE_CART_IMAGE} alt="Empty Cart" />
        </figure>
        <h2>Your {text} is empty!</h2>
        <p>Explore our wide selection and find something you like</p>
        <NavLink to={"/products"}>
          <button>Explore</button>
        </NavLink>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-width: 30rem;
  width: 80%;
  padding: 2rem;
  margin: 0 auto;
  h2 {
    margin: 0 auto 4rem;
  }

  .empty-cart-inside {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    figure {
      padding: 2rem;
      width: 50%;
    }
    img {
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }
    h3 {
      margin: 0rem 0 1rem 0;
    }
    p {
      margin: 0.5rem 0;
    }
  }
  button {
    background-color: rgba(40, 116, 240, 255);
    color: white;
    border: none;
  }

  @media (max-width: 820px) {
    width: 100%;
    button {
      font-size: 1.2rem;
    }
  }
  @media (max-width: 400px) {
    width: 100%;
    button {
      font-size: 1rem;
    }
  }
`;

export default EmptyCart;
