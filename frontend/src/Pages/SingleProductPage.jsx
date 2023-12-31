import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { isSingleLoading, isError, updateSingleProductData, clearSingleProductData} from '../Store/Slices/ProductsSlice'
import { useDispatch, useSelector } from 'react-redux'
import SingleProductMainSection from '../Components/Single Product Components/SingleProductMainSection';
import Spinner from '../Components/Utility Components/Spinner';


const SingleProduct = () => {
  
  const dispatch = useDispatch();
  const productsData = useSelector(state => state.product); 
  const {singleProduct} = productsData;

  // Used to access the parameters of the current Route
  let {id} = useParams();

  const getSingleProduct = async(id) => {
    dispatch(isSingleLoading());
    try {
        const res = await axios.get(`/api/v1/products/productlist/${id}`);
        const singleProduct = await res.data;
        // console.log(singleProduct);

        dispatch(updateSingleProductData(singleProduct.product));
    } catch (error) {
      dispatch(isError());
    }
  }
  
  
  useEffect(() => {
    dispatch(clearSingleProductData());
    getSingleProduct(id);
  }, [id]);




  
  if(Object.keys(singleProduct).length === 0){
    return <Spinner />
  }
  else{
    return <SingleProductMainSection {...{singleProduct, id}}/>
  }
}


export default SingleProduct;


