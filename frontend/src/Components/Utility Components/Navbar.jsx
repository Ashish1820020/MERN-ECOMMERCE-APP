import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { CgMenu, CgClose } from "react-icons/cg";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import { clearCart } from "../../Store/Slices/CartSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { removeUserData } from "../../Store/Slices/AuthSlice";
import DropDown from "./DropDown";
import { clearWishlist } from "../../Store/Slices/WishlistSlice";
import { BsSearch } from "react-icons/bs";

const Navbar = ({ icon, setIcon, searchBarActive, setSearchBarActive }) => {
  const [, setCookies] = useCookies(["token"]);
  const { cartProducts, totalItems } = useSelector((state) => state.cart);
  const { userData, isLoggedIn } = useSelector((state) => state.auth);
  const wishlist = useSelector((state) => state.wishlist);
  const [avatar, setAvatar] = useState("");
  const dashboardType = userData?.role === 1 ? "admin" : "user";
  const dispatch = useDispatch();
  const [dropdown, setDropDown] = useState(false);
  const navigate = useNavigate();

  // LOGOUT FROM THE SITE
  const handelLogOut = async (prodMsg) => {
    await axios
      .patch(`/api/v1/auth/logout`)
      .then(async (res) => {
        toast.success(`${res.data.msg} and ${prodMsg}`);
        setCookies("token", "");
        localStorage.clear("userData");
        localStorage.clear("token");
      })
      .catch((err) => {
        toast.error(err.response?.data.msg);
      });

    dispatch(removeUserData());
    setDropDown(false);
  };

  // UPDATE CART DATA TO DB
  const updateCartDataToDb = async () => {
    await axios
      .patch(`/api/v1/user/updateproduct`, {
        cartProducts,
        wishlistProducts: wishlist.wishlistProducts,
      })
      .then(async (res) => {
        await handelLogOut(res.data.msg);
        localStorage.removeItem("cartProducts");
        localStorage.removeItem("wishlistProducts");
        dispatch(clearCart());
        dispatch(clearWishlist());
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response?.data.msg);
      });
  };

  useEffect(() => {
    if (isLoggedIn && userData.avatar) {
      setAvatar(userData.avatar);
    } else {
      setAvatar(
        "https://res.cloudinary.com/muttakinhasib/image/upload/v1611336104/avatar/user_qcrqny.svg"
      );
    }
  });

  return (
    <Nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-list-item hide">
          <NavLink to="/" onClick={() => setIcon(false)}>
            HOME
          </NavLink>
        </li>
        <li className="navbar-list-item hide">
          <NavLink to="/products" onClick={
            () =>{
                setIcon(false)
                // dispatch(clearFilters()) 
              }
            }>
            PRODUCTS
          </NavLink>
        </li>

        <li
          className="navbar-list-item mobile-search-icon"
          onClick={() => setSearchBarActive(!searchBarActive)}
        >
          {searchBarActive ? (
            <CgClose style={{ fontSize: "2.5rem" }} />
          ) : (
            <BsSearch style={{ fontSize: "2rem" }} />
          )}
        </li>

        <li className="navbar-list-item" onClick={() => navigate(isLoggedIn? "/wishlist" : "/loginsignup/login", {state: location.pathname})}>
          <div className="cart-wishlist-icon-container">
            <AiOutlineHeart className="cart-wishlist-icon" />
            <span className="cart-wishlist-icon-float">
              {wishlist.totalItems}
            </span>
          </div>
        </li>

        {isLoggedIn ? (
          <li
            className="profile-image-container navbar-list-item"
            onMouseEnter={() => setDropDown(true)}
            onMouseLeave={() => setDropDown(false)}
            onClick={() => setDropDown(!dropdown)}
          >
            <figure className="img navbar-link">
              <img src={avatar} alt="user" />
            </figure>
            <DropDown
              {...{
                setDropDown,
                updateCartDataToDb,
                dropdown,
                dashboardType,
                userData,
              }}
            />
          </li>
        ) : (
          <li className="navbar-list-item">
            <NavLink to="/loginsignup" onClick={() => setIcon(false)}>
              LOG IN
            </NavLink>
          </li>
        )}

        <li className="navbar-list-item hide">
          <NavLink className="cart-wishlist-icon-container" to="/cart">
            <FiShoppingCart className="cart-wishlist-icon" />
            <span className="cart-wishlist-icon-float">{totalItems}</span>
          </NavLink>
        </li>
      </ul>

      <div
        className={
          icon
            ? "mobile-navbar-list mobile-navlist-active"
            : "mobile-navbar-list"
        }
      >
        <div>
          <CgClose
            name="close-outline"
            className="icon"
            onClick={() => setIcon(false)}
          />
        </div>
        <div>
          <ul>
            <li className="navbar-list-item">
              <NavLink to="/" onClick={() => setIcon(false)}>
                HOME
              </NavLink>
            </li>
            <li className="navbar-list-item">
              <NavLink to="/products" onClick={() => setIcon(false)}>
                PRODUCTS
              </NavLink>
            </li>
            <li className="navbar-list-item">
              <NavLink to="/about" onClick={() => setIcon(false)}>
                ABOUT
              </NavLink>
            </li>
            <li className="navbar-list-item">
              <NavLink to="/contact" onClick={() => setIcon(false)}>
                CONTACT
              </NavLink>
            </li>
            <li className="navbar-list-item">
              <NavLink to="/cart" onClick={() => setIcon(false)}>
                CART
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="mobile-navbar-btn">
        <CgMenu
          name="menu-outline"
          className="mobile-nav-icon"
          onClick={() => setIcon(!icon)}
        />
      </div>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  align-items: center;

  /* Normal Navbar */

  .navbar-list {
    margin-right: 2rem;
    display: flex;
    align-items: center;
    gap: 2.8rem; //4.8
    .navbar-list-item:first-child,
    .navbar-list-item:nth-child(2),
    .navbar-list-item:nth-child(2) {
      border-bottom: 3px solid rgba(40, 116, 240, 255);
      &:hover {
        border-bottom: 3px solid white;
      }
    }
  }
  .navbar-list-item {
    margin: 0rem 1rem;
  }

  .navbar-list-item:has(figure) {
    border-bottom: none;
  }
  .navbar-list-item > a {
    &:link,
    &:visited {
      display: inline-block;
      text-decoration: none;
      font-size: 1.4rem;
      font-weight: 600;
      text-transform: uppercase;
      color: white;
      transition: color 0.3s linear;
    }
  }

  .profile-image-container {
  }
  .profile-image-container {
    margin-bottom: 1rem;
    border: none;
    position: relative;
    &:hover {
      border: none;
    }
    .img {
      width: 3rem;
    }
  }

  .cart-wishlist-icon-container {
    position: relative;
    top: 0;
    height: 26px;
    .cart-wishlist-icon {
      margin: 0;
      position: relative;
      font-size: 2.4rem;
    }
    .cart-wishlist-icon-float {
      width: 2rem;
      height: 2rem;
      font-size: 1.2rem;
      font-weight: bold;
      position: absolute;
      background-color: #000;
      color: #000;
      border-radius: 50%;
      display: grid;
      place-items: center;
      top: -20%;
      left: 64%;
      background-color: ${({ theme }) => theme.colors.helper};
    }
  }

  figure {
    height: 100%;
    border-radius: 50%;
    img {
      height: 3.2rem;
      width: 3.2rem;
      border-radius: 50%;
    }
  }

  /* Activating Dropdown Menu */
  .dropdown-active {
    visibility: visible;
    display: inline-block;
    top: 3rem;
  }

  /* Mobile navbar button section */
  .mobile-nav-icon {
    display: none;
  }
  .close-outline {
    display: none;
  }

  /* Mobile navbar */
  .mobile-navbar-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: -100rem;
    left: -100rem;
    z-index: 10000;
    background-color: #fff;
    .navbar-list-item > a {
      color: black;
      font-size: 1.6rem;
    }
  }

  .mobile-navbar-list > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: 6%;
    width: 100%;
    /* border: 1px solid black; */
    .icon {
      padding-top: 1rem;
      padding-right: 1rem;
      color: black;
      height: 4rem;
      width: 4rem;
      visibility: visible !important;
    }
  }
  .mobile-navbar-list > div:last-child {
    height: 86%;
    width: 100%;
    ul {
      width: 40%;
      text-align: center;
      margin: 2rem auto;
      .navbar-list-item {
        padding: 3rem 2rem;
        height: 34px;
        a {
          border-bottom: 2px solid white;
          &:hover {
            border-bottom: 2px solid black;
          }
        }
      }
    }
  }

  .mobile-search-icon {
    position: absolute;
    top: -100rem;
    height: 26px;
    display: none;
    visibility: hidden;
  }

  
  @media (max-width: 1050px) {
    .navbar-list {
      gap: 1.6rem;
    }
  }
  @media (max-width: 800px) {
    
    .navbar-list > .hide {
      position: absolute;
      top: -100rem;
      visibility: hidden;
      opacity: 0;
    }

    .mobile-navlist-active {
      position: fixed;
      top: 0rem;
      left: 0rem;
      height: 100%;
      width: 100%;
      visibility: visible;
      opacity: 1;
      z-index: 2;
    }

    .mobile-navbar-btn {
      position: static;
      display: inline-block;
      z-index: 1;
      visibility: visible;
      opacity: 1;
      border: ${({ theme }) => theme.colors.black};
      .mobile-nav-icon {
        font-size: 3.2rem;
        color: white;
        display: inline-block;
      }
    }

    .mobile-search-icon {
      position: static;
      top: 0;
      display: block;
      visibility: visible;
    }
  }

  
  @media (max-width: 500px) {
    .navbar-list {
      gap: 0.6rem;
      margin-right: 1rem;
    }
    .mobile-navbar-btn .mobile-nav-icon {
      font-size: 2.6rem;
    }
  }
`;

export default Navbar;
