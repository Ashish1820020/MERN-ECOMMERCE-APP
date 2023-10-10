import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AdminMenu from "../../Admin Dashboard Components/AdminMenu";
import { CgMenu } from "react-icons/cg";
import AdminMainSection from "../../Admin Dashboard Components/AdminMainSection";
import { updateCategories } from "../../../Store/Slices/FilterTypeSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addAllOrders, setIsError, setIsLoading } from "../../../Store/Slices/OrderSlice";
import { isError, isLoading, updateProductList } from "../../../Store/Slices/ProductsSlice";
import { setAllUsers } from "../../../Store/Slices/AuthSlice";

const Dashboard = () => {

  const refOne = useRef(null);
  const [sidebar, setSidebar] = useState(false);
  const dispatch =  useDispatch();

  



  

  
  // GET ALL CATEGORIES
  const getAllCategories = async () => {
    await axios.get(`/api/v1/categories`)
    .then((res) => {
      const data = res.data;
      dispatch(updateCategories(data.categoryList)); 
    })
    .catch((error)=>{
    })
  }


  const getOrders = async () => {
    dispatch(setIsLoading());

    try {
      const { data } = await axios.get(`/api/v1/orders/all-orders`);
      dispatch(addAllOrders(data.allOrders));
    } catch (error) {
      dispatch(setIsError());
    }
  };
  // GET ALL PRODUCTS
  const getAllProducts = async () => {
    dispatch(isLoading());

    await axios.get(`/api/v1/products/productlist`)
    .then((res) => {
      const data = res.data;
      dispatch(updateProductList(data.result)); 
    })
    .catch((err) => {
      dispatch(isError());
    })
  }


  const getAllUsers = async () => {
    try{
      const res = await axios.get(`/api/v1/auth/allusers`);
      const data = await res.data;
      dispatch(setAllUsers(data.allUserData)); 
    }
    catch(error){
    }
  }
  
    
  const handleOutsideClick = (e) => {
    if(refOne && !refOne?.current?.contains(e.target)){
      setSidebar(false);
    }
  }
  
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    getAllUsers();
    getAllProducts();
    getOrders();
    getAllCategories();
  },[]);

  return (
    <Wrapper className="container">


      <div className="header">
        <div className="mobile-navbar-btn">
            <CgMenu className='icon' onClick={()=>setSidebar(!sidebar)}/>
        </div>
        <h1>Admin</h1>
      </div>


      <div className="main-section">
        <div  ref={refOne} className={sidebar? "left active" : "left"}>
          <AdminMenu {...{sidebar, setSidebar}}/>
        </div>

        <div className="right">
         <AdminMainSection />
        </div>
      </div>


    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 5rem;

  .header{
    margin-top: 2rem;
    display: flex;
    align-items: center;
  }



  .mobile-navbar-btn{
    position: absolute;
    top: -100rem;
    left: -100rem;
    z-index: 0;
    opacity: 0;
    visibility: hidden;
    color: black;
  }

  .icon-container{
    .icon{
      box-shadow: 0px 1px 0px 1px #ccc;
    } 
  }
  h1{
    margin: 0 auto;
  }

  .main-section{
    width: 100%;
    display: flex;
    gap: 2rem;
    align-items: flex-start;
  }

  .left{
    width: 22%;
    border: 1px solid black;
  }
  .left-inside{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .list{
      background-color: white;
      width: 100%;
    }
  }
  
  .list-item{
    padding: 1rem 0;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bolder;
    color: black;
    box-shadow: 0 0 2px 2px #ccc;
    &:hover{
      color: white;
      background-color: #b0b0f6;
    }
  }
  .right{
    width: 76%;
  }
  .right-inside{
    background-color: white;
    box-shadow: 0px 0px 1px 0px black;
  }

  .hide{
    position: absolute;
    top: -100rem;
    left: -100rem;
    z-index: 0;
  }


  @media (max-width: 800px) {
    
    .left{
      position: absolute;
      top: -100rem;
      left: -100rem;
      z-index: 10000;
      width: 30dvw; 
      border: none;
      .list-item{
        box-shadow: 0 1px 0px 1px #ccc;
      }
    }
    
    .mobile-navbar-btn{
      position: static;
      z-index: 100;
      opacity: 1;
      visibility: visible;
    }

    .active{
      top: 65px;
      left: 0rem;
      visibility: visible;
      opacity: 1;
      width: 100%;
    }
  .main-section{
    .right{
      width: 90%;
      margin: 0 auto;
    }
  }
}
@media (max-width: 800px) {
  .main-section{
    .right{
      width: 100%;
      margin: 0 auto;
    }
  }
}
@media (max-width: 370px) {
  .right-inside{
    padding-left: 0;
    padding-right: 0;
  }
}
`;


export default Dashboard;
