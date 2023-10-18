import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addOrders, setIsError, setIsLoading } from '../../Store/Slices/OrderSlice';
import styled from "styled-components";
import Spinner from '../Utility Components/Spinner';
import EmptyCart from '../Utility Components/EmptyCart';

const UserOrders = () => {
  const dispatch = useDispatch();
  const {isLoading, orderData} = useSelector(state => state.order);

  const getUserOrders = async () => {

    dispatch(setIsLoading());
    try{
      const res = await axios.get(`/api/v1/orders/user-orders`);
      const data = await res.data;
      dispatch(addOrders(data.userOrders)); 
    }
    catch(error){
      dispatch(setIsError());  
    }
  }
  
  
  
  useEffect(()=>{
    getUserOrders()
  }, []);
  
  
  if(isLoading){
    return <Spinner/>
  }
  else{
    if(orderData.length == 0){
      return <EmptyCart text={'Order Box'}/>
    }
    else{

      return (
        <Wrapper>
          <table>
  
  
            <tbody>
              {
                orderData.map(element => {
                  return element.orderedItems.map((order, index)=>{
                    return(
                      <tr key={index} >
                        <td><figure><img src={order.image} alt="" /></figure></td>
                        <td>{order.name}</td>
                        <td>{order.amount}</td>
                        <td style={{color: element.orderStatus === "Delivered"? "green" : "red", fontWeight: "bolder"}}>{element.orderStatus}</td>  
                      </tr>
                    )
                  })
                })
              }
            </tbody>
  
  
          </table>
        </Wrapper>
      )
    }
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 10rem;
  gap: .5rem;
  table{ 
    border-collapse: collapse;
  }
  figure{
      height: 4rem;
      img{
        object-fit: contain;
        height: 100%;
      }
    }
  
  tbody > tr {
    box-shadow: 0 0 2px 0 black;
    padding: 2rem .5rem;
    height: 12rem;
    background-color: white;
    
    &:hover{
      background-color: #eaeded;
    }
  }

  .empty-cart{
    padding: 0 !important;
  }
  .empty-cart-inside{
    padding: 0 !important;
  }
`

export default UserOrders;
