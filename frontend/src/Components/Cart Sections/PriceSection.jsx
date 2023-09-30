import React from 'react'
import styled from 'styled-components';
import FormatPrice from '../helper/FormatPrice';
import { useSelector } from 'react-redux';

const PriceSection = () => {
  const cartData = useSelector(state => state.cart);
  const { totalAmount, totalItems, discountedPrice } = cartData;

  return (
    <Wrapper className='checkout-price-section'>
        <h2>PRICE DETAILS</h2>
        <div>
            <p className='left'> Price ({totalItems} item) </p>
            <p className='right'>  <FormatPrice price={totalAmount} decimal={2}/> </p>
        </div>
        <div>
            <p className='left'> Discount </p>
            <p className='right'> − <FormatPrice price={ totalAmount-discountedPrice } decimal={2}/> </p>
        </div>
        <div>
            <p className='left'> Delivery Charges </p>
            <p className='right'> Free </p>
        </div>
        <div className='total'>
            <p className='total-left'> Total Amount </p>
            <p className='total-right'>  <FormatPrice price={discountedPrice} decimal={2} />  </p>
        </div>
        <div><span>You will save ₹{totalAmount-discountedPrice} on this order</span></div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 10px;

    h2{
        font-size: 1.6rem;
        font-weight: bold;
        border-bottom: 1px dotted black;
        padding: 1rem 0;
    }

    .total{
        border-top: 1px dotted black;
        padding-top: 1.6rem;
    }

    div{
        display: flex;
        justify-content: space-between;
        
        .total-left{  
            font-size: 1.6rem;
            font-weight: bold;
        }
        .total-right{
            font-size: 1.6rem;
            font-weight: bold;
        }
        
        span{
            width: 100%;
            color: green;
            font-size: 1.6rem;
            border-top: 1px dotted black;
            padding-top: 1rem;
        }
        
    }

    @media (max-width:  950px) {
        div > p{
            font-size: 16px;
        }
    }
   
`;
    
export default PriceSection;