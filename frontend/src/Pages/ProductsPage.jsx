import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sort from '../Components/Products Page/Sort'
import ProductList from '../Components/Products Page/ProductList'
import FilterSection from '../Components/Products Page/FilterSection'
import axios from "axios";
import { updateCategories, updateFilters } from "../Store/Slices/FilterTypeSlice";
import { useDispatch } from "react-redux";
import { CgMenu } from "react-icons/cg";
import { HiFilter } from "react-icons/hi";

const Products = () => {
  const [state,  setState] = useState();
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch();

  const getAllCategories = async () => {
    await axios.get(`${import.meta.env.VITE_ROOT_API}/categories`)
    .then((res) => {
      const data = res.data;
      // console.log(data);
      dispatch(updateCategories(data.categoryList)); 

    })
    .catch((error)=>{
      // console.log(error);
    })
  }

  const getCompanyAndColors = async() => {
    await axios.get(`${import.meta.env.VITE_ROOT_API}/companyandcolor`)
    .then((res) => {
      const data = res.data;
      // console.log(data);
      dispatch(updateFilters(data)); 
    })
    .catch((error)=>{
      // console.log(error);
    })
  }

  useEffect(() => {
    getAllCategories();
    getCompanyAndColors();
  },[]);

  return (
    <Wrapper className="container flex">


      <div className={sidebar? 'products-page-left sidebar-active' : 'products-page-left' }>
        <FilterSection {...{sidebar, setSidebar, state}} />
      </div>

    
      <div className="products-page-right flex">
        <Sort {...{sidebar, setSidebar}} />

        <div className="products-page-bottom">
          <ProductList />
        </div>
      </div>

      <HiFilter name='menu-outline' className='mobile-nav-icon' onClick={()=>setSidebar(!sidebar)} />



    </Wrapper>
  )
};

const Wrapper = styled.section`
  align-items: flex-start;
  gap: 4rem;
  margin: 2rem auto;
  /* width: 136rem; */
    
  .products-page-left{
    width: 24%;
    padding: 2rem 1rem;
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0px 0px 2px 0px black;
  }
  
  .products-page-right{
    width: 73%;
    flex-direction: column;
    justify-content: start;
    min-width: 70%;
    gap: 2rem;
  }


  .mobile-nav-icon{
    position: absolute;
    display: none;
    background-color: transparent;
    cursor: pointer;
    border: none;
  }



  
  @media (max-width: 770px) {
    padding: 0;

    .products-page-left{
      position: absolute;
      left: -100rem;
      visibility: hidden;
      opacity: 0;
    }

    .sidebar-active{
      transition: all .5s ease;
      z-index: 1000;
      border-radius: 0%;
      position: fixed;
      overflow: scroll;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0rem;
      visibility: visible;
      opacity: 1;
    }

    .products-page-right{
      min-width: 90dvw;
      width: 99%;
      margin: 0 auto;
    }
    .mobile-nav-icon{
      position: fixed;
      background-color: rgba(0, 0, 0, .9);
      border-radius: 50%;
      display: inline-block;
      color: white;
      padding: 1.2rem;
      font-size: 4.6rem;
      bottom: 10rem;
      right: 2rem;
    }
  }
  
`;
  
export default Products;