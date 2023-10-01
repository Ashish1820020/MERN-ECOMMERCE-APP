import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import CartProduct from "../CartProduct";
import PriceSection from "../PriceSection";
import { setTotal } from "../../../Store/Slices/CartSlice";

const ConfirmOrder = () => {
  const { cartProducts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTotal());
  }, [cartProducts]);

  return (
    <Fragment>
      <div className="confirmOrderPage">
        <div className="confirmCartItems">
          <div className="confirmCartItemsContainer">
            {cartProducts.map((currentElement, index) => (
              <CartProduct key={index} currentElement={currentElement} />
            ))}
          </div>
        </div>
      </div>

      <div className="price-section">
        <PriceSection />
      </div>
    </Fragment>
  );
};

const Fragment = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  .confirmOrderPage {
    width: 70%;
  }
  .price-section {
    width: 30%;
  }
  .checkout-price-section {
    box-shadow: 0 0px 1px 1px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 1250px) {
    flex-direction: column;
    align-items: center;
    .confirmOrderPage {
      width: 90%;
    }
    .price-section {
      width: 90%;
    }

    .checkout-price-section {
      box-shadow: none;
    }
  }

  @media (max-width: 544px) {
    .confirmOrderPage {
      width: 98%;
    }
    .price-section {
      width: 98%;
    }
  }
`;

export default ConfirmOrder;
