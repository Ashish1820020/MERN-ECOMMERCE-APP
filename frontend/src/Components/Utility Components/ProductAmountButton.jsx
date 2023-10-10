import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";

const ProductAmountButton = ({
  _id,
  amount,
  setIncrease,
  setDecrease,
  stock,
  cartProdCount,
  color,
}) => {
  const dispatch = useDispatch();

  console.log(amount);

  return (
    <>
      <button
        className="button-left"
        onClick={
          _id
            ? () => dispatch(setDecrease({ _id, color }))
            : () => setDecrease()
        }
      >
        <FaMinus />
      </button>
      <div className="amount-style">{amount}</div>
      <button
        className="button-right"
        onClick={
          _id
            ? () => dispatch(setIncrease({ _id, color }))
            : () => setIncrease()
        }
        disabled={
          cartProdCount
            ? amount + cartProdCount >= stock
              ? true
              : false
            : false
        }
      >
        <FaPlus />
      </button>
    </>
  );
};

export default ProductAmountButton;
