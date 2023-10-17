import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { PiSmileySadBold } from 'react-icons/pi'

const ErrorComponent = () => {
  return (
    <Wrapper className="container">
      <div>
        <PiSmileySadBold className="icon" />
        <h1>404</h1>
        <h3>OU OH! You're lost.</h3>
        <p>
          The page you are looking for does not exist. How you get here is a
          misetry. Click the button to go to home page.
        </p>
        <NavLink to={"/"}>
          <button className="btn">HOME</button>
        </NavLink>
      </div>
    </Wrapper>
  );
};
let Wrapper = styled.section`
  display: flex;
  align-items: center;
  text-align: center;
  /* margin-top: 10rem; */
  div{
    margin: 0 auto;
    width: 40%;
  }

  .icon{
    color: black;
    height: 8rem;
    width: 8rem;
  }
  h1 {
    margin: 1rem 0;
  }
  h3 {
    margin: 1rem 0;
    font-size: 3rem;
  }
  p {
    margin: 1rem 0;
    font-size: 2.2rem;
  }
  .btn {
    background-color: #5800ff;
    color: white;
    border: none;
    font-size: 1.8rem;
    padding: 0.8rem 3rem;
    margin: 1rem 0;
  }
`;

export default ErrorComponent;
