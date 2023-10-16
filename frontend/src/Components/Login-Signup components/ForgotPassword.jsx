import React, { useState } from 'react'
import styled from 'styled-components';
import { toast } from 'react-toastify';
import axios from 'axios';
import { MdOutlineEmail } from 'react-icons/md';

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [mailSend, setMailSend] = useState(false);


// <----HANDLING FORGOT PASSWORD---->
const handleSubmit = async (e) => {
  e.preventDefault();

  await axios.post(`/api/v1/auth/password/forgot`, {email})
  .then(async (res)=>{
    const data = res.data;
    toast.success(data.msg);
    setMailSend(true);
    setEmail("");
  })
  .catch((err) =>  {
    toast.error(err.response?.data.msg);
  });
}


  

  return (
    <Wrapper >
      <h2>Forgot Password</h2>
      {
        mailSend?
        <p> We have e-mailed you password reset link</p>
        :
        ""
      }
      <form onSubmit={handleSubmit}>
          <div className="forgot-password-input">
            <MdOutlineEmail className='icon' />
            <input type="email" name="email" placeholder='Email Address' value={email}
            onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <button type="submit" email="Login" className='btn'>Forgot Password</button>
      </form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 50rem;
    min-width: 20rem;
    min-height: 20rem;
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
    p{
      background-color: #60eac57c;
      border: 1px solid black;
      width: 80%;
      padding: 2rem 4rem;
      font-weight: 600;
      margin: 0rem auto;
      font-size: 1.8rem;
    }

    form{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin: 2rem auto;
        margin-top: 0;
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
            padding: 1.8rem 1.4vmax;
            padding-right: 1vmax;
            width: 100%;
            box-sizing: border-box;
            border: 1px solid rgba(0, 0, 0, 0.267);
            border-radius: 4px;
            outline: none;
            font: 300 1rem;
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
export default ForgotPassword;