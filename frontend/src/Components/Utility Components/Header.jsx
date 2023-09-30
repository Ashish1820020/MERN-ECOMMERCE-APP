import React, {useEffect, useRef, useState} from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import SearchSuggestions from './SearchSuggestions';




const Header = () => {
  const [icon, setIcon] = useState();
  const [suggestionBar, setSuggestionBar] = useState(false);
  const [searchBarActive, setSearchBarActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isResultLoading, setIsResultLoading] = useState(false);
  const location = useLocation();


  const { products } = useSelector(state => state.product);
  const refOne = useRef(null)


  const handleOutsideClick = (e) => {
    if(refOne && !refOne?.current?.contains(e.target)){
      setSuggestionBar(false);
      // dispatch(clearProductList());
    }
  }
  
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
  },[]);

  
  return (
    <MainHeader>
      <div className="header-inside-section">


        <div className="header-left-section">
          <NavLink to='/'> <img className='logo' src="../../images/logos.png" alt="logo"/> </NavLink>
        </div>


        {
          location.pathname.includes('/password/reset')?
            <></>
          :
            <>
              <div className={searchBarActive? "search-bar show" : "search-bar hide"} ref={refOne}>
                <SearchBar {...{searchText, setSearchText, setSuggestionBar, setIsResultLoading}} />
                {
                suggestionBar?
                  <SearchSuggestions {...{ products, searchText, isResultLoading, setSuggestionBar }} />
                :
                  null
                }
              </div>
      
              <Navbar {...{icon, setIcon, searchBarActive, setSearchBarActive}}/>
            </>
        }


      </div>
    </MainHeader>
  )
}

const MainHeader = styled.header`
  position: fixed;
  z-index: 100;
  top: 0rem;
  background-color: rgba(40,116,240,1);
  padding: 1rem 0;
  width: 100%;
  height: 65px;

  .header-inside-section{
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
    color: white;
    max-width: 1880px;
    width: 90dvw;
    margin: 0 auto;
    height: 3.6rem;
  }

  .header-left-section{  
    display: flex;
    justify-content: space-between;
    a{
      width: 90px;
      height: 3.6rem;
      .logo {
        width: 100%;
        height: 3.6rem;
      }
    }
    input{
      height: 4.1rem;
      padding: 2rem;
      width: 80%;
      outline: none;
      border: none;
      border-radius: 5px;
    }
  }

  .search-bar{
    width: 40%;
    min-width: 100px;
    height: 36px;
    max-width: 500px;
  }

  
  
  .result-show{
    display: block;
    visibility: visible;
    z-index: 1;
  }


  
  @media (max-width: 1100px) {
    .search-bar{
      width: 32%;
    }
    .header-inside-section{
      width: 96%;
    }
    p{
      font-size: 12px;
    }
  }


  @media (max-width: 800px) {
    .header-inside-section{
      width: 90%;
    }
    
    .search-bar{
      position: absolute;
      width: 100vw;
      max-width: 100vw;
      height: 50px;
      box-shadow: 0 0 2px 0px black;
    }
    .hide{
      top: -100rem;
    }
    .show{
      top: 65px;
      left: 0;
    }
  }
  @media (max-width: 600px) {
    .header-inside-section{
      width: 90%;
    }
  }

  @media (max-width: 400px) {
    .header-inside-section{
      width: 94%;
    }
  }
`;

export default Header;
