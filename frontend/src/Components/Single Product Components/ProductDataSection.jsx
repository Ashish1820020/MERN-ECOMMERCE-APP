
import FormatPrice from "../helper/FormatPrice";
import { NavLink, useNavigate } from "react-router-dom";
import RatingComponent from "../Utility Components/RatingComponent";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import { isPresent } from "../../utils/checks";
import { addToCart } from "../../Store/Slices/CartSlice";
import { addToWishlist } from "../../Store/Slices/WishlistSlice";
import ProductAmountButton from "../Utility Components/ProductAmountButton";
import { Button } from "../../styles/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const ProductDataSection = ({ singleProduct }) => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cart);
    const { wishlistProducts } = useSelector((state) => state.wishlist);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { cartProducts } = cartData;



    const paymentArray = [
        "Buy now Pay Later",
        "Cash on Delivery",
        "EMI starting from ₹458/month",
        "Net banking & Credit/ Debit/ ATM card",
    ];
    
      
    
    const { _id, name, company, images, price, colors, discountedPrice,
        description, stock, rating, bulletHighlights, discount
    } = singleProduct;


    const [amount, setAmount] = useState(1);
    const [color, setColor] = useState(colors[0]);
    const [item, setItem] = useState({ item: bulletHighlights, active: "Highlights" });
    
    
      // Checking if the product exists in the cart or not
      const existsInCart = cartProducts.filter(
        (currElem) => !(currElem._id + currElem.color !== _id + color)
      );
    
      // total count of the item in cart
      let cartProdCount = 0;
      if (existsInCart.length != 0) {
        cartProdCount = existsInCart.reduce((initial, current) => {
          return initial + current.amount;
        }, 0);
      }
    
    const condition = existsInCart?
        cartProdCount < stock && stock > 0 ? true
        : 
            false
        : 
            stock > 0? true
        : 
            false;

    // handling increasing and decreasing product quantity from single product page 
    const setIncrease = () => {
        amount < stock ? setAmount(amount + 1) : setAmount(stock);
    };
    const setDecrease = () => {
        amount > 1 ? setAmount(amount - 1) : setAmount(1);
    };


    // Object for adding product to cart
    const toCart = { _id, image: images[0],
        price, stock, discount, rating, name };
    
    // handling add to cart
    const handleAddToCart = (toCart, amount, color) => {
        dispatch(addToCart({ ...toCart, amount, color }));
        const present = isPresent(wishlistProducts, toCart._id, color);
        if(present) dispatch(removeFromWishlist({ _id: singleProduct._id, color }));
    };



  return (
    <>
        {/* Header Section */}
        <div className="header-section p-20">
          <h2>{name}</h2>
          <RatingComponent rating={rating}/>
        </div>

        {/* Price Section */}
        <div className="price-section p-10">
          <ul>
            <li><FormatPrice price={discountedPrice}/></li>
            <li>
              <del><FormatPrice price={price} /></del> 
              <p>{discount}% off</p>
            </li>
          </ul>
        </div>

        {/* Offer Section */}

        <div className="description-section flex p-20">
          {/* <h3>Description:</h3> */}
          <p>{description}</p>
        </div>


        {/* Highlight and Offer Section */}
        <div className="item-section flex-column p-20">
          <div className="item-top flex">
            <button
              style={{
                borderBottom:
                  item.active === "Highlights"
                    ? "4px solid black"
                    : "4px solid white",
              }}
              onClick={() =>
                setItem({ item: bulletHighlights, active: "Highlights" })
              }
            >
              Highlights
            </button>
            <button
              style={{
                borderBottom:
                  item.active === "Payment"
                    ? "4px solid black"
                    : "4px solid white",
              }}
              onClick={() => setItem({ item: paymentArray, active: "Payment" })}
            >
              Payment Options
            </button>
          </div>

          <div className="item-bottom p-40">
            <ul>
              {item &&
                item.item.map((currentBullet, index) => (
                  <li key={index}>
                    <p>{currentBullet}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Services Section */}
        <div className="services-section flex">
          <div className="services">
            <TbTruckDelivery className="icons" />
            <p>Free Delivery</p>
          </div>
          <div className="services">
            <TbReplace className="icons" />
            <p>30 Days Replacement</p>
          </div>
          <div className="services">
            <TbTruckDelivery className="icons" />
            <p>Anand Delivered </p>
          </div>
          <div className="services">
            <MdSecurity className="icons" />
            <p>2 Year Warranty </p>
          </div>
        </div>

        {/* Sellers Section */}
        <div className="sellers-section flex p-20">
          <h3>Seller: </h3>
          <div>
            <h4>Anand Retail</h4>
            <ul className="ul">
              <li>
                <p>7 Days Service Center Replacement/Repair</p>
              </li>
              <li>
                <p>GST invoice available</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Warranty Section */}
        <div className="warranty-section flex p-20">
          <h3>Warranty: </h3>
          <p className="product-warranty">
            1 Year Warranty for Phone and 6 Months Warranty for In-Box
            Accessories
          </p>
        </div>

        {/* Availability Section */}
        <div className="info-section p-20">
          <h3>
            Available:
            <span
              style={{
                color: condition ? "green" : "red",
                fontWeight: "bolder",
              }}
            >
              {" "}
              {condition ? "In Stock" : "Not Available"}{" "}
            </span>
          </h3>
          
          <h3>
            Brand:{" "}
            <span style={{ textTransform: "uppercase", fontWeight: "bolder" }}>
              {" "}
              {company}{" "}
            </span>
          </h3>

          <h3>
            Stock:{" "}
            <span style={{ fontWeight: "bolder" }}>
              {" "}
              {stock}{" "}
            </span>
          </h3>
        </div>
        <hr />

        {/* Add to cart  Section*/}
        <div className="cart-section padding">
          {/* color picker section */}
          <div className="color-picker flex">
            <h3>Color: </h3>
            {colors.map((elem, index) => {
              return (
                <div
                  key={index}
                  style={{
                    border: color === elem ? " 3px solid black" : "none",
                  }}
                  className="btn-container"
                >
                  <button
                    style={{ backgroundColor: elem }}
                    className="btnStyle"
                    onClick={(e) => setColor(elem)}
                  ></button>
                </div>
              );
            })}
          </div>

          {condition ?
            (
                <div className="amount-button">
                    <div className="amount-toggle p-5">
                        <ProductAmountButton
                        {...{
                            amount,
                            setIncrease,
                            setDecrease,
                            stock,
                            cartProdCount,
                            color,
                        }}
                        />
                    </div>

                    <div className="button-container">

                        {/* Add to cart button */}
                        <div className="add-button p-5">
                          <NavLink to={"/cart"}>
                            <Button
                            className="btn"
                            onClick={() => handleAddToCart(toCart, amount, color)}
                            >
                              ADD TO CART
                            </Button>
                          </NavLink>
                        </div>

                        {/* Add to wishlist button */}
                        <div className="add-button p-5">
                        {
                          isPresent(wishlistProducts, _id, color) ?
                          <NavLink to={"/wishlist"}>
                              <Button
                              className="btn"
                              style={{backgroundColor: 'white', border: '1px solid black', color: 'red'}}
                              >
                              checkout wishlist
                              </Button>
                          </NavLink>
                        :
                          <Button
                          className="btn"
                          onClick={() => 
                          isLoggedIn?
                              dispatch(addToWishlist({
                                  _id, name, image: images[0], price, rating, discount, 
                                  color, company, stock, amount: 1
                              }))
                            : 
                              navigate("/loginsignup")
                            }
                            >
                            ADD TO Wishlist
                        </Button>
                        }
                        </div>

                    </div>
                </div>
                ) 
            : 
                (
                    <h2 style={{ color: "red", marginLeft: "5rem", fontSize: "3rem" }}>
                        out of stock
                    </h2>
                )
            }
        </div>
    </>
  )
}

export default ProductDataSection;
