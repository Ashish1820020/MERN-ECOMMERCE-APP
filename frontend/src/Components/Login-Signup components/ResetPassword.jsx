import React, { useState } from 'react'
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BiLockOpenAlt, BiLockAlt } from 'react-icons/bi';

const ResetPassword = () => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const {token} = useParams()



// <----HANDLING FORGOT PASSWORD---->
const handleSubmit = async (e) => {
  e.preventDefault();

  await axios.put(`/api/v1/auth/password/reset/${token}`, {password, confirmPassword})
  .then(async (res)=>{
    const data = res.data;
    // console.log(data);
    toast.success(data.msg);
    navigate('/password/reset/done')
    setConfirmPassword("");
    setPassword("");
  })
  .catch((err) =>  {
    toast.error(err.response?.data.msg);
    setMessage(err.response?.data.msg);
  });
}


  
  
  return (
    <Wrapper className='bottom-inside'>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="forgot-password-input">
          <BiLockOpenAlt className='icon' />
          <input type="password" name="password" placeholder='Enter New Password' value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className="forgot-password-input">
          <BiLockAlt className='icon' />
          <input type="password" name="confirmPassword" placeholder='Confirm New Password' value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>

        <button type="submit" email="Login" className='btn'>Reset Password</button>
      </form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;  
  max-width: 50rem;
  min-width: 30rem;
  margin: 10rem auto 18rem auto;
  padding: 2rem;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0px 0px 2px 0px black;
    
  h2{
    font-size: 2rem;
    font-weight: bolder;
    width: 80%;
    margin: 0 auto;
    padding: 1rem 0;
    border-bottom: 1px solid black;
  }


  form{
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    margin: 2rem auto;
    width: 80%;

    .forgot-password-input {
      display: flex;
      width: 100%;
      align-items: center;
      box-shadow: 0px 0px 1px 0px black;
      margin: 0 auto;
      padding: 0 1rem;
      outline: 1px solid black;
      border-radius: 5px;
      .icon{
        height: 2.5rem;
        width: 2.5rem;
      }
    }

    .forgot-password-input > input {
      color: #5959ec;
      padding: 1vmax 1.4vmax;
      padding-right: 1vmax;
      width: 100%;
      box-sizing: border-box;
      border: 1px solid rgba(0, 0, 0, 0.267);
      border-radius: 4px;
      outline: none;
      font: 300 1rem cursive;
      border: none;
      box-shadow: none;
    }

    .btn{
      color: white;
      font-size: 16px;
      font-weight: 600;
      border: none;
      background-color: rgba(40,116,240,255);
      &:hover{
        background-color: rgba(40,116,240,.9);
      }
    }
  }
  
  .forgot-btn{
    outline: none;
    background: none;
    border: none;
    &:hover{
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;

export default ResetPassword;
