import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 767, min: 250 },
    items: 1,
  },
};

const Slider = () => {
  const navigate = useNavigate();

  const banners = [
    {
      id: 1,
      name: "banner1.png",
      bannerHeader: "The best Watches collection sale",
      bannerText: "upto 40% off in selective products",
    },
    {
      id: 2,
      name: "banner2.png",
      bannerHeader: "The best Tablet collection",
      bannerText: "upto 20% off in selective products",
    },
    {
      id: 3,
      name: "banner3.png",
      bannerHeader: "The best Headphones collection",
      bannerText: "upto 60% off in selective products",
    },

    {
      id: 4,
      name: "banner4.png",
      bannerHeader: "The best Headphones collection",
      bannerText: "upto 60% off in selective products",
    },
  ];

  return (
    <Wrapper className="parent">
      <Carousel
        responsive={responsive}
        autoPlay={true}
        arrows={false}
        swipeable={true}
        draggable={true}
        infinite={true}
        partialVisible={false}
        autoPlaySpeed={3000}
        containerClass="carousel-container"
        itemClass="carousel-item"
      >
        {banners.map((banner) => {
          return (
            <div className="slider" key={banner.id}>
              <div className="slider-content">
                <div className="row">
                  <div className="col">
                    <div className="slider-text-info  slider-content-left  slider-text-left">
                      <span
                        style={{ color: " #6f6f6f" }}
                        className="subtitle e1"
                      >
                        Get 35% off new tablet
                      </span>
                      <h2 style={{ color: "#232f3e" }} className="title e1">
                        Best tablet smart pad
                      </h2>
                      <button
                        className="slider-btn btn btn-style e1"
                        onClick={() => navigate("/products")}
                      >
                        <NavLink>Shop now</NavLink>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <img src={`/images/${banner.name}`} alt={`banner${banner.id}`} />
            </div>
          );
        })}
      </Carousel>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;

  .carousel-container {
    height: 100%;
    background-color: transparent;
    box-shadow: none;

    .react-multi-carousel-track {
      height: 100%;

      .carousel-item {
        height: 100%;
        background-color: transparent;

        .slider {
          height: 100%;
          img {
            height: auto;
            max-width: 100%;
            display: block;
            max-height: 800px;
          }
        }
      }
    }
  }

  .slider-content {
    position: absolute;
    top: 30%;
    left: 16%;
    span {
      font-size: 18px;
      margin-bottom: 15px;
    }
    h2 {
      width: 60%;
      font-family: "Open Sans", sans-serif;
      font-size: 85px;
      font-weight: 700;
      line-height: 1.1;
    }
    button {
      border: none;
      outline: none;
      box-shadow: 0 0px 2px 0px rgba(0, 0, 0, 0.5);
      margin-top: 1rem;
      padding: 1rem 4rem;
      transition: all 0.3s ease-in-out;
      a {
        color: red;
        text-transform: uppercase;
      }
      &:hover {
        background-color: #ec4040;
        a {
          color: white;
        }
      }
    }
  }

  @media (max-width: 1250px) {
    .slider-content {
      top: 20%;
      left: 14%;
      h2 {
        font-size: 65px;
      }
    }
  }
  @media (max-width: 900px) {
    .slider-content {
      top: 16%;
      left: 12%;
      h2 {
        font-size: 40px;
      }
      button {
        padding: 0.6rem 3rem;
      }
    }
  }
  @media (max-width: 544px) {
    .slider-content {
      top: 16%;
      left: 12%;
      span {
        font-size: 14px;
        margin-bottom: 15px;
      }
      h2 {
        font-size: 30px;
      }
      button {
        padding: 0.3rem 2.4rem;
      }
    }
  }
  @media (max-width: 380px) {
    .slider-content {
      top: 16%;
      left: 12%;
      span {
        font-size: 10px;
        margin-bottom: 15px;
      }
      h2 {
        font-size: 20px;
      }
      button {
        padding: 0.2rem 0.8rem;
      }
    }
  }
`;
export default Slider;
