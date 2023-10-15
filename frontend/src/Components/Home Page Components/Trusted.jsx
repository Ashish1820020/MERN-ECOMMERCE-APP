import styled from "styled-components";

const Trusted = () => {
  const images = [
    'https://res.cloudinary.com/dz9ezveb9/image/upload/v1697300455/image2_xakryf.png',
    'https://res.cloudinary.com/dz9ezveb9/image/upload/v1697300455/image3_lalvlt.png',
    'https://res.cloudinary.com/dz9ezveb9/image/upload/v1697300455/image4_iepnxe.png',
    'https://res.cloudinary.com/dz9ezveb9/image/upload/v1697300455/image6_clzjg8.png',
    'https://res.cloudinary.com/dz9ezveb9/image/upload/v1697300455/image8_i8tsfr.png'
  ]
  return (
    <Wrapper className="container brand-section">
      <div >
        <h3>Trusted By 1000+ Companies</h3>
        <div className="brand-section-slider">
          {/* my 1st img  */}
          {
            images.map((image, index) => {
              return (
                <div className="slide" key={index}>
                  <img
                    src={image}
                    alt="trusted-brands"
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  border-radius: 1rem;
  padding: 9rem 4rem;
  background-color: ${({ theme }) => theme.colors.bg};
  min-height: 30vh !important;
  h3 {
    text-align: center;
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.text};
    font-size: 2rem;
    font-weight: bold;
  }
  img {
    min-width: 10rem;
    height: 10rem;
  }
  .brand-section-slider {
    margin-top: 3.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    &:hover{
      cursor: pointer;
    }
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .brand-section-slider {
      margin-top: 3.2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      text-align: center;
    }
  }
`;

export default Trusted;