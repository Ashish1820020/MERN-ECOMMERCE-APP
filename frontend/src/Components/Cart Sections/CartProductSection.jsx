import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import { useLocation, useNavigate } from "react-router-dom";

const CartProductSection = () => {
  const cartData = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { cartProducts } = cartData;
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  return (
    <>
      {cartProducts.map((currentElement, index) => (
        <CartProduct key={index} currentElement={currentElement} />
      ))}
      <div className="order-btn">
          <button onClick={() => navigate(isLoggedIn ? "/cart/checkout" : "/loginsignup/login", {state: location.pathname})}>Place Order</button>
      </div>
    </>
  );
};

export default CartProductSection;
