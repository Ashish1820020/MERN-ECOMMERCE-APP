import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import UserMenu from "../../User Dashboard Components/UserMenu";
import { CgMenu } from "react-icons/cg";

const UserDashboard = () => {

  const refOne = useRef(null);
  const [sidebar, setSidebar] = useState(false);

  const handleOutsideClick = (e) => {
    if(refOne && !refOne?.current?.contains(e.target)){
      setSidebar(false);
    }
  }
  
  
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
  }, [])

  return (
    <Wrapper className="wrapper container">


      <div className="header">
        <div className="mobile-navbar-btn">
          <CgMenu className='icon' onClick={()=>setSidebar(!sidebar)}/>
        </div>
        <h1>User</h1>
      </div>


      <div className="main-content-section">
        <div  ref={refOne} className={sidebar? "left active" : "left"}>
          <UserMenu {...{sidebar, setSidebar}}/>
        </div>

        <div className="right">
          <Outlet />
        </div>
      </div>


    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  /* width: 75%; */
  margin: 0 auto;
  margin-top: 4rem;



  /* Header Section */
  .header{
    display: flex;
    align-items: center;
  }

  .mobile-navbar-btn{
    position: absolute;
    top: -100rem;
    left: -100rem;
    z-index: 0;
    opacity: 0;
    visibility: hidden;
  }

  .icon{
    height: 2.2rem;
    width: 2.2rem;
  }
  .icon-container{
    .icon{
      box-shadow: 0px 1px 0px 1px #ccc;
    } 
  }

  h1 {
    margin: 0 auto;
    border-bottom: 1px solid black;
  }





/* Left side */

.left{
  width: 22%;
  border: 1px solid black;
  background-color: white;
}

.left-inside{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.list{
  width: 100%;
  display: flex;
  flex-direction: column;
}

.list-item{
  padding: 1rem 0;
  text-align: center;
  font-size: 2rem;
  font-weight: bolder;
  color: black;
  box-shadow: 0 0 2px 2px #ccc;
  &:hover{
    color: white;
    background-color: #b0b0f6;
  }
}


/* Right Section */

.right{
  width: 70%;
}
.main-content-section{
  width: 100%;
  display: flex;
  gap: 5rem;
  padding: 2rem;
  align-items: flex-start;
}

.hide{
  position: absolute;
  top: -100rem;
  left: -100rem;
  z-index: 0;
}



  
@media (max-width: 800px) {
  
  .mobile-navbar-btn{
    position: static;
    z-index: 100;
    opacity: 1;
    visibility: visible;
  }
  
  .left{
    position: absolute;
    top: -100rem;
    z-index: 10000;
    width: 30dvw;
    border: none;
    .list-item{
      box-shadow: 0 1px 0px 1px #ccc;
    }
  }
  .active{
    top: 65px;
    left: 0rem;
    visibility: visible;
    opacity: 1;
    width: 100%;
  }


  .main-content-section{
    .right{
      width: 100dvw;
      margin: 0 auto;
    }
  }
}
@media (max-width: 762px) {
  .main-content-section{
    .right{
      width: 100%;
    }
  }
}
@media (max-width: 402px) {
  width: 98%;
  margin-top: 2rem;
  .header{
    padding: 0 1rem;
  }
}

`;
export default UserDashboard;
