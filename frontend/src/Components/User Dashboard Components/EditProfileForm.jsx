import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {AiOutlineMobile} from 'react-icons/ai'
import {MdOutlineFace6} from 'react-icons/md'
import {CgPassword} from 'react-icons/cg'
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addUserData, updateUserData } from "../../Store/Slices/AuthSlice";





const UpdateProfile = () => {

  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.auth);
  const navigate = useNavigate();

  // STATES
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(userData.avatar);


  const updateProfileSubmit = async (e) => {
    e.preventDefault();

    // appending the form data
    const myForm = new FormData();
    myForm.append("id", userData._id);
    myForm.append("name", name);
    myForm.append("password", password);
    myForm.append("phoneNumber", mobile);
    myForm.append("avatar", avatar);

    // console.log(myForm);
      await axios.patch(`${import.meta.env.VITE_ROOT_API}/auth/updateprofile`, myForm)
      .then((res)=>{
        toast.success(res.data.msg);
        dispatch(updateUserData(res.data.userData));
        navigate("/");
      })
       .catch((err) => {
        // console.log(err);
        toast.error(err.response?.data.msg);
      });
  };

  // HANDLING THE CHANGE OF IMAGE 
  const updateProfileDataChange = (e) => {
    setAvatar(e.target.files[0]);
    setAvatarPreview(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    if (userData &&userData?.avatar) {
      setAvatarPreview(userData.avatar);
    }else{
      setAvatarPreview("https://res.cloudinary.com/muttakinhasib/image/upload/v1611336104/avatar/user_qcrqny.svg"); 
    }
  }, []);






  return ( 
    <Fragment>
      {/* <MetaData title="Update Profile" /> */}
      <div className="update-profile-container flex-column">
        <h2 className="update-profile-heading">Update Profile</h2>

        <form className="update-profile-form flex-column" encType="multipart/form-data" onSubmit={updateProfileSubmit}>
          
          <div className="update-profile-input">
            <MdOutlineFace6 />
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="update-profile-input">
            <AiOutlineMobile />
            <input
              type="number"
              placeholder="Mobile"
              required
              name="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <div className="update-profile-input">
            <CgPassword />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div id="update-profile-image">
            <img src={avatarPreview} alt="Avatar Preview" />
            <input
              type="file"
              id="image-input"
              name="avatar"
              accept="image/*"
              onChange={updateProfileDataChange}
            />
          </div>

          <input type="submit" value="Update" className="updateProfileBtn"/>
        </form>
      </div>
    </Fragment>
  );
};

const Fragment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 100%;
  background-color: rgb(231, 231, 231);
  z-index: 100;
  position: fixed;
  top: 0%;
  left: 0;

  .update-profile-container {
    background-color: white;
    border-radius: 1rem;
    width: 30dvw;
    height: 70%;
  }

  .update-profile-heading {
    font: 700 1.3vmax "Roboto";
    color: rgba(0, 0, 0, 0.664);
    border-bottom: 1px solid rgba(0, 0, 0, 0.205);
    text-align: center;
    padding: 1.3vmax;
    width: 50%;
    margin: auto;
    margin-bottom: 0;
  }

  .update-profile-form {
    gap: 1rem;
    align-items: center;
    margin: auto;
    padding: 2vmax;
    justify-content: space-evenly;
    height: 70%;
    transition: all 0.5s;
  }

  .update-profile-form > div {
    display: flex;
    width: 100%;
    height: 20%;
    align-items: center;
  }
  
  .update-profile-form > div > input {
    color: #5959ec;
    padding: 1vmax 4vmax;
    padding-right: 1vmax;
    width: 100%;
    height: 80%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    font: 300 0.9vmax cursive;
    outline: none;
  }
  #image-input{
    width: 50%;
    height: 5rem;
  }

  .update-profile-form > div > svg {
    position: absolute;
    transform: translateX(1vmax);
    font-size: 1.6vmax;
    color: rgba(0, 0, 0, 0.623);
  }

  #update-profile-image > img {
    width: 3vmax;
    height: 3vmax;
    border-radius: 100%;
    margin: 1rem;
    cursor: pointer;
  }
  #update-profile-image > input {
    display: flex;
    padding: 0%;
  }

  #update-profile-image > input::file-selector-button {
    cursor: pointer;
    width: 100%;
    z-index: 2;
    height: 5vh;
    border: none;
    margin: 0%;
    font: 400 0.8vmax cursive;
    transition: all 0.5s;
    padding: 0 1vmax;
    color: rgba(0, 0, 0, 0.623);
    background-color: rgb(255, 255, 255);
  }

  #update-profile-image > input::file-selector-button:hover {
    background-color: rgb(235, 235, 235);
  }

  .updateProfileBtn {
    border: none;
    background-color: tomato;
    color: white;
    font: 300 0.9vmax "Roboto";
    width: 100%;
    padding: 0.8vmax;
    cursor: pointer;
    transition: all 0.5s;
    border-radius: 4px;
    outline: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.219);
  }

  .updateProfileBtn:hover {
    background-color: rgb(179, 66, 46);
  }

  @media screen and (max-width: 1250px) {
    .update-profile-container {
      width: 50dvw;
    }
    .update-profile-form{
      padding: 0;
      width: 70%;
    }
  }
  @media screen and (max-width: 1150px) {
    .update-profile-container {
      width: 70dvw;
    }
    .update-profile-form{
      padding: 0;
      width: 70%;
    }
  }
  @media screen and (max-width: 950px) {
    .update-profile-container {
      width: 60dvw;
    }
    .update-profile-form{
      padding: 0;
      width: 70%;
    }
  }
  @media screen and (max-width: 750px) {
    .update-profile-container {
      width: 75dvw;
    }
    .update-profile-form{
      padding: 0;
      width: 70%;
    }
  }
  @media screen and (max-width: 600px) {
    .update-profile-container {
      width: 90%;
    }
  }
  @media screen and (max-width: 450px) {
    .update-profile-form>div{
      /* flex-direction: column; */
    }
  }
`;
export default UpdateProfile;