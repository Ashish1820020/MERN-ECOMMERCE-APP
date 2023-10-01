import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import { NavLink } from "react-router-dom";

const CartProductSection = () => {
  const cartData = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { cartProducts } = cartData;

  return (
    <>
      {cartProducts.map((currentElement, index) => (
        <CartProduct key={index} currentElement={currentElement} />
      ))}
      <div className="order-btn">
        <NavLink to={isLoggedIn ? "/cart/checkout" : "/loginsignup"}>
          <button>Place Order</button>
        </NavLink>
      </div>
    </>
  );
};

export default CartProductSection;
