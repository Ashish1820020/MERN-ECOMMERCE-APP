import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Cart from "./Pages/Cart";
import Home from "./Pages/HomePage";
import About from "./Pages/AboutPage";
import Contact from "./Pages/ContactPage";
import ErrorPage from "./Pages/ErrorPage";
import LogInPage from "./Pages/LogInSignUpPage";

import Products from "./Pages/ProductsPage";
import SingleProduct from "./Pages/SingleProductPage";

import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";

import Header from "./Components/Utility Components/Header";
import Footer from "./Components/Utility Components/Footer";

import Login from "./Components/Login-Signup components/Login";
import Signup from "./Components/Login-Signup components/Signup";
import ForgotPassword from "./Components/Login-Signup components/ForgotPassword";

import UserCheck from "./Components/Routes/UserCheck";
import AdminCheck from "./Components/Routes/AdminCheck";

import UserDashboard from "./Components/Profile-Details Page/User/UserDashboard";
import AdminDashboard from "./Components/Profile-Details Page/Admin/AdminDashboard";

import { ToastContainer } from "react-toastify";
import CreateCategory from "./Components/Admin Dashboard Components/CreateCategory";
import AddProducts from "./Components/Admin Dashboard Components/AddProducts";
import ShowUsers from "./Components/Admin Dashboard Components/ShowUsers";
import ShowAllProducts from "./Components/Admin Dashboard Components/ShowAllProducts";
import UpdateProductDetails from "./Components/Admin Dashboard Components/UpdateProductDetails";
import UserProfile from "./Components/User Dashboard Components/UserProfile";
import UserOrders from "./Components/User Dashboard Components/UserOrders";
import UpdateProfile from "./Components/User Dashboard Components/EditProfileForm";
import Shipping from "./Components/Cart Sections/OutletSection/Shipping";
import CheckoutPage from "./Pages/CheckoutPage";
import axios from "axios";
import AdminOrders from "./Components/Admin Dashboard Components/AdminOrders";
import SingleOrderComponent from "./Components/Admin Dashboard Components/SingleOrderComponent";
import AdminPanel from "./Components/Admin Dashboard Components/AdminPanel";
import ResetPassword from "./Components/Login-Signup components/ResetPassword";
import Wishlist from "./Pages/Wishlist";
import Done from "./Components/Login-Signup components/Done";
import ScrollToTop from "./Components/ScrollToTop";

const App = () => {
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
      smallLaptop: "1350",
    },
  };

  axios.defaults.withCredentials = true;

  addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={false}
        progress={undefined}
        theme="light"
      />

      <Router>
        <ScrollToTop />
        <GlobalStyle />
        <Header />

        <div className="main-content-holder">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/singleProduct/:id" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />

            <Route path="/cart/checkout" element={<CheckoutPage />} />
            <Route path="/cart/checkout/addaddress" element={<Shipping />} />
            <Route path="*" element={<ErrorPage />} />

            <Route path="/loginsignup" element={<LogInPage />}>
              <Route index element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
            <Route
              path="/password/forgotpassword"
              element={<ForgotPassword />}
            />
            <Route
              exact
              path="/password/reset/:token"
              element={<ResetPassword />}
            />
            <Route exact path="/password/reset/done" element={<Done />} />

            {/* DASHBOARD --> USER */}
            <Route path="/dashboard" element={<UserCheck />}>
              <Route path="user" element={<UserDashboard />}>
                <Route index element={<UserProfile />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="profile/edit" element={<UpdateProfile />} />
                <Route path="orders" element={<UserOrders />} />
              </Route>
            </Route>

            {/* DASHBOARD --> ADMIN */}
            <Route path="/dashboard" element={<AdminCheck />}>
              <Route path="admin" element={<AdminDashboard />}>
                <Route index element={<AdminPanel />} />
                <Route path="dashboard" element={<AdminPanel />} />
                <Route path="createcategory" element={<CreateCategory />} />
                <Route path="addproduct" element={<AddProducts />} />
                <Route path="showusers" element={<ShowUsers />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="orders/:id" element={<SingleOrderComponent />} />
                <Route path="showallproducts" element={<ShowAllProducts />} />
                <Route
                  path="updateproductdetails/:id"
                  element={
                    <UpdateProductDetails header={"UPDATE PRODUCT DETAILS"} />
                  }
                />
              </Route>
            </Route>
          </Routes>
        </div>

        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
