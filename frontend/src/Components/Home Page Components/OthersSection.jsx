import React from 'react'
import { useSelector} from 'react-redux'
import ProductSlider from '../Utility Components/ProductSlider';


const OthersSection = () => {
    const { isLoading, products } = useSelector(state => state.product);

    const othersArray = products.filter((currElem) => {
      return currElem.category === ( "64f04d2d23463d4058758238" || "64f04d2423463d4058758235 ") || currElem.category === "64b8a5ce3b7b35925d79add5";
    });
    
    
    if(isLoading) return <div>.........Loading</div>
    else return <ProductSlider featureProducts={othersArray}/>
}

export default OthersSection;
