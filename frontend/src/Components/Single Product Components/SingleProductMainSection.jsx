import MyImage from "./MyImage";
import styled from "styled-components";
import ProductDataSection from "./ProductDataSection";

const SingleProductMainSection = ({ singleProduct, id }) => {

  const { images } = singleProduct;


  return (
    <Wrapper className="container flex">


      {/*----Image Container----*/}
      <div className="product-images">
        <MyImage img={images}/>
      </div>


      {/*----Data Container----*/}
      <div className="product-data">
        <ProductDataSection {...{ singleProduct, id }} />
      </div>


    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin: 10rem auto;
  background-color: white;
  padding: 1rem 2rem;
  gap: 2rem;
  position: relative;

  /*----PRODUCT IMAGE SECTION----*/
  .product-images {
    position: sticky;
    top: 80px;
    box-shadow: 0px 0px 4px 1px #d7c0ae;
    max-height: 44rem;
    width: 34%;
  }

  /*----PRODUCT DATA SECTION----*/
  .product-data {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: flex-start;
    width: 66%;
    h2 {
      font-size: 2.6rem;
      margin-bottom: 1rem;
    }
  }

  /* Price Section */
  .price-section {
    color: black;
    ul{
      display: flex;
      align-items: center;
      gap: 1.2rem;
    }
    li{
      list-style: none;
    }
    ul > li:first-child{
      font-size: 2rem;
      font-weight: bold;
    }
    ul > li:last-child{
      display: flex;
      align-items: center;
      gap: 1.2rem;
      margin-top: .5rem;
    }
    ul > li:last-child > del{
      font-size: 1.5rem;
      color: #969292;
    }
    ul > li:last-child > p{
      font-weight: bold;
      font-size: 1.5rem;
      color: #34ab4d;
    }
  }

  /* Offers Section */
  .offer-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    p {
      display: flex;
      gap: 1.2rem;
      padding: 0.2rem 0;
    }
    .icon {
      height: 2rem;
      color: green;
    }
  }

  /* Highlights and Offer Section */
  .item-section {
    margin: 2rem 0;
    .item-top {
      gap: 2rem;
    }
    button {
      border: none;
      font-size: 1.7rem;
      font-weight: bolder;
      margin: 0.5rem 1rem;
      padding: 0;
      border-radius: 0;
    }
  }

  /* Sellers Section */
  .sellers-section {
    padding: 20px;
    gap: 5rem;
  }

  /* Services Section */
  .services-section {
    justify-content: space-around;
    width: 80%;
    margin: auto;
    border: 1px solid black;
    .services {
      text-align: center;
      .icons {
        background-color: rgba(220, 220, 220, 0.5);
        border-radius: 50%;
        width: 4rem;
        height: 4rem;
        padding: 0.6rem;
        cursor: pointer;
      }
      p {
        font-size: 1.2rem;
        padding-top: 0.4rem;
      }
    }
  }

  /* Warranty Section */
  .product-data-warranty {
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

  .info-section{
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .cart-section {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    //COLOR SECTION
    .color-picker {
      align-items: center;
      gap: 0.5rem;

      .btn-container {
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
            opacity: 0.6;
          }
        }
      }
    }

    //AMOUNT SECTION
    .amount-button {
      display: flex;
      align-items: center;

      .button-left,
      .button-right {
        padding: 1rem 0.6rem;
        height: 3.8rem;
      }
      .amount-style {
        font-size: 2rem;
        width: 6rem;
        height: 3.8rem;
        padding: 1rem 2rem;
      }

      .button-container{
        display: flex;
      }
    }

    .btn {
      padding: 1rem 1rem;
      background-color: rgba(40, 116, 240, 255);
    }
  }

  h4 {
    color: #2d96ec;
    font-size: 1.5rem;
    text-transform: uppercase;
  }
  ul {
    margin: 1rem 0;
    li {
      list-style: circle;
      color: black;
    }
  }
  .ul {
    padding-left: 2rem;
  }
  .p-20 {
    padding: 0 0 0 2rem;
  }

  .p-10 {
    padding: 0rem 2rem;
  }

  .p-5 {
    padding: 0rem 1rem;
  }
  .p-40 {
    padding: 0rem 4rem;
  }

  @media (max-width: 950px) {
    gap: 0;
    .product-images {
      max-height: 32rem;
      width: 40%;
    }
    .product-data {
      width: 60%;
    }
    p,
    div > div > ul > li > p,
    div > p,
    div > ul > li > p {
      font: 13px;
    }

    .services-section {
      width: 96%;
    }
  }
  @media (max-width: 800px) {
    .button-container{
      flex-direction: column;
      gap: 1rem;
    }
  }

  @media (max-width: 550px) {
    gap: 4rem;
    flex-direction: column;
    gap: 3rem;
    .product-images {
      height: 110dvh;
      max-height: 50rem;
      width: 100%;
    }
    .product-data {
      width: 100%;
      margin: 0 auto;
      gap: 2rem;
    }
    .p-20 {
      padding: 0;
    }
    .p-40 {
      padding: 0 20px;
    }
    
    .button-container{
      flex-direction: row;
    }
  }

  @media (max-width: 380px) {
    .cart-section{
      .amount-button {
        flex-direction: column;
        gap: 2rem;
        align-items: flex-start;
      }
    }
  }
`;

export default SingleProductMainSection;
