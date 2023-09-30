import React from 'react'
import { RiArrowUpSLine } from 'react-icons/ri';
import { NavLink } from "react-router-dom";

const AdminMenu = ({sidebar, setSidebar}) => {
  return (
    <div className='left-inside'>

        <ul className="list">
          <NavLink to={"/dashboard/admin/dashboard"} onClick={()=>setSidebar(false)}><li className="list-item">DASHBOARD</li></NavLink>
          <NavLink to={"/dashboard/admin/showallproducts"} onClick={()=>setSidebar(false)}><li className="list-item">PRODUCTS</li></NavLink>
          <NavLink to={"/dashboard/admin/addproduct"} onClick={()=>setSidebar(false)}><li className="list-item">ADD PRODUCTS</li></NavLink>
          <NavLink to={"/dashboard/admin/createcategory"} onClick={()=>setSidebar(false)}><li className="list-item">CATEGORIES</li></NavLink>
          <NavLink to={"/dashboard/admin/showusers"} onClick={()=>setSidebar(false)}><li className="list-item">CUSTOMERS</li></NavLink>
          <NavLink to={"/dashboard/admin/orders"} onClick={()=>setSidebar(false)}><li className="list-item">ORDERS</li></NavLink>
        </ul>

       <div className= {sidebar? 'icon-container' : 'hide icon-container'}> <RiArrowUpSLine className='close-outline icon' onClick={()=>setSidebar(false)} /></div>

     </div>
  );
}

export default AdminMenu;
