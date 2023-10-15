import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components'
import { addSingleOrderData, setIsError, setIsSingleLoading, setStatus } from '../../Store/Slices/OrderSlice';
import { useParams } from 'react-router-dom';
import FormatPrice from '../helper/FormatPrice';
import Spinner from '../Utility Components/Spinner';
import { toast } from 'react-toastify';


const SingleOrderComponent = () => {

  const {id} = useParams();
  const dispatch = useDispatch();
  const { singleOrderData, status } = useSelector(state => state.order);
  
  const getSingleData = async (id) => {
    dispatch(setIsSingleLoading());
    try {
        const { data } = await axios.get(`/api/v1/orders/singleorder/${id}`);
        toast.success(data.msg)
        dispatch(addSingleOrderData(data.singleOrderData));
      } catch (error) {
        toast.err(error.response.data.msg);
        dispatch(setIsError());
    }
  };

  useEffect(() => {
    getSingleData(id);
  }, []);



  const handleSubmit = async () => {
    dispatch(setIsSingleLoading());
    try {
        const { data } = await axios.put(`/api/v1/orders/updateorder/${id}`, {status});
        toast.success(data.msg);
        dispatch(addSingleOrderData(data.order));
    } catch (error) {
        dispatch(setIsError());
        toast.error(error.response.data.msg);
    }
  }



  if(singleOrderData.length === 0){
    return <Spinner />
  }else{
    const {address} = singleOrderData;
    return (
      <Wrapper>
        <div className="single-order-card">
          <h3>Shipping Info</h3>
          <div className="single-order-card-inside">
            <p>Name: <span>{address?.name}</span></p>
            <p>Phone: <span>{address?.phoneNo}</span></p>
            <p>Address: <span> {address?.locality}, {address?.landmark}, {address?.address}, {address?.district}, {address?.country}- {address?.pinCode}</span></p>
          </div>
        </div>

        <div className="single-order-card">
          <h3>Payment</h3>
          <div className="single-order-card-inside" style={{color: "white"}}>
            <h4 style={{color: "green", fontWeight: "bolder", fontSize: "2rem"}}>{singleOrderData?.paymentMethod && singleOrderData.paymentMethod === 'cod'? "Cash On Delivery" : "PAID"}</h4>
            <p>Amount: <span><FormatPrice price={singleOrderData.totalPrice} /></span></p>
          </div>
        </div>

        <div className="single-order-card">
          <h3>Order Status</h3>
          <div className="single-order-card-inside flex-row">
            <h4 style={{color: status === "Delivered"? "green" : "red", fontWeight: "bolder", fontSize: "2rem" }}>{singleOrderData.orderStatus}</h4>
            <div className='input'>
              <select name="" value={status} onChange={e => dispatch(setStatus(e.target.value))}>
                <option value={"Not Process"}>Not Process</option>
                <option value={"Processing"}>Processing</option>
                <option value={"Shipped"}>Shipped</option>
                <option value={"Delivered"}>Delivered</option>
                <option value={"Cancel"}>Cancel</option>
              </select>
              <button onClick={handleSubmit}>Process</button>
            </div>
          </div>
        </div>

        <div className="single-order-card">
          <h3>Order Items</h3>
          <div className="single-order-card-inside">
            <table>
              <tbody>
                  {
                    singleOrderData.orderedItems.map((element, index) => {
                      return (
                        <tr className="order-card flex-row" key={index}>
                          <td className="order-card-item"><figure><img src={element.image} alt="" /></figure></td>
                          <td className="order-card-item">{element.name}</td>
                          <td className="order-card-item">{element.count} * {element.price} = {element.count*element.price}</td>
                        </tr>
                      )
                    })
                  }
              </tbody>
            </table>
          </div>
        </div>
      </Wrapper>
    )
  }
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 5rem;
    background-color: white;

    .single-order-card{
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .single-order-card-inside{
      margin-left: 2rem;
      p{
        margin-top: .5rem;
      } 
    }
    .single-order-card-inside:last-child{
      width: 90%;
      margin: 0 auto;
    }

    table{
      width: 100%;
    }

    button{
        background-color: tomato;
        font-weight: bold;
        color: white;
        border: 1px solid tomato;
        &:hover{
            background-color: #e97a66;
        }
    }

    figure{
      height: 6rem;
      img{
        object-fit: contain;
        height: 100%;
      }
    }

  .order-card-item{
    span{
      height: 1rem;
      width: 5rem;
    }
  }
  .order-card{
    box-shadow: 0 0 5px 0 black;
    margin: .3rem 0;
    background-color: white;
    padding: 2rem;
    align-items: center;
    height: 8rem;
    border-radius: 5px;
  }

  .input{
    display: flex;
    gap: 1rem;
  }
  @media (max-width: 950px) {
    padding: 2rem;
    h3{
      font-size: 2.5rem;
    }
}
  @media (max-width: 560px) {
    padding: 0rem;
    h3{
      font-size: 2rem;
    }
    button{
      padding: .2rem .5rem;
    }
  }
  @media (max-width: 480px) {
    padding: 0rem;
    h3{
      font-size: 2rem;
    }
}
  @media (max-width: 375px) {
    padding: 0rem;
    h3{
      font-size: 2rem;
    }
    .input{
      flex-direction: column;
    }
    button{
      padding: .2rem .3rem;
    }
  }
`;

export default SingleOrderComponent;
