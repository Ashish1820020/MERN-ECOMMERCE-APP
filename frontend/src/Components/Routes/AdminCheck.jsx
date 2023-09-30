import React, { useEffect, useState } from 'react'
import { Outlet } from "react-router";
import axios from "axios";
import Spinner from '../Utility Components/Spinner';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import RedirectingMessages from '../Utility Components/RedirectingMessages';



const AdminCheck = () => {
    // 
    const[ok, setOk] = useState(false);
    const[cookie, setCookies] = useCookies(["token"]);

    // console.log(ok);

    useEffect(()=>{
        const authCheck = async () => {
            await axios.get(`${import.meta.env.VITE_ROOT_API}/auth/admin-auth`)
            .then((res) => {
                // console.log(res.data);
                res.data.ok? setOk(true) : setOk(false);
            })
            .catch((error)=> {
                toast.error(error.response.data.msg);
                // console.log(error);
            })
        }
        authCheck();
    },[cookie?.token]);
  return (ok ? <Outlet /> : <RedirectingMessages />)
}

export default AdminCheck;