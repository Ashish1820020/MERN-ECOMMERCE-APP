import React from 'react'
import styled from 'styled-components';
import { TbLockCheck } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';

const Done = () => {

  return (
    <Wrapper className='bottom-inside'>
        <div className="heading">
        <TbLockCheck className='icon'/><h2>Well Done!</h2>
        </div>
        <p> Awesome you are successfully updated your password. Please use your new password to login.</p>
        <NavLink to={'/loginsignup'}><button className='login'>Login</button></NavLink>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;  
  max-width: 50rem;
  min-width: 30rem;
  margin: 10rem auto 18rem auto;
  padding: 2rem;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0px 0px 2px 0px black;
  .heading{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 60%;
    margin: 0 auto;
  }
  .icon{
    height: 10rem;
    width: 10rem;
    color: #31cf66;
  }
    
  h2{
    font-size: 3rem;
    padding: 1rem 0;
  }

  p{
    width: 90%;
    margin: 0rem auto;
    font-size: 1.8rem;
    text-align: center;
  }
  a{
    width: 100%;
  }
  .login{
    background-color: #31cf66;
    color: white;
    font-size: 2rem;
    font-weight: 900;
    border: none;
    width: 100%;
    padding: 1rem 0rem;
  }

  
`;

export default Done;

