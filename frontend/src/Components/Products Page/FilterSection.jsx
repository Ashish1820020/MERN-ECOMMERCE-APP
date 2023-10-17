import React from "react";
import styled from "styled-components";
import {
  setFilters,
  setPriceRange,
  clearFilters,
} from "../../Store/Slices/FilterAndPageSlice";
import { useDispatch, useSelector } from "react-redux";
import FormatPrice from "../helper/FormatPrice";
import { CgClose } from "react-icons/cg";

const FilterSection = ({ sidebar, setSidebar, state }) => {
  const dispatch = useDispatch();
  const { categories, companies, colors } = useSelector(
    (state) => state.filterType
  );
  const { filters } = useSelector((state) => state.FilterAndPage);

  return (
    <Wrapper>
      <div>
        <CgClose
          name="close-outline"
          className="icon"
          onClick={() => setSidebar(false)}
        />
      </div>
      <div className="filter-inside">
        <div className="search">
          <input
            type="search"
            name="search"
            value={filters?.search}
            placeholder="Search for products"
            onChange={(e) =>
              dispatch(
                setFilters({ name: e.target.name, value: e.target.value })
              )
            }
          />
        </div>

        {/* Category Section Filtering*/}
        <div className="section-category">
          <h3>Category: </h3>
          <div className="buttons">
            {categories.map((currElem, index) => {
              return (
                <button
                  key={index}
                  className="btn"
                  name="category"
                  value={currElem._id}
                  style={{
                    backgroundColor: filters.category.includes(currElem._id)
                      ? "black"
                      : "white",
                    color: filters.category.includes(currElem._id)
                      ? "white"
                      : "black",
                  }}
                  onClick={(e) =>
                    dispatch(
                      setFilters({ name: e.target.name, value: e.target.value })
                    )
                  }
                  type="button"
                >
                  {currElem.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Company Section Filtering*/}
        <div className="section-company">
          <h3>Company: </h3>

          <div className="buttons">
            {companies.map((currElem, index) => {
              return (
                <button
                  key={index}
                  className="btn"
                  name="company"
                  style={{
                    backgroundColor: filters.company.includes(currElem)
                      ? "black"
                      : "white",
                    color: filters.company.includes(currElem)
                      ? "white"
                      : "black",
                  }}
                  value={currElem}
                  onClick={(e) =>
                    dispatch(
                      setFilters({ name: e.target.name, value: e.target.value })
                    )
                  }
                  type="button"
                >
                  {currElem}
                </button>
              );
            })}
          </div>
        </div>

        {/* Color Section Filtering*/}
        <div className="section-color">
          <h3>Colors: </h3>
          <div className="colored-button-container">
            {colors.map((curColor, index) => {
              return (
                <div
                  key={index}
                  style={{
                    border: filters.color.includes(curColor)
                      ? " 3px solid black"
                      : "none",
                  }}
                  className="btn-container"
                >
                  <button
                    type="submit"
                    value={curColor}
                    name="color"
                    style={{ backgroundColor: `${curColor}` }}
                    className={index === 0 ? "btnStyle bt" : "btnStyle marg"}
                    onClick={(e) =>
                      dispatch(
                        setFilters({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      )
                    }
                  >
                    {curColor === "all" ? curColor : null}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Price Range Filtering */}
        <div className="section-price flex">
          <h3>Price</h3>
          <div className="slider flex">
            <p>
              <FormatPrice price={filters.price} />
            </p>
            <input
              type="range"
              name="price"
              min={filters.minPrice}
              max={filters.maxPrice}
              value={filters.price}
              step={5000}
              onChange={(e) => dispatch(setPriceRange(e.target.value))}
            />
          </div>
        </div>

        {/* Clear Filter Button */}
        <div className="section-clear-all">
          <button
            className="btn-clear"
            onClick={() => dispatch(clearFilters())}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  .filter-inside {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 80%;
    gap: 3rem;
  }
  .icon {
    float: right;
    height: 2.6rem;
    width: 2.6rem;
    position: absolute;
    top: -10rem;
  }

  h3 {
    margin: 2rem 0;
    font-weight: bold;
  }

  .search {
    width: 100%;
    input {
      width: 100%;
      color: rgba(40, 116, 240, 1);
    }
  }

  .section-category,
  .section-company {
    .buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      margin: 0.5rem 0;
      .btn {
        padding: 0.2rem 1rem;
        font-size: 1.6rem;
        border: 1px solid black;
        border-radius: 20px;
        text-transform: capitalize;
        transition: border 0.2s ease-out;
        &:hover {
          background-color: rgba(0, 0, 0, 255);
          color: white;
        }
      }
    }
  }

  .section-color {
    .colored-button-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.2rem;
      align-items: center;
      .btn-container {
        height: 4.1rem;
        width: 4.32rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        .btnStyle {
          height: 2.7rem;
          width: 2.92rem;
          margin: 0;
          padding: 0;
          border: none;
          cursor: pointer;
          color: black;
          border-radius: 50%;
          box-shadow: 0px 0px 2px 1px black;
          &:hover {
            opacity: 0.6;
          }
        }
      }
    }
  }

  .section-clear-all {
    .btn-clear {
      background-color: rgba(82, 95, 225);
      color: white;
      padding: 1rem 3rem;
      border: none;

      &:hover {
        background-color: rgba(82, 95, 225, 0.9);
      }
      &:active {
        color: #8eac50;
      }
    }
  }

  .section-price {
    flex-direction: column;
    gap: 0.8rem;
    .slider {
      gap: 0rem;
      flex-direction: column;
      input {
        margin: 0.2rem 0 1rem 0;
        padding: 0;
        box-shadow: none;
        cursor: pointer;
      }
    }
  }

  @media (max-width: 750px) {
    .filter-inside {
      width: 60%;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .hide {
      display: none;
      visibility: none;
    }
    .icon {
      position: static;
    }
    h3 {
      font-size: 1.5rem;
    }
  }
`;

export default FilterSection;
