import React from 'react'
import styled from 'styled-components'
// import "./aboutSection.css";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
const About = () => {
  const visitLinkedin = () => {
    window.location = "https://www.linkedin.com/in/ashish-bhattacharyya-574172204/";
  };


  return (
    <Wrapper className="aboutSection">
      <div className="aboutSectionContainer">
        <h1 component="h1">About Us</h1>

        <img
              src="https://res.cloudinary.com/muttakinhasib/image/upload/v1611336104/avatar/user_qcrqny.svg"
              alt="Founder"
            />

        <div>
          <div>
          
            <h2>Ashish Bhattacharyya</h2>
            <button onClick={visitLinkedin} color="primary">
              Visit Linkedin
            </button>
            <span>
              This is a sample website made by Ashish Bhattacharyya with MERN stack Only for learning purposes.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <h2>Our Brands</h2>
            <div>
              <a href="https://github.com/Ashish1820020" target="blank">
                <FaGithubSquare className="githubSvgIcon" />
              </a>

              <a href="https://www.linkedin.com/in/ashish-bhattacharyya-574172204/" target="blank">
                <FaLinkedin className="linkedinSvgIcon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

let Wrapper = styled.section`
  max-width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5rem auto;
  margin-top: 10rem;

.aboutSectionContainer {
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 2px 10px 10px rgba(0, 0, 0, 0.192);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.aboutSectionContainer > h1 {
  color: tomato;
  margin: 2vmax;
  border-bottom: 1px solid red;
}

button{
  border: none;
}

img{
  border-radius: 50%;
  width: 10vmax;
  height: 10vmax;
  margin: 2vmax 0;
}

.aboutSectionContainer > div {
  display: flex;
  width: 100%;
}

.aboutSectionContainer > div > div {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vmax;
  box-sizing: border-box;
}

.aboutSectionContainer > div > div > p {
  color: rgba(0, 0, 0, 0.623);
}

.aboutSectionContainer > div > div > button {
  margin: 1vmax 0;
}

.aboutSectionContainer > div > div > span {
  font: 100 1vmax "Roboto";
  color: rgba(0, 0, 0, 0.616);
  text-align: center;
  width: 80%;
}

.aboutSectionContainer2 {
  border-left: 1px solid rgba(0, 0, 0, 0.116);
}

.aboutSectionContainer2 > h2 {
  color: rgba(0, 0, 0, 0.623);
  margin: 2vmax;
}

.aboutSectionContainer2 > div > a > svg {
  font-size: 3vmax;
}

.aboutSectionContainer2 > div{
  gap: 2rem;
  display: flex;
}

.githubSvgIcon {
  color: black;
}

.linkedinSvgIcon {
  background-color: white(255, 255, 255);
  color: #136cc4;
}

@media screen and (max-width: 600px) {
  .aboutSectionContainer > div {
    display: block;
  }

  .aboutSectionContainer > h1 {
    margin: 3vmax;
  }

  .aboutSectionContainer > div > div > span {
    width: 70%;
  }

  .aboutSectionContainer2 {
    border-left: none;
  }

  .aboutSectionContainer2 > h2 {
    margin: 2vmax;
  }

  .aboutSectionContainer2 > a > svg {
    font-size: 6vmax;
    margin: 1vmax;
  }
}
`;

export default About;
