import React, { useState } from 'react'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../../Store/Slices/CartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const PaymentPage = ({clientToken, deliveryAddress}) => {
    const { cartProducts } = useSelector(state => state.cart);
    const { userData } = useSelector(state => state.auth);
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handlePayment = async () => {
        try {
          setLoading(true);
          const { nonce } = await instance.requestPaymentMethod();
          const body = {nonce, cartProducts, id: userData._id, deliveryAddress};
          const { data } = await axios.post(`${import.meta.env.VITE_ROOT_API}/payment/braintree/payment`, body);
          setLoading(false);
          localStorage.removeItem("cartProducts");
          dispatch(clearCart());
          navigate("/dashboard/user/orders");
          toast.success("Payment Completed Successfully");
        } catch (error) {
          // console.log(error);
          setLoading(false);
        }
      };


  return (
    <Wrapper>
      <DropIn options={{authorization: clientToken}} onInstance={(instance) => setInstance(instance)} />
      <button
        style={{"float": "right"}}
        // 
        className="btn btn-primary"
        onClick={handlePayment}
        disabled={loading || !instance}
    >
        {loading ? "Processing ...." : "Make Payment"}
    </button>

    </Wrapper>
  )
}

const Wrapper =  styled.div`
width: 60%;
margin: auto;

@media (max-width: 770px) {
  width: 75%;
}
@media (max-width: 550px) {
  width: 90%;
}
@media (max-width: 420px) {
  width: 100%;
}
  
`

export default PaymentPage
