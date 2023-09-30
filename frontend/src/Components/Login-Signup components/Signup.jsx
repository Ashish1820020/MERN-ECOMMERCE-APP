import React, { useState } from 'react';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { BsCheck2Square } from 'react-icons/bs';
import { MdOutlineEmail, MdOutlineFace6, MdOutlinePassword } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const context = useOutletContext();
  const navigate =  useNavigate();
  const {current, setCurrent} = context;



  // <----HANDEL SIGN UP---->
  const handleSignup = async (e) => {
    e.preventDefault();
    

    // appending the form data
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("confirmPassword", confirmPassword);
    myForm.append("avatar", avatar);

    await axios.post(`${import.meta.env.VITE_ROOT_API}/auth/signup`, myForm)
    .then((res)=>{
      // console.log(res);
      toast.success(res.data.msg);
      navigate("/loginsignup/login");
      setCurrent("login");
    })
    .catch((err) =>  {
      // console.log(err);
      toast.error(err.response?.data.msg);
    });
  }
  

  // HANDLING THE CHANGE OF IMAGE 
  const updateProfileDataChange = (e) => {
    setAvatar(e.target.files[0]);
    setAvatarPreview(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Wrapper className='bottom-inside'>
    <form className="update-profile-form flex-column" encType="multipart/form-data" onSubmit={handleSignup}>

      <div className="update-profile-input">
        <MdOutlineFace6 className='icon' />
        <input type="text" name="firstName" value={name} placeholder='Full Name' onChange={(e) => setName(e.target.value)} required/>
      </div>

      <div className="update-profile-input">
        <MdOutlineEmail className='icon' />
        <input type="email" name="email" value={email} placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} required/>
      </div>

      <div className="update-profile-input">
        <MdOutlinePassword className='icon' />
        <input type="text" name="password1" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
      </div>

      <div className="update-profile-input">
        <BsCheck2Square className='icon' />
        <input type="text" name="password2" value={confirmPassword} placeholder='Re-enter Password' onChange={(e) => setConfirmPassword(e.target.value)} required/>
      </div>
      
      <div id="update-profile-image" className='flex-row'>
        <img src={avatarPreview} alt="Avatar Preview" hidden={avatarPreview.length===0} />
        <input
          type="file"
          id="image-input"
          name="avatar"
          accept="image/*"
          onChange={updateProfileDataChange}
        />
      </div>

      <div className='text-check'>
        <input type="checkbox" name="checkbox" value={check} onChange={(e) => setCheck(e.target.checked)} required/>
        <p>Accept Terms & Conditions</p>
      </div>

      <button type="submit" value="submit" className='btn' disabled={!check} 
        style={{backgroundColor: check? 'rgba(40,116,240,255)' : "rgba(0,0,0,.5)"}}>Signup</button>

    </form>
    </Wrapper>
  )
}
const Wrapper = styled.div`

  form{
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    margin: 2rem auto;
    width: 100%;

    .update-profile-input {
        display: flex;
        width: 100%;
        align-items: center;
        box-shadow: 0px 0px 1px 0px black;
        margin: 0 auto;
        padding: 0 1rem;
        .icon{
          height: 2.5rem;
          width: 2.5rem;
        }
      }

    .update-profile-input > input {
      color: #5959ec;
      padding: 1vmax 1.4vmax;
      padding-right: 1vmax;
      width: 100%;
      box-sizing: border-box;
      border: 1px solid rgba(0, 0, 0, 0.267);
      border-radius: 4px;
      font: 300 0.9vmax cursive;
      outline: none;
      border: none;
      box-shadow: none;
    }

    .btn{
      color: white;
      font-size: 16px;
      font-weight: 600;
      border: none;
      box-shadow: 0px 0px 1px 0px black;
      &:hover{
        background-color: rgba(40,116,240,.9);
      }
    }
  }

  form{
    gap: 1rem;
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
    height: 100%;
  }

  #update-profile-image > input::file-selector-button {
    cursor: pointer;
    width: 100%;
    z-index: 2;
    height: 5vh;
    border: none;
    margin: 0%;
    font: 400 1rem cursive;
    transition: all 0.5s;
    padding: 0 1vmax;
    color: rgba(0, 0, 0, 0.623);
    background-color: rgb(255, 255, 255);
  }

  #update-profile-image > input::file-selector-button:hover {
    background-color: rgb(235, 235, 235);
  }

  .text-check{
    display: flex;
    flex-direction: row;
    gap: 2rem;
    padding: 0.6em 1.2em;
    align-items: center;
    input{
      display: flex;
      height: 1.5rem;
      width: 1.5rem;
    }
    
    p{
      cursor: pointer;
      &:hover{
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
`;

export default Signup;
