import React, { useEffect, useState } from "react";
import FormatPrice from "../helper/FormatPrice";
import Star from "../Utility Components/Star";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../Store/Slices/WishlistSlice";
import { isPresent } from "../../utils/checks";
import { NavLink, useNavigate } from "react-router-dom";

const WishlistProductCard = ({ _id, name, image, price, rating, discount, color, company, stock }) => {

  const { wishlistProducts } = useSelector((state) => state.wishlist);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const [itemPresent, setItemPresent] = useState(isPresent(wishlistProducts, _id, color));


  useEffect(() => {
    setItemPresent(isPresent(wishlistProducts, _id, color));
  }, [wishlistProducts])
  
  

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
            <div className="color" style={{height: "2rem", width: "6rem", borderRadius: '0' }}> 
            <button value={color} style={{backgroundColor: `${color}`}}
            >
            </button>
            </div>
          </div>

          <p className="card-data-price">
            <FormatPrice price={price} discount={discount} />
          </p>
          
        </div>
      </div>
        
      <div
        onClick={() => dispatch(removeFromWishlist({  _id, color }))}
        className="caption"
      >
        <AiTwotoneHeart className="icon icon-fill" />
      </div>
    </div>
  );
};

export default WishlistProductCard;
