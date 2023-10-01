import React from "react";
import styled from "styled-components";
import Spinner from "./Spinner";
import { NavLink } from "react-router-dom";
import FormatPrice from "../helper/FormatPrice";

const SearchSuggestions = ({
  products,
  searchText,
  isResultLoading,
  setSuggestionBar,
}) => {
  if (searchText.length === 0) {
    return (
      <Suggestions>
        <p className="initial-text">Enter name to search product</p>
      </Suggestions>
    );
  }

  if (isResultLoading) {
    return (
      <Suggestions>
        <section>
          <Spinner />
        </section>
      </Suggestions>
    );
  }

  if (products && products.length === 0) {
    return (
      <Suggestions>
        <div>
          <p className="initial-text">No Search result found</p>
        </div>
      </Suggestions>
    );
  }

  return (
    <Suggestions>
      <div className="search-result-container">
        {products &&
          products.map((product) => {
            return (
              <NavLink to={`/singleproduct/${product._id}`} key={product._id}>
                <div
                  className="search-result-card"
                  onClick={() => setSuggestionBar(false)}
                >
                  <img src={product.images[0]} alt="" />
                  <p>{product.name}</p>
                  <p className="price">
                    <FormatPrice price={product.discountedPrice} />
                  </p>
                </div>
              </NavLink>
            );
          })}
      </div>
    </Suggestions>
  );
};

const Suggestions = styled.div`
  background-color: white;

  
  /* Initial Text & Search Result don't exist */
  .initial-text {
    text-align: center;
    color: rgba(40, 116, 240, 1);
    padding: 1rem 0rem;
    box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.6);
  }


  /* Search Result Exists */
  .search-result-container {
    overflow-y: scroll;
    box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.6);
    max-height: 32rem;
    background-color: white;
  }

  .search-result-card {
    display: flex;
    justify-content: space-between;
    background-color: white;
    padding: 1rem 2rem;
    max-height: 60px;

    &:hover {
      background-color: #c8c0c0;
    }

    img {
      width: 10%;
      height: 3rem;
      object-fit: contain;
      margin-right: 1rem;
    }

    p {
      width: 70%;
      margin-right: 1rem;
    }

    .price {
      width: 20%;
      text-align: right;
      margin-right: 0;
    }
  }

  section {
    box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.6);
    .container {
      margin: 0;
      .icon {
        color: black;
      }
    }
  }

  ::-webkit-scrollbar-track {
    background: rgba(40, 116, 240, 0.5);
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(40, 116, 240, 1);
    border-radius: 20px;
  }
`;

export default SearchSuggestions;
