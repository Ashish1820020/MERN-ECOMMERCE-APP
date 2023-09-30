import React from 'react'
import { useSelector} from 'react-redux'
import ProductSlider from '../Utility Components/ProductSlider';


const TopRatedProducts = () => {
  const { isLoading, topRatedProducts } = useSelector(state => state.product);

  if(isLoading) return <div>.........Loading</div>
  else return <ProductSlider text="TOP RATED PRODUCTS" featureProducts={topRatedProducts}/>
}



export default TopRatedProducts;