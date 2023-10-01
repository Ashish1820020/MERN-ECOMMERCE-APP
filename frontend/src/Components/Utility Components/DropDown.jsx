import React from "react";
import { NavLink } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import styled from "styled-components";
import { AiOutlineDashboard } from "react-icons/ai";

const DropDown = ({
  setDropDown,
  updateCartDataToDb,
  dropdown,
  dashboardType,
  userData,
}) => {
  return (
    <Wrapper className={dropdown ? "dropdown-active" : ""}>
      <div className="dropdown-container">
        <li>
          <NavLink
            to={`/dashboard/${dashboardType}`}
            onClick={() => setDropDown(false)}
          >
            <MdDashboardCustomize className="icon" />
          </NavLink>
        </li>
        {userData.role === 1 ? (
          <NavLink to={`/dashboard/user`} onClick={() => setDropDown(false)}>
            <li>
              <AiOutlineDashboard className="icon" />
            </li>
          </NavLink>
        ) : (
          ""
        )}
        <li onClick={() => updateCartDataToDb()}>
          <TbLogout className="icon" />
        </li>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  position: absolute;
  z-index: 1;
  visibility: hidden;
  display: none;
  top: -100rem;
  padding-top: 2rem;
  .dropdown-container {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    justify-content: center;
    border-radius: 0.3rem;
  }

  .icon {
    height: 3.5rem;
    width: 3.5rem;
    color: #757575;
    border: none;
    background-color: white;
    border: 1px solid black;
    border-radius: 50%;
    padding: 0.5rem;
    &:hover {
      background-color: #d4d2d2;
    }
  }
`;

export default DropDown;
