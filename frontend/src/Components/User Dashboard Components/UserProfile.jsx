import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProfile = () => {
  
    const {userData} = useSelector(state => state.auth);
    let avatar = "";
    
    if(userData && userData?.avatar){
      avatar = userData?.avatar;
     
    }else{
      avatar = "https://res.cloudinary.com/muttakinhasib/image/upload/v1611336104/avatar/user_qcrqny.svg";  
    }




  return (
    <Fragment>


      <div className="profile-top">
        <img src={avatar} alt={userData.name} />
        <NavLink to="/dashboard/user/profile/edit">Edit Profile</NavLink>
      </div>


      <div className="profile-mid">
        <div>
          <h3>Full Name: </h3>
          <p>{userData.name}</p>
        </div>


        <div>
          <h3>Email: </h3>
          <p>{userData.email}</p>
        </div>


        <div>
          <h3>Joined On: </h3>
          <p>{String(userData.createdAt).substr(0, 10)}</p>
        </div>
      </div>


    </Fragment>
  );
};

const Fragment = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
    border: 1px solid black;
    padding-bottom: 2rem;


  .profile-top{
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    img{
      height: 8vmax;
      width: 8.5vmax;
      border-radius: 100%;
      margin: 1rem;
       transition: all 0.5s;
      &:hover{
        transform: scale(1.05);
      }
    }
  }

  .profile-top > a{
    border: none;
    background-color: tomato;
    font: 400 1.4vmax "Roboto";
    color: white;
    text-decoration: none;
    padding: .4vmax .6vmax;
    width: 26%;
    margin: 1vmax;
    text-align: center;
    transition: all 0.5s;
    &:hover{
      background-color: rgb(204, 78, 56);
    }
  }
  
  .profile-mid{
    display: flex;
    flex-direction: column;
    background-color: white;
    gap: 2rem; 
    &>div{
      display: flex;
      align-items: center;
      gap: 3rem;
      margin-left: 1rem;
      &:nth-child(2n+0){
        gap: 6.8rem;
      }
    }
  }
  @media screen and (max-width: 600px) {
    .profileContainer {
      flex-direction: column;
    }

    .profileContainer > div:first-child > h1 {
      font: 500 3.2vmax "Roboto";
      transform: translateY(-2vmax);
    }

    .profileContainer > div:first-child > a {
      font: 400 1.7vmax "Roboto";
      padding: 1vmax;
    }

    .profileContainer > div:last-child {
      text-align: center;
      align-items: center;
    }

    .profileContainer > div:last-child > div > h3 {
      font: 400 2.5vmax "Roboto";
    }

    .profileContainer > div:last-child > div > p {
      font: 400 2vmax cursive;
      margin: 0.5vmax 0;
    }

    .profileContainer > div:last-child > div:last-child > a {
      font: 400 1.8vmax "Roboto";
      padding: 1vmax;
      margin: 2vmax 0;
    }
  }
`;

export default UserProfile;