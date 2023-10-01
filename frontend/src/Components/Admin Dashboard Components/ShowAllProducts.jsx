import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormatPrice from '../helper/FormatPrice';
import { isError, isLoading, updateProductList } from '../../Store/Slices/ProductsSlice';
import axios from 'axios';
import Spinner from '../Utility Components/Spinner';

const ShowAllProducts = () => {
  
  
  const dispatch =  useDispatch();
  const {products, isProductLoading} = useSelector(state => state.product);


  // GET ALL PRODUCTS
  const getAllProducts = async () => {
    dispatch(isLoading());

    await axios.get(`/api/v1/products/productlist`)
    .then((res) => {
      const data = res.data;
      dispatch(updateProductList(data.result)); 
    })
    .catch((err) => {
      // console.log(err);
      dispatch(isError());
    })
  }

  


  useEffect(() => {
    getAllProducts();
  }, [])


  if(isProductLoading) {
    return <Spinner />
  }
  else{
    return (
      <Wrapper className="flex">
        {
          products.map((element) => {
            return (
              <NavLink key={element._id}  to={`/dashboard/admin/updateproductdetails/${element._id}`} >
                <div className="order-card flex-row">
                  <div className="order-card-item"><figure><img src={element.images[0]} alt="img"/></figure></div>
                  <div className="order-card-item">{element.name}</div>
                  <div className="order-card-item">{element.stock}</div>
                  <div className="order-card-item"><FormatPrice price={element.price}/></div>
                </div>
              </NavLink>  
            )
          })
        }
      </Wrapper>
    )
  }
}


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 20rem;
  gap: .5rem;

  .order-card{
    box-shadow: 0 0 3px 0 black;
    background-color: white;
    padding: 2rem 0.5rem;
    align-items: center;
    height: 8rem;
    border-radius: 5px;

    .order-card-item{
      font-size: 1.5rem;
      width: 25%;
      text-align: center;
      figure{
        height: 6rem;
        width: 100%;
        img{
          height: 100%;
          width: 100%;
          object-fit: contain;
        }
      }
      span{
        height: 1rem;
        width: 5rem;
      }
    }
    &:hover{
      background-color: #eaeded;
    }
  }

  @media (max-width: 530px) {
    .order-card{
      height: 15rem;
    }
  }
`;

export default ShowAllProducts;
