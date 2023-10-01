import React, { useEffect, useState } from "react";
import FormatPrice from "../helper/FormatPrice";
import Star from "../Utility Components/Star";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../Store/Slices/WishlistSlice";
import { isPresent } from "../../utils/checks";
import { NavLink, useNavigate } from "react-router-dom";

const ProductCard = ({
  _id,
  name,
  image,
  price,
  rating,
  discount,
  colors,
  company,
  stock,
}) => {
  const { wishlistProducts } = useSelector((state) => state.wishlist);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [itemPresent, setItemPresent] = useState(
    isPresent(wishlistProducts, _id, selectedColor)
  );

  useEffect(() => {
    setItemPresent(isPresent(wishlistProducts, _id, selectedColor));
  }, [wishlistProducts]);

  const changeColor = (e) => {
    setSelectedColor(e.target.value);
    setItemPresent(isPresent(wishlistProducts, _id, e.target.value));
  };

  return (
    <div className="card">
      <div className="card-inside">
        <NavLink className="link" to={`/singleproduct/${_id}`}>
          <div className="figure-container">
            <figure className="figure">
              <img src={image} alt={name} />
            </figure>
          </div>
        </NavLink>

        <div className="data-container">
          <NavLink className="link" to={`/singleproduct/${_id}`}>
            <div>
              <h3>{company}</h3>
              <p>{name}</p>
              <Star rating={rating} />
            </div>
          </NavLink>

          <div className="colors">
            {colors.map((elem, index) => {
              return (
                <div
                  className="color"
                  key={index}
                  style={{
                    border: selectedColor === elem ? "2px solid black" : "none",
                  }}
                >
                  <button
                    value={elem}
                    style={{ backgroundColor: `${elem}` }}
                    onClick={changeColor}
                  ></button>
                </div>
              );
            })}
          </div>

          <p className="card-data-price">
            <FormatPrice price={price} discount={discount} />
          </p>
        </div>
      </div>

      <div
        onClick={() =>
          isLoggedIn
            ? itemPresent
              ? dispatch(removeFromWishlist({ _id, color: selectedColor }))
              : dispatch(
                  addToWishlist({
                    _id,
                    name,
                    image,
                    price,
                    rating,
                    discount,
                    color: selectedColor,
                    company,
                    stock,
                    amount: 1,
                  })
                )
            : navigate("/loginsignup")
        }
        className="caption"
      >
        {itemPresent ? (
          <AiTwotoneHeart className="icon icon-fill" />
        ) : (
          <AiOutlineHeart className="icon" />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
