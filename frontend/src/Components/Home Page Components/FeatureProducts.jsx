import React from 'react'
import { useSelector} from 'react-redux'
import ProductSlider from '../Utility Components/ProductSlider';


const FeatureProducts = () => {
  const { isLoading, featureProducts } = useSelector(state => state.product);

  if(isLoading) return <div>.........Loading</div>
  else return <ProductSlider text="FEATURED PRODUCTS" featureProducts={featureProducts}/>
}



export default FeatureProducts;