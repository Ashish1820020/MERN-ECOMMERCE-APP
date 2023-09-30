import React, { useState } from 'react';
import styled from 'styled-components';
import MyImage from './MyImage';
import FormatPrice from "../helper/FormatPrice";
import Star from '../Utility Components/Star';
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import { FaTag, FaCheck } from 'react-icons/fa';
import ProductAmountButton from '../Utility Components/ProductAmountButton';
import { Button } from '../../styles/Button';
import {NavLink} from 'react-router-dom';
import { addToCart } from '../../Store/Slices/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { isPresent } from '../../utils/checks';
import { removeFromWishlist } from '../../Store/Slices/WishlistSlice';

const SingleProductMainSection = ({singleProduct, id}) => {

  const paymentArray = ["Buy now Pay Later", "Cash on Delivery",
                        "EMI starting from ₹458/month", "Net banking & Credit/ Debit/ ATM card"]

  const {_id, name, company, price, description, stock, rating, images, bulletHighlights, discount, colors} = singleProduct;
  const toCart = { _id, name, image:images[0], price, stock, discount, rating}
  const [amount, setAmount] = useState(1);
  const [color, setColor] = useState(colors[0]);

  const [item, setItem] = useState({item: bulletHighlights, active: "Highlights"});

  const dispatch = useDispatch();
  const cartData = useSelector(state => state.cart);
  const { wishlistProducts } = useSelector((state) => state.wishlist);
  const {cartProducts} = cartData;


  // Checking if the product exists in the cart or not
  const existsInCart = cartProducts.filter((currElem)=> !(currElem._id + currElem.color !== _id+color ));

  // total count of the item in cart
  let cartProdCount = 0;
  if(existsInCart.length!=0){
    cartProdCount = existsInCart.reduce((initial, current)  =>  {
      return initial + current.amount;
    }, 0);
  };

  const condition = existsInCart? (cartProdCount < stock && stock > 0) ? true: false : (stock > 0) ? true : false;

  const setIncrease = () => {
      (amount < stock ) ? setAmount(amount+1) : setAmount(stock);
  }
  const setDecrease = () => {
      (amount > 1 ) ? setAmount(amount-1) : setAmount(1);
  }




  const handleAddToCart = (toCart, amount, color) => {

    dispatch(addToCart({...toCart, amount, color}))

    const present = isPresent(wishlistProducts, toCart._id, color);
    if(present) dispatch(removeFromWishlist({_id: singleProduct._id, color}));
  }







  return (
    <Wrapper className="container flex">


        {/*----Image Container----*/}
        <div className="product-images">
          <MyImage img = {images} bulletHighlights={bulletHighlights} />
        </div>


        {/*----Data Container----*/}
        <div className="product-data">
          {/* Header Section */}
          <div className="header-section p-20">
              <h2>{name}</h2>
              <Star rating={rating}/>
          </div>



          {/* Price Section */}
          <div className="price-section p-10">
            <p className="product-data-price">MRP:  <del><FormatPrice price={price} /></del></p>
            <h3 className="product-data-price product-data-real-price">Deal of the Day:  
              <span><FormatPrice className ="price" price={price} discount={discount}/></span>
            </h3>
          </div>



          {/* Offer Section */}
          <div className="offer-section p-20">
            <h3>Available offers</h3>
            <div>
              <p><FaTag className='icon'/>Eligible for Flipkart Pay Later?</p>
              <p><FaTag className='icon'/>Bank OfferFlat ₹1,250 Off on HDFC Bank Credit Card EMI Trxns on orders priced between ₹15,000 to ₹39,999T&C</p>
              <p><FaTag className='icon'/>Bank OfferFlat ₹3,000 Off on HDFC Bank Credit Card EMI Trxns on orders priced between ₹40,000 to ₹49,999T&C</p>
              <p><FaTag className='icon'/>Bank OfferFlat ₹4,000 Off on HDFC Bank Credit Card EMI Trxns on orders of ₹50,000 and aboveT&C</p>
            </div>
          </div>



          {/* Highlight and Offer Section */}
          <div className="item-section flex-column p-20">
           <div className="item-top flex">
            <button style={{borderBottom: item.active === "Highlights"? "4px solid black" : "4px solid white"}} onClick={() => setItem({item: bulletHighlights, active: "Highlights"})}>Highlights</button>
            <button style={{borderBottom: item.active=== "Payment"? "4px solid black" : "4px solid white"}} onClick={() => setItem({item: paymentArray, active: "Payment"})}>Payment Options</button>
           </div>

            <div className="item-bottom p-40">
              <ul>
                {item && item.item.map((currentBullet,index) => <li key={index}><p>{currentBullet}</p></li>)}
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
              <ul className='ul'>
                <li><p>7 Days Service Center Replacement/Repair</p></li>
                <li><p>GST invoice available</p></li>
              </ul>
            </div>
          </div>



          {/* Warranty Section */}
          <div className="warranty-section flex p-20">
            <h3>Warranty: </h3>
            <p className="product-warranty">1 Year Warranty for Phone and 6 Months Warranty for In-Box Accessories</p>
          </div>

         

          {/* Availability Section */}
          <div className="info-section p-20">
            <h3>Available:
              <span style={{color: condition? "green" : "red", fontWeight: "bolder"}}> {condition? "In Stock" : "Not Available" } </span>
            </h3>
            {/* <p>ID: <span>{id}</span></p> */}
            <h3>Brand: <span style={{textTransform: "uppercase", fontWeight: "bolder"}}> {company} </span></h3>
          </div>
          <hr/>

          {/* Description Section */}
          <div className="description-section flex p-20">
            <h3>Description:</h3>
            <p>{description}</p>
          </div>

          {/* Add to cart  Section*/}
          <div className="cart-section padding">

            {/* color picker section */}
            <div className="color-picker flex">
              <h3>Color: </h3>
              {
                colors.map((elem, index)=>{
                  return (
                    <div key={index}  style={{border: color===elem? " 3px solid black" : "none"}}
                      className="btn-container">
                      <button
                      style={{backgroundColor: elem}}
                      className="btnStyle"
                      onClick={(e) => setColor(elem)}
                      ></button>
                    </div>
                  );
                })
              }
            </div>
            
            {
              condition? 

              <div className='amount-button'>
                    {/* for product amount button */}
                    <div className="amount-toggle p-10">
                        <ProductAmountButton {...{amount, setIncrease, setDecrease, stock, cartProdCount, color} }/>
                    </div>

                    {/* Add to cart button */}
                    <div className="add-button p-10">
                      <NavLink to={'/cart'}>
                        <Button className='btn' 
                        onClick={() => handleAddToCart(toCart, amount, color)}
                        >ADD TO CART</Button>
                      </NavLink>
                    </div>
              </div>

              : 

              <h2 style={{color: "red", marginLeft: "5rem", fontSize: "3rem"}}>out of stock</h2>
            }
          </div>

        </div>
    </Wrapper>
  )
}


