import React from "react";
import styled from "styled-components";
import { FaDiscord, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { MdOutlineLocationOn } from "react-icons/md";
import { Button } from "../../styles/Button";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <Wrapper>
      <footer>
        <div className="footer-main">
          <div className="footer-left">
            <figure>
              <img src="../../images/logos.png" alt="" />
            </figure>
            <p>Anand Stores Quality is Superior to price</p>
            <ul>
              <li>
                <FaDiscord className="icon" />
              </li>
              <li>
                <FaInstagram className="icon" />
              </li>
              <li>
                <FaYoutube className="icon" />
              </li>
            </ul>
          </div>

          <div className="footer-mid">
            <h2>Pages</h2>
            <ul>
              <li>
                <NavLink className="navbar-link" to="/about">
                  ABOUT
                </NavLink>
              </li>
              <li>
                <NavLink className="navbar-link" to="/contact">
                  CONTACT
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="footer-right">
            <h2>Talk To Us</h2>
            <p>Got Questions? Call us</p>
            <h3>+123 456 7890</h3>
            <ul>
              <li>
                <FiMail className="icon" />
                <span>ashish@support.com</span>
              </li>
              <li>
                <MdOutlineLocationOn className="icon" />
                <span>Bardhaman, West Bengal 713101</span>
              </li>
            </ul>
          </div>
        </div>

        <hr />
        <div className="footer-bottom">
          <p>
            @{new Date().getFullYear()} Anand group of companies. All Rights
            Reserved
          </p>
          <div>
            <p>PRIVACY POLICY</p>
            <p>TERMS & CONDITIONS</p>
          </div>
        </div>
      </footer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  border: 1px solid black;
  background-color: #0a1435;

  p,
  a,
  h2,
  span,
  h3,
  ul {
    font-family: "Work Sans", sans-serif;
    color: white;
  }
  h2 {
    margin-bottom: 0;
    font-size: 2.2rem;
    font-weight: 800;
  }
  h3 {
    font-size: 1.8rem;
    font-weight: 700;
  }
  p {
    font-size: 1.6rem;
  }

  footer {
    padding: 8rem 0 2rem 0;
  }

  li > a {
    font-size: 1.6rem;
  }

  .footer-main {
    display: flex;
    justify-content: space-between;
    width: 60%;
    margin: 0 auto;
  }

  hr {
    margin: 3rem 0;
  }

  .footer-bottom {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .footer-left {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 40%;
    figure {
      width: 50%;
      img {
        width: 14rem;
      }
    }
    p {
      width: 66%;
    }

    ul {
      display: flex;
      .icon {
        position: relative;
        font-size: 2.4rem;
        margin-right: 0.6rem;
        padding: 0.5rem;
        box-shadow: 0 0 1px 1.5px #ffffff;
        color: white;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }

  .footer-mid {
    display: flex;
    flex-direction: column;
    width: 26%;
    h2 {
      margin-bottom: 0;
    }
    ul {
      display: flex;
      flex-direction: column;
      margin-top: 1rem;
      li {
        margin-left: 2rem;
        list-style: circle;
        margin-top: 0.5rem;
        &:hover {
          text-decoration: underline;
        }
      }
      li::marker {
        color: white;
      }
    }
  }

  .footer-right {
    width: 40%;
    p {
      margin-top: 1rem;
    }
    ul {
      margin-top: 1rem;
    }
    li {
      display: flex;
      align-items: flex-start;
      margin-top: 1rem;
      gap: 1rem;
      .icon {
        height: 2rem;
        width: 2.4rem;
        color: white;
      }
      span {
        font-size: 1.6rem;
      }
    }
  }

  @media (max-width: 1440px) {
    .footer-main {
      width: 80%;
    }
    .footer-left {
      ul > li > .icon {
        height: 3rem;
        width: 3rem;
      }
    }
    .footer-right {
      ul > li > .icon {
        height: 3rem;
        width: 3rem;
      }
    }
  }
  @media (max-width: 950px) {
    .footer-main {
      width: 90%;
    }
    .footer-left {
      ul > li > .icon {
        height: 2.6rem;
        width: 2.6rem;
      }
    }
    .footer-right {
      ul > li > span {
        font-size: 1.4rem;
      }
    }
  }
  @media (max-width: 770px) {
    .footer-main {
      flex-wrap: wrap;
      width: 70%;
    }
    p {
      font-size: 1.4rem;
    }
    .footer-left {
      width: 67%;
    }
    .footer-mid {
      width: 30%;
    }
    .footer-right {
      width: 60%;
      margin-top: 4rem;
    }
  }
  @media (max-width: 550px) {
    footer {
      padding: 8rem 0;
    }
    .footer-main {
      flex-wrap: wrap;
      width: 90%;
    }

    .footer-left {
      width: 80%;
    }
    .footer-mid {
      margin-top: 4rem;
      width: 80%;
    }
    .footer-right {
      width: 80%;
      margin-top: 4rem;
    }
    li > a {
      font-size: 1%.2;
    }
  }
  @media (max-width: 350px) {
    .footer-bottom {
      p {
        font-size: 1rem;
      }
    }
  }
`;

export default Footer;
