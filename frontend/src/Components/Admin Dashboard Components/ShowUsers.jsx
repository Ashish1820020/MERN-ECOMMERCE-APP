import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAllUsers, isError } from '../../Store/Slices/AuthSlice'
import { toast } from 'react-toastify';
import styled from 'styled-components';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { MdDelete } from 'react-icons/md';

const ShowUsers = () => {

  const dispatch = useDispatch();
  const {isLoading, allUsers} = useSelector(state => state.auth);
  let count = 0;

  const handleClick = async (id) => {
    const promptValue = window.confirm("Do you really want to delete this user?");
    if(promptValue){
      await axios.delete(`${import.meta.env.VITE_ROOT_API}/auth/deleteuser/${id}`)
      .then((res) => {
          toast.success(res.data.msg);
          dispatch(setAllUsers(res.data.updatedUsers));
      })
      .catch((err) => {
        toast.error(err.response?.data.msg);
        console.log(err);
      });
    }
  }

  


  return (
    <Wrapper className="right-inside">
      <h2>CUSTOMERS</h2>
      <hr/>
      {
        isLoading === false?
            <table>
              <thead>
                <tr className='table-header'>
                  <td>ID</td>
                  <td> Name</td>
                  <td>Phone No</td>
                  <td>Email</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {
                  allUsers.map((user, index) => {
                    if(user.role === 0){
                      ++count;
                      return (
                        <tr key={index+1}>
                          <td>{count}</td>
                          <td>{user.name}</td>
                          <td>{user.phoneNumber}</td>
                          <td>{user.email}</td>
                          <td><MdDelete className='icon-small' onClick={() => handleClick(user._id)}/></td>
                        </tr>
                      )
                    }
                  })
                }
              </tbody>
            </table>
        :
          <div></div>
      }
    </Wrapper>
  )
}

const Wrapper =  styled.div`
  padding: 1rem;

  h2{
    text-align: center;
  }
  
  table {
    width: 100%;
    margin: 4rem 0;
    border: none;
    .table-header{
      background-color: #ead9d9;
    }
  }
  tr{
    border: none;
    border-color: #ead9d9;
    td{
      text-align: center;
      padding: 0.5rem 0;
      border: none;
    }
  }
  input {
    height: 1.6rem;
    width: 1.6rem;
  }
  .icon-small {
    height: 2.5rem;
    width: 2.5rem;
  }

  @media (max-width: 370px) {
    .icon-small{
      height: 1.5rem;
      width: 1.5rem;
    }
    .right-inside{
      padding-left: 0;
      padding-right: 0;
    }
  }
`;

export default ShowUsers;
