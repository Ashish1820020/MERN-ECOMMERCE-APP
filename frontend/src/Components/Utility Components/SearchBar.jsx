import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import axios from 'axios';
import { isError, isLoading, updateProductList } from '../../Store/Slices/ProductsSlice';
import { useDispatch, useSelector } from 'react-redux';

const SearchBar = ({searchText, setSearchText, setSuggestionBar, setIsResultLoading}) => {

   const dispatch = useDispatch();
   const { products } = useSelector(state => state.product);

    const searchBarApi = async () => {
        dispatch(isLoading());
        setIsResultLoading(true);
        
        try{
            const res = await axios.get(`${import.meta.env.VITE_ROOT_API}/products/searchresult?search=${searchText}`);
            const data = await res.data;
            dispatch(updateProductList(data.result)); 
            setIsResultLoading(false);
            // console.log(data);
        }
        catch(error){
            // console.log(error);
            dispatch(isError());  
        }
    }


    useEffect(() => {
        searchBarApi();
    }, [searchText]);



  return (
    <SearchBarWrapper onClick={() => setSuggestionBar(true)}>
        <input type="text" name="" value={searchText} placeholder='Search...' onChange={(e) => setSearchText(e.target.value)} />
        <BsSearch className='icon'/>
    </SearchBarWrapper>
  )
}

const SearchBarWrapper = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    input{
        width: 94%;
        min-width: 200px;
        max-width: 100%;
        /* height: 36px; */
        background-color: transparent;
        border: none;
        outline: none;
        box-shadow: 0 0 0 0 black;
    }
    /* button{
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        height: 100%;
        &:hover{
            background-color: rgba(255, 255, 255, .2);
        }
    } */
    .icon{
        cursor: pointer;
        background-color: transparent;
        height: 2.2rem;
        width: 2.2rem;
        color: #5e8cee;
        margin-right: 1rem;
    }
    
  @media (max-width: 800px) {
    background-color: #fbfdff;
  }
`;

export default SearchBar;
