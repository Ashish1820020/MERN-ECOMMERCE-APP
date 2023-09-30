import React from 'react'
import { RiArrowUpSLine } from 'react-icons/ri';
import { NavLink } from "react-router-dom";

const UserMenu = ({sidebar, setSidebar}) => {
  return (
    <div className="left-inside">
        <ul className="list">
          <NavLink to={"/dashboard/user/profile"}><li className="list-item">Profile</li></NavLink>
          <NavLink to={"/dashboard/user/orders"}><li className="list-item">Orders</li></NavLink>
        </ul>
        <div className= {sidebar? 'icon-container' : 'icon-container hide'}> <RiArrowUpSLine className='close-outline icon' onClick={()=>setSidebar(false)} /></div>
     </div>
  );
}

export default UserMenu;