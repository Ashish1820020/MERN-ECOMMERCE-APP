import React from "react";
import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1301 },
    items: 5,
    partialVisibilityGutter: 40,
  },
  largeLaptop: {
    breakpoint: { max: 1300, min: 1025 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 750 },
    items: 3,
    partialVisibilityGutter: 30,
  },
  largeMobile: {
    breakpoint: { max: 749, min: 460 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

const ProductSlider = ({ featureProducts, text }) => {
  return (
    <Wrapper className="carousel-slider">
      <h3>{text}</h3>
      <Carousel
        // partialVisible={true}
        autoPlay={true}
        responsive={responsive}
        swipeable={true}
        draggable={true}
        ssr={true}
        infinite={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        transitionDuration={1000}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        {featureProducts.map((currentElem) => {
          return (
            <ProductCard
              key={currentElem._id}
              {...{ ...currentElem, image: currentElem.images[0] }}
            />
          );
        })}
      </Carousel>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin: 5rem 0;

  h3 {
    text-align: center;
    font-weight: 800;
    font-size: 3rem;
    margin-bottom: 3rem;
  }

  @media (max-width: 410px) {
    h3 {
      font-size: 2rem;
      font-weight: 700;
    }
  }
`;

export default ProductSlider;
