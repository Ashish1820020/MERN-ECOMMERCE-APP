import { FaSpinner } from "react-icons/fa";
import styled from "styled-components";

const Spinner = () => {
  return (
    <Wrapper className="spinner-container">
      <FaSpinner className="icon" />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 20rem auto;
  gap: 5rem;
  .icon {
    height: 5rem;
    width: 5rem;
    animation: rotate 2s infinite;
    @keyframes rotate {
      100% {
        rotate: 360deg;
      }
    }
  }
`;

export default Spinner;
