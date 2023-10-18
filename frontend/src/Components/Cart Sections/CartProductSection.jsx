import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import { redirect } from "react-router-dom";

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
          <button onClick={()=> redirect(isLoggedIn ? "/cart/checkout" : "/loginsignup")}>Place Order</button>
      </div>
    </>
  );
};

export default CartProductSection;
