import { useEffect } from "react";
import axios from 'axios'; 
import { isLoading, isError, updateFeaturedProducts, updateTopRatedProducts} from '../Store/Slices/ProductsSlice'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components';
import FeatureProducts from "../Components/Home Page Components/FeatureProducts";
import TopRatedProducts from "../Components/Home Page Components/TopRatedProducts";
import BannerSection from "../Components/Home Page Components/BannerSection";
import Services from "../Components/Home Page Components/Services";
import Trusted from "../Components/Home Page Components/Trusted";
import { useCookies } from "react-cookie";
import Spinner from "../Components/Utility Components/Spinner";


const localUserAccessToken = () => {
  let localUserData = localStorage.getItem("token");
  if (localUserData && localUserData.length !== 0 ) return JSON.parse(localUserData);
  else return "";
}

const Home = () => {
  
  const[cookie, setCookies] = useCookies(["token"]);
  const dispatch = useDispatch();

  
  const { isProductLoading } = useSelector(state => state.product); 


  // For the featured Products products
  const getFeaturedProducts = async () => {
    dispatch(isLoading());
    try{
      const res = await axios.get(`${import.meta.env.VITE_ROOT_API}/products/productlist?featured=true`);
      const data = await res.data;
      // console.log(data);
      dispatch(updateFeaturedProducts(data.result)); 
    }
    catch(error){
      // console.log(error);
      dispatch(isError()); 
    }
  }
  
  
  
  const getTopRatedProducts = async () => {
    dispatch(isLoading());
    
    await axios.get(`${import.meta.env.VITE_ROOT_API}/products/productlist?rating=4`)
    .then((res) => {
      const data = res.data;
      // console.log(data);
      
      dispatch(updateTopRatedProducts(data.result)); 
    })
    .catch((err) => {
      // console.log(err);
      dispatch(isError());
    })
  }
  
  useEffect(()=>{
    setCookies("token", localUserAccessToken());
    getFeaturedProducts();
    getTopRatedProducts()
  }, [])



  return (
    // className='container'
    <Wrapper >
      <BannerSection text='Anand Stores' />
      <Services />

      {
        isProductLoading? 
          <Spinner />
          :
          <div className="container">
            <FeatureProducts />
            <TopRatedProducts />
          </div>
      }

      <Trusted /> 
    </Wrapper>
  
  )
}

const Wrapper = styled.div`

`;



export default Home;
