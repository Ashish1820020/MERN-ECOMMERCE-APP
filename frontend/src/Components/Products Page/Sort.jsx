import React, { useState } from 'react'
import styled from 'styled-components'
import {BsFillGridFill, BsFilterSquareFill, BsList} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { setListView, setGridView, setSortingType } from '../../Store/Slices/FilterAndPageSlice';
import { CgClose, CgMenu } from 'react-icons/cg';

const Sort = ({sidebar, setSidebar}) => {
  
  const dispatch = useDispatch();
  const filterAndPageData = useSelector(state => state.FilterAndPage);
  const { gridView, filteredProducts } = filterAndPageData;





  return (
    <Wrapper>
      
      {/* 1st column  */}
      <div className="sort-left flex">
        <button className={gridView? "view-type" :  "view-type active"} onClick={() => dispatch(setListView())} >
          <BsList className='icon'/>
        </button>

        <button className={gridView? "view-type active" : "view-type"} onClick={ () => dispatch(setGridView())}>
          <BsFillGridFill className= 'icon' />
        </button>
      </div>

      {/* 2nd column  */}
      <div className="sort-mid">
        <p>{`${filteredProducts.length} Product Available`}</p>
      </div>

      {/* 3rd column  */}
      <div className="sort-right">
        <h3>Sort By:</h3>
        <form action="#">
          <label htmlFor="sort"></label>
          <select
            name="sort"
            id="sort"
            className="select-section"
            onChange={(e) => dispatch(setSortingType(e.target.value))}>
            <option value="rating">Rating</option> 
            <option value="lowest">Price: Low to High</option> 
            <option value="highest">Price: high to Low</option>
            <option value="a-z">a-z</option>
            <option value="z-a">z-a</option>
          </select>
        </form>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .6rem 2rem;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0px 0px 2px 0px black;


  .sort-left {
    gap: 2rem;

    .view-type{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 4rem;
      width: 4rem;
      border: none;
      padding: 0;
    }
    .icon {
      height: 2.5rem;
      width: 2.5rem;
    }
    .active {
      background-color: ${({ theme }) => theme.colors.black};
      color: #fff;
    }
  }

  .sort-mid{
    display: flex;

    .hide{
      .icon{
        display: none;
        visibility: none;

      }
    }
    .mobile-view-filter{
      display: none;
      justify-content: center;
      width: 4.5rem;
      align-items: center;
      background-color: white;
      border: none;
    }
  }
  .no-tick{
    position: absolute;
    top: 1rem;
    left: 1rem;
  }
  .tick{
    z-index: 999;
  }
  
  
  .select-section {
    padding: 0.5rem;
    height: 4rem;
    width: 20rem;
    background-color: #efefef;
    border-radius: 30px;
    cursor: pointer;
    outline: none;
    border: none;
    option {
      padding: 5rem 0;
      cursor: pointer;
      height: 2rem;
      padding: 10px;
    }
  }

  .sort-right{
    display: flex;
    align-items: center;
    gap: 2rem;
    h3{
      font-weight: bold;
    }
  }




  
  @media (max-width: 1100px) {
    h3{
      font-size: 1.5rem;
    }
  }
  @media (max-width: 770px) {
    align-items: center;
    h3{
      font-size: 12px;
    }

  .sort-left {
    

    .view-type{
      height: 3rem;
      width: 3rem;
      padding: 0.5rem;
      border: none;
    }
  }
    
    .sort-mid{
      p{
        display: none;
      }
      .hide{
        background: white;
        border: none;
        display: inline-block;
        .icon {
          font-size: 3rem;
        }
      }
      .show{
        display: none;
      }
      .mobile-view-filter{
        display: flex;
      }
    }
  }
  
  @media (max-width: 500px) {
    
    .select-section {
      height: 3rem;
      width: 10rem;
    }
  }
  
  `;
  export default Sort
  