// import { setCurrentPage, isLoading, isError, updateFilteredProducts } from '../../Store/Slices/FilterAndPageSlice';

// import { useDispatch } from "react-redux";
import { isError, isLoading, updateFilteredProducts } from "../Slices/FilterAndPageSlice";



export const getFilteredProducts = (filters, gridView, pageNo, sortingType) => async (dispatch) => {
    console.log(dispatch);
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

    console.log(UPDATED_API);

    try{
      const res = await axios.get(UPDATED_API);
      const data = await res.data;
      dispatch(updateFilteredProducts(data)); 
    }
    catch(error){
      dispatch(isError());  
    }
  }