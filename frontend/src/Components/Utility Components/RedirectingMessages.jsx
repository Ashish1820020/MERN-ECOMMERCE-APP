import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const RedirectingMessages = ({ path = "/" }) => {
  const [time, setTime] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => --prev);
    }, 1000);

    if (time === 0)
      navigate(`/`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [time, navigate, location, path]);

  return (
    <Wrapper>
      <h2>Redirection in {time} seconds</h2>
      <Spinner />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20rem auto;
  gap: 5rem;

  h2 {
    font-size: 30px;
  }
`;

export default RedirectingMessages;
