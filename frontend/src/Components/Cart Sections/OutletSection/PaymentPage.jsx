import React, { useState } from 'react'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../../Store/Slices/CartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const PaymentPage = ({clientToken, deliveryAddress}) => {

    const [method, setMethod] = useState('');
    const { cartProducts } = useSelector(state => state.cart);
    const { userData } = useSelector(state => state.auth);
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    
    const handlePayment = async () => {
      console.log('try');
      try {
        const body = {cartProducts, id: userData._id, deliveryAddress, method};
        setLoading(true);

        if(method !== 'cod'){
          const { nonce } = await instance.requestPaymentMethod();
          body.nonce = nonce;
        }

        const { data } = await axios.post(`/api/v1/payment/braintree/payment`, body);
        setLoading(false);
        localStorage.removeItem("cartProducts");
        dispatch(clearCart());
        navigate("/dashboard/user/orders");
        toast.success("Payment Completed Successfully");
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

  return (
    <Wrapper>

      <h2>Select a payment method</h2>
     
      <div className='payment-container'>
        <div>
          <input type="radio" name="cod" checked = {method === 'cod'}  onChange={(e) => setMethod(e.target.name)}/>
          <label htmlFor="cod" name="cod">Cash On Delivery</label>
        </div>
        
        <div>
          <input type="radio" name="cards" checked = {method === 'cards'}  onChange={(e) => setMethod(e.target.name)} />
          <label htmlFor="cards" name="cards">Pay With Cards</label>
        </div>


        {
          method === 'cards'?
          <section>
            <DropIn options={{authorization: clientToken}} onInstance={(instance) => setInstance(instance)} />
          </section>
          :
          null
        }

      </div>
        {
          method === ''?
          null
          :
          <button
          className="btn btn-primary"
          onClick={() => handlePayment()}
          disabled={loading}
          >
            {loading ? "Processing ...." : "Order"}
          </button>
        } 
    </Wrapper>
  )
}

const Wrapper =  styled.div`
width: 80%;
margin: auto;
h2{
  font-weight: bold;
}
.payment-container{
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}
.payment-container > div{
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0px 0px 1px 0px black;
  padding: .5rem 1rem;
}
.payment-container > div:first-child{
  border-radius: 5px 5px 0 0;
}
.payment-container > div:nth-child(2){
  border-radius: 0px 0px 5px 5px;
}

input{
  box-shadow: 0 0 0 0 black;
  height: 1.8rem;
  width: 1.8rem;
}
.braintree-form__notice-of-collection > a{
  display: none;
}

button{
  width: 100%;
  border-radius: 5px;
  padding: .5rem 1rem;
}

label{
  font-size: 2rem;
}

@media (max-width: 770px) {
  width: 75%;
}

@media (max-width: 550px) {
  width: 90%;
}

@media (max-width: 420px) {
  width: 100%;
}
`;

export default PaymentPage;
