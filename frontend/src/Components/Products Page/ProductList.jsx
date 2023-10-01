import React, { useEffect } from 'react'
import GridView from './showingProducts/GridView'
import ListView from './showingProducts/ListView'
import axios from 'axios';
import Spinner from '../Utility Components/Spinner'
import ReactPaginate from 'react-paginate'
import { setCurrentPage, isLoading, isError, updateFilteredProducts } from '../../Store/Slices/FilterAndPageSlice'
import { useDispatch, useSelector } from 'react-redux'

const ProductList = () => {

  const dispatch = useDispatch();
  const filterAndPageData = useSelector(state => state.FilterAndPage);

  const { gridView, pageCount, limit, currentPage, filters, filteredProducts, isFilterProductsLoading, sortingType} = filterAndPageData;



  const getFilteredProducts = async (filters, gridView, pageNo, sortingType) => {
    dispatch(isLoading());

    const pageQuery = `gridView=${gridView}&page=${pageNo}&sort=${sortingType.sort}&type=${sortingType.type}`;
    let queries="";
    let UPDATED_API = "";


    if(filters){
        for(let [key, value] of Object.entries(filters)){
          
          if(value.length > 0){
            if(key === "color"){
              value = value.map((elem) => {
                  return elem.substring(1);
              })
            }
                queries += `${key}=${value.toString()}&`
            }
        }

        queries = queries.substring(0, queries.length-1)
        UPDATED_API = `/api/v1/products/productlist?${queries}&${pageQuery}`
    }
    else{
        UPDATED_API = `/api/v1/products/productlist?${pageQuery}`
    }

    try{
      const res = await axios.get(UPDATED_API);
      const data = await res.data;
      dispatch(updateFilteredProducts(data)); 
    }
    catch(error){
      dispatch(isError());  
    }
  }
  useEffect(() => {
    getFilteredProducts(filters, gridView, currentPage, sortingType);
    window.scrollTo({top: 0});
  }, [gridView, currentPage, filters, sortingType]);

  const handlePageClick = (e) => {
    dispatch(setCurrentPage(e.selected + 1))
  }

  
  return (
    <>

    {
      isFilterProductsLoading?
      <Spinner />
      :
        gridView? 
        <GridView filteredProducts={filteredProducts} />
        :
        <ListView filteredProducts={filteredProducts} />
      }
      


      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={limit}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </>
  )
}

export default ProductList;