import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { addUserData, isError } from '../../Store/Slices/AuthSlice';
import { addFromDb } from '../../Store/Slices/CartSlice';
import { addFromDbWishlist } from '../../Store/Slices/WishlistSlice';
import { useCookies } from "react-cookie";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdOutlineEmail, MdOutlinePassword } from 'react-icons/md';

const Login = () => {
  
  const dispatch = useDispatch();
  const[, setCookies] = useCookies(["token"]);

  const [value, setValue] = useState({email: "", password: "", check: false});
  const navigate =  useNavigate();
  const location = useLocation();

  //<----HANDLING LOGIN---->
  const handleLogin = async (e) => {
    e.preventDefault();
    
      await axios.post(`/api/v1/auth/login`, value)
      .then(async(res) => {
        const data = res.data;
        // console.log(data);
        toast.success(res.data.msg);
        dispatch(addUserData(data.user));
        setCookies("token", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));
        navigate(location.state || "/");
        await getDataFromDb();
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.response?.data.msg);
        dispatch(isError());
      });
  }
    
    
    
  // <----SAVE CART DATA---->
  const getDataFromDb = async () => {

    try {
      await axios.get(`/api/v1/user/getcartandwishlist`)
      .then((res) => {
        const data = res.data;
        dispatch(addFromDb(data.userCart));
        dispatch(addFromDbWishlist(data.userWishlist));
      })
      .catch((err) => {
        toast.error(err.response?.data.msg);
        // console.log(err);
      });
    } catch (error) {
      // console.log(error);
    }
  }


  
  
  return (
    <>
    <Wrapper className='bottom-inside'>
      <form onSubmit={(e) => handleLogin(e)}>

        <div className="update-profile-input">
          <MdOutlineEmail className='icon' />
          <input type="email" name="email" placeholder='Email Address' value={value.email} onChange={(e) => setValue({...value, email: e.target.value})} required/>
        </div>

        <div className="update-profile-input">
          <MdOutlinePassword className='icon' />
          <input type="password" name="password"  placeholder='Password' value={value.password} onChange={(e) => setValue({...value, password: e.target.value})} required/>
        </div>

        <div className="text">
          {/* <div className='text-check'>
            <input type="checkbox" name="checkbox" value={value.check} onChange={(e) => setValue({...value, check: e.target.value})}/>
            <p>Remember me</p>
          </div> */}
         <button className='forgot-btn' onClick={() => navigate("/password/forgotpassword")}>Forgot password?</button>
        </div>

        <button type="submit" value="Login" className='btn'>Login</button>

      </form>
    </Wrapper>
    </>
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
      font-weight: 300;
      outline: none;
      border: none;
      box-shadow: none;
    }

    .btn{
      background-color: rgba(40,116,240,255);
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


  .text{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    .text-check{
      display: flex;
      flex-direction: row;
      gap: .8rem;
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
  }

  
.forgot-btn{
  outline: none;
  background: none;
  border: none;
  margin-left: auto;
  padding-right: 0;
  &:hover{
    color: rgba(0, 0, 0, 0.6);
  }
}
`;

export default Login
