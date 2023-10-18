import React, { useEffect } from "react";
import styled from "styled-components";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { updateCategories } from "../../Store/Slices/FilterTypeSlice";
import axios from "axios";
import { clearFilters, setFilters } from "../../Store/Slices/FilterAndPageSlice";

const Categories = () => {
    
    const dispatch = useDispatch();
  const getAllCategories = async () => {
    await axios.get(`/api/v1/categories`)
    .then((res) => {
      const data = res.data;
      dispatch(updateCategories(data.categoryList)); 
    })
    .catch((error)=>{
    })
  }
  useEffect(()=> {
    getAllCategories();
  }, []);

    
  const { categories } = useSelector(state => state.filterType);
  const catFilter = categories.filter((elem) => elem.name !== 'computer');

  
  return (
    <Wrapper className="container">
        <h3>Categories</h3>

        <div className="carousel-slider" onClick={() => dispatch(setFilters({ name: 'category', value: currentElem._id }))}>
          {
            catFilter.map((currentElem, index) => {
                return (
                  <div className="cp-brand-category-home" key={index} onClick={
                    () => {
                        dispatch(clearFilters()) 
                        dispatch(setFilters({ name: 'category', value: currentElem._id })) 
                      }
                    }>
                      <NavLink to={'/products'}>
                          <div className="img-wrap">
                              <img alt="Computers" src={currentElem.categoryImg} />
                          </div>
                          <p className="title">{currentElem.name}</p>
                      </NavLink>
                  </div>
                );
            })
          }

        </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
    margin: 5rem auto;
    min-height: 42vh !important;
    
    h3 {
        text-align: center;
        font-weight: 800;
        font-size: 3rem;
        margin-bottom: 3rem;
        text-transform: uppercase;
        border-bottom: #7b91ae;
    }

    .carousel-slider{
        display: grid;
        grid-row-gap: 30px;
        grid-column-gap: 30px;
        grid-template-columns: repeat(5, 18.6%);
        padding: 2rem;
    }

    .cp-brand-category-home{
      border-radius: 5px;
      box-shadow: 0 0 2px 0 black;
      color: white;
      cursor: pointer;
      display: grid;
      font-size: 1.25rem;
      font-weight: 700;
      height: 290px;
      width: 100%;
      letter-spacing: var(--letterSpacing);
      overflow: hidden;
      place-items: center;
      position: relative;
      text-transform: capitalize;
      transition: var(--transition);
      }
      .cp-brand-category-home:hover{
        transform: scale(.92);
      }

    a{
        width: 100%;
        height: 100%;
    }

    
    .img-wrap{
        width: 100%;
        height: 100%;
    }
    .img-wrap > img{
        width: 100%;
        height: 100%;
        filter: blur(1.8px);
    }
    p{
        padding: 0;
        font-size: 1.8rem;
        font-weight: 800;
        color: black;
        background: rgba(0,0,0,.5);
        color: white;
        display: grid;
        height: 100%;
        left: 0;
        place-content: center;
        position: absolute;
        text-align: center;
        top: 0;
        width: 100%;
        font-family: "work sans", sans-serif;
    }


  @media (max-width: 1200px) {
    .carousel-slider{
        grid-template-columns: repeat(4, 23.2%);
    }
  }

  @media (max-width: 920px) {
    .carousel-slider{
        grid-template-columns: repeat(3, 31.3%);
    }
  }
  @media (max-width: 800px) {
    .carousel-slider{
        grid-template-columns: repeat(2, 48.2%);
        justify-content: space-around;
    }
  }
  @media (max-width: 560px) {
    .carousel-slider{
        grid-template-columns: repeat(1, 80%);
        justify-content: space-around;
    }
    .cp-brand-category-home{
        height: 260px;
    }
  }
  @media (max-width: 460px) {
    .card{
      width: 300px;
    }
  }

  @media (max-width: 410px) {
    h3 {
      font-size: 2rem;
      font-weight: 700;
    }
  }
`;


export default Categories
