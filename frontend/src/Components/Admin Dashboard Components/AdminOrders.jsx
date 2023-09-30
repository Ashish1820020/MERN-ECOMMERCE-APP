import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FormatPrice from "../helper/FormatPrice";
import { useNavigate } from "react-router-dom";
import { addAllOrders, setIsError, setIsLoading } from "../../Store/Slices/OrderSlice";
import Spinner from '../Utility Components/Spinner'
import axios from "axios";

const AdminOrders = () => {

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoading, allOrderData} = useSelector(state => state.order);

  const getOrders = async () => {
    dispatch(setIsLoading());
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_ROOT_API}/orders/all-orders`);
      // console.log(data);
      dispatch(addAllOrders(data.allOrders));
    } catch (error) {
      // console.log(error);
      dispatch(setIsError());
    }
  };


  useEffect(() => {
    getOrders();
  },[]);
  if(isLoading){
    return <Spinner />
  }else{

    return (
      <Wrapper>
        <table>

          <thead>
            <tr>
              <td >ORDER ID</td>
              <td>ORDER STATUS</td>
              <td>ORDER Qnt</td>
              <td>TOTAL PRICE</td>
            </tr>
          </thead>
  
          <tbody>
            {
              allOrderData.map((element, index) => {
                  return (
                    <tr key={index} onClick={() => navigate(`${element._id}`)}>
                      <td>{element._id}</td>
                      <td>{element.orderStatus}</td>
                      <td>{element.orderedItems.length}</td>
                      <td><FormatPrice price={element.totalPrice}/></td>
                    </tr>
                  )
                })
              }
          </tbody>
        </table>
     </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 20rem;
  gap: .5rem;
  table{ 
    border-collapse: collapse;
  }
  thead{
    background-color: tomato;
    border-radius: 0;
    border: 2px solid #888787;
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
    height: 5rem;
  }
  
  tbody > tr {
    box-shadow: 0 0 2px 0 black;
    padding: 2rem .5rem;
    height: 6rem;
    background-color: white;
    
    &:hover{
      background-color: #eaeded;
    }
  }
`

export default AdminOrders;