const Wrapper = styled.section`
  margin: 5rem auto;
  /* box-shadow: 0px 0px 1px 0px black; */
  background-color: white;
  padding: 1rem 2rem;
  gap: 2rem;
  
  /*----PRODUCT IMAGE SECTION----*/
  .product-images{
    box-shadow: 0px 0px 4px 1px #D7C0AE;
    max-height: 44rem;
    width: 34%;
  }



  /*----PRODUCT DATA SECTION----*/
  .product-data {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: flex-start;
    width: 66%;
    h2{
      font-size: 2.6rem;
    }
  }

  /* Price Section */
  .price-section{
    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
      span{
        font-size: 1.8rem;
      }
      h3{
        font-weight: bolder;
      }
    }
  }

  /* Offers Section */
  .offer-section{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    h3{
      /* padding: 2rem 0; */
    }
    p{
      display: flex;
      gap: 1.2rem;
      padding: .2rem 0;
    }
    .icon{
      height: 2rem;
      color: green;
    }
  }


  /* Highlights and Offer Section */
  .item-section{
    margin: 2rem 0;
    .item-top{
      gap: 2rem;
    }
    button{
      border: none;
      font-size: 1.7rem;
      font-weight: bolder;
      margin: 0.5rem 1rem;
      padding: 0;
      border-radius: 0;
    }
  }

  /* Sellers Section */
  .sellers-section{
    padding: 20px;
    gap: 5rem;
  }

  /* Services Section */
  .services-section{
    justify-content: space-around;
    width: 80%;
    margin: auto;
    border: 1px solid black;
    .services{
      text-align: center;
      .icons{
        background-color: rgba(220, 220, 220, 0.5);
        border-radius: 50%;
        width: 4rem;
        height: 4rem;
        padding: 0.6rem;
        cursor: pointer;
      }
      p{
        font-size: 1.2rem;
        padding-top: 0.4rem;
      }
    }
  }

  /* Warranty Section */
  .product-data-warranty{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 1rem;

      .product-data-info {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        font-size: 1.3rem;

        span {
          font-weight: bold;
        }
      }

      hr {
        max-width: 100%;
        width: 90%;
        border: 0.1rem solid #000;
        color: red;
      }
    }


  .cart-section{
    display: flex;
    flex-direction: column;
    gap: 3rem;

    //COLOR SECTION
    .color-picker{
      align-items: center;
      gap: .5rem;
      
      .btn-container{
        height: 4.1rem;
        width: 4.32rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .btnStyle {
          height: 2.7rem;
          width: 2.92rem;
          margin: 0;
          padding: 0;
          border: none;
          cursor: pointer;
          color: black;
          border-radius: 50%;
          box-shadow: 0px 0px 2px 1px black;
          &:hover {
            opacity: .6;
          }
        }
      } 
    }

    //AMOUNT SECTION
    .amount-button{
      display: flex;
      align-items: center;
              
      .button-left, 
      .button-right{
        padding: 1rem .6rem;
        height: 3.8rem;
      }
      .amount-style{
        font-size: 2rem;
        width: 6rem;
        height: 3.8rem;
        padding: 1rem 2rem;
      } 
    }

    .btn{
      padding: 1rem 2rem;
      background-color: rgba(40,116,240,255);;
    }
  }



  h4{
    color: #2d96ec;
    font-size: 1.5rem;
    text-transform: uppercase;
  }
  ul{
    margin: 1rem 0;
    li{
      list-style: circle;
    }
  }
  .ul{
    padding-left: 2rem;
  }
  .p-20{
    padding: 0 0 0 2rem;
  }

  .p-10{
    padding: 0rem 2rem;
  }
  .p-40{
    padding: 0rem 4rem;
  }

  @media (max-width: 950px) {
    gap: 0;
    .product-images{
      max-height: 32rem;
      width: 40%;
    }
    .product-data {
      width: 60%;
    }
    p, div>div>ul>li>p,
    div > p, div > ul > li > p{
      font: 13px;
    }

    .services-section{
      width: 96%;
    }
  }

  @media (max-width: 550px) {
    gap: 4rem;
    flex-direction: column;
    gap: 3rem;
    .product-images{
      height: 110dvh;
      max-height: 50rem;
      width: 100%;
    }
    .product-data {
      width: 100%;
      margin: 0 auto;
      gap: 2rem;
    }
    .p-20{
      padding: 0;
    }
    .p-40{
      padding: 0 20px;
    }
  }

  @media (max-width: 380px) {
    .amount-button {
      flex-direction: column;
      gap: 2rem;
    }
  }

  
`;


export default SingleProductMainSection;



