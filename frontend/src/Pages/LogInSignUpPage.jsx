import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { BsPersonFill, BsPersonPlusFill} from 'react-icons/bs'

const LogInPage = () => {
  const [current, setCurrent] = useState("login");

  return (
    <Wrapper className='container'>
      <div className="wrapper-inside">

        <div className="login-top" >
          <NavLink to='/loginsignup/login' onClick={() => setCurrent("login")}>
            <div className={ current==="login"? 'button-container current' : 'button-container' }>
              <BsPersonFill className='icon'/>
              <p className="btn" >Log In</p>
            </div>
          </NavLink>

          <NavLink to='/loginsignup/signup' onClick={() => setCurrent("signup")}>
            <div className={ current==="login"? 'button-container' : 'button-container current' }>
              <BsPersonPlusFill className='icon'/>
              <p className="btn">Sign Up</p>
            </div>
          </NavLink>
        </div>

        <Outlet context={{ current, setCurrent}}/>
        
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  
  .wrapper-inside{
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0px 0px 2px 0px black;
    padding: 2rem;
    max-width: 50rem;
    min-width: 30rem;
  }

  .login-top{
    display: flex;
    gap: 1rem;
    /* width: 80%; */
    margin: 0 auto;

    .button-container{
      display: flex;
      align-items: center;
      padding: .4rem 2rem;
      border-radius: 3px;
      .icon{  
        height: 3rem;
        width: 3rem;
        color: rgba(40,116,240,255);
      }
      .btn{
        /* font-size: 16px; */
        font-weight: 600;
        color: rgba(40,116,240,255);
        border: none;
        width: 100%;
        padding: .8rem 1rem;
      }
    }


    .current{
      background-color: rgba(40,116,240,255);
      .icon{
        color: white;
      }
      .btn{
        background-color: rgba(40,116,240,255);
        color: white;
      }
    }
  }
`;

export default LogInPage;






/* .login-top{
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid black;
    .login-top-inside{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80%;
      .left, .right{
        width: 50%;
        a{
          width: 100%;
        }
      }
      .left{
        border-right: 2px solid black;
        padding-right: 2.5rem;
      }
      .right{
        padding-left: 2.5rem;
      }
      button{
        font-size: 35px;
        font-weight: 600;
        border: none;
        background: none;
        width: 100%;
        padding: 1.5rem 0;
      }
      .current{
        color: #4158d0;
      }
    }
    
  }


  .login-bottom{
    .login-bottom-inside{
      width: 80%;
      margin: auto;
      padding: 1rem 0 2rem 0;
    }
    form{
      display: flex;
      flex-direction: column;
      gap: .2rem;
      .text{
        display: flex;
        justify-content: space-between;
        padding: 0 .6rem 0 1rem;
        margin-bottom: 1.5rem;
        .text-check{
          display: flex;
          gap: 1rem;
          align-items: center;
          input{
            height: 1.5rem;
            width: 1.5rem;
          }
        }
        .text-forgot{
          display: inline-block;
          color: #8490ff;
        }
      }
      
      input, .btn{
        width: 100%;
        border-radius: 20px;
        font-size: 1.8rem;
        height: 5rem;
      }
      .btn{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 35px;
        font-weight: 600;
        color: #fff;
        background: linear-gradient(-135deg, #c850c0, #4158d0);
        height: 6rem;
        margin-top: 1rem;;
      }
    }
  } */