import React, { useEffect, useState } from 'react'
import { Outlet } from "react-router";
import axios from "axios";
import Spinner from '../Utility Components/Spinner';
import { useCookies } from 'react-cookie';



const UserCheck = () => {
    const[ok, setOk] = useState(false);
    const[cookie, setCookies] = useCookies(["token"]);

    useEffect(()=>{
        const authCheck = async () => {
            await axios.get(`/api/v1/auth/user-auth`)
            .then((res) => {
                // console.log(res.data);
                res.data.ok? setOk(true) : setOk(false);
            })
        }
        authCheck();
    },[cookie?.token]);
  return (ok ? <Outlet /> : <Spinner path='' />);
}

export default UserCheck;