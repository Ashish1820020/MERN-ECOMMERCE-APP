import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BiSolidHome, BiSolidCity } from "react-icons/bi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdPinDrop } from "react-icons/md";
import { State } from "country-state-city";
import { styled } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Shipping = ({addAddress, setActiveStep}) => {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [locality, setLocality] = useState("");

  const [address, setAddress] = useState("");

  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [altNo, setAltNo] = useState("");
  
  const shippingSubmit = async (e) => {
    e.preventDefault();

    const formData = {id: userData._id, name, phoneNo, pinCode, locality, address, district, state, landmark, altNo};

      await axios.post(`/api/v1/auth/addaddress`, formData)
      .then((res)=>{
        const data = res.data;
        console.log(data);
        localStorage.setItem("userData", JSON.stringify(data.userData));
        dispatch(addAddress(res.data.userData));
        navigate("/cart/checkout");
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <Fragment className={addAddress? "show" : ""}>
      <div className="shippingContainer">

          <h2 className="shippingHeading">Shipping Details</h2>

          <form className="shippingForm" onSubmit={shippingSubmit}>


            {/* ADDRESS TOP */}
            <div className="address-top">
              <div className="input-container">
                <BiSolidHome className="icon"/>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
              </div>

              <div className="input-container">
                <BsFillTelephoneFill className="icon"/>
                <input type="number" placeholder="Phone Number" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required size="10"/>
              </div>

              <div className="input-container">
                <MdPinDrop className="icon"/>
                <input type="number" placeholder="Pin Code" required value={pinCode} onChange={(e) => setPinCode(e.target.value)}/>
              </div>

              <div className="input-container">
                <MdPinDrop className="icon"/>
                <input type="text" placeholder="Locality" required value={locality} onChange={(e) => setLocality(e.target.value)}/>
              </div>
            </div>


            {/* ADDRESS MID */}
            <div className="address-mid">
              <div className="input-container">
                <textarea type="text" placeholder="Address" value={address} 
                onChange={(e) => setAddress(e.target.value)} required/>
              </div>
            </div>


            {/* ADDRESS BOTTOM */}
            <div className="address-bottom">
              <div className="input-container">
                <BiSolidCity className="icon"/>
                <input type="text" placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)} required/>
              </div>

              <div className="input-container">
                <BiSolidCity className="icon"/>
                <input type="text" placeholder="Landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)}/>
              </div>

              <div className="input-container">
                <select required value={state} onChange={(e) => setState(e.target.value)} placeholder="State">
                  {
                    State.getStatesOfCountry("IN").map((item) => <option key={item.isoCode} value={item.name}>{item.name}</option>)
                  }
                </select>
              </div>

              <div className="input-container">
                <BiSolidCity className="icon" />
                <input type="text" placeholder="Alternative No" value={altNo} onChange={(e) => setAltNo(e.target.value)}/>
              </div>


              <input type="submit" value="Continue" className="shippingBtn" style={{float: "right"}}/>


            </div>
          </form>

      </div>
    </Fragment>
  );
};

const Fragment =  styled.div`
  position: absolute;
  width: 40dvw;
  border-radius: 5px;
  box-shadow: 0 0px 1px 1px rgba(0, 0, 0, 0.5);

  .show{
    top: 1rem;
  }
  .shippingContainer{
    padding: 2rem;
  }

  h2{
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
  }

  .address-top, .address-bottom{
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin: 3rem auto;
    align-items: center;
    justify-content: center;

  }

  .input-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    border: 1px solid black;
    width: 45%;
    border-radius: 5px;
    .icon{
      height: 2rem;
      width: 2rem;
    }
  }

  input, textarea{
    border: none;
    outline: none;
    max-width: 100rem;
    box-shadow: none;
  }
  input{
    width: 80%;
    padding: .8rem 2rem;
  }
  .address-mid{
    .input-container{
      border: 1px solid black;
      width: 92%;
      margin: 0 auto;
      border-radius: 5px;
      textarea{
        border: none;
        border-radius: 5px;
        outline: none;
        max-width: 100rem;
        box-shadow: none;
        height: 12rem;
        width: 100%;
      }
    }
  }

  .address-bottom{
    .input-container:nth-child(3){
      padding: .6rem 2rem;
      select{
        height: 4rem;
        border: none;
        border-radius: 5px;
        outline: none;
        width: 100%;
      }
    }
  }

  .shippingBtn {
      border: none;
      background-color: tomato;
      color: white;
      font: 300 1vmax "Roboto";
      width: 100%;
      padding: 1vmax;
      cursor: pointer;
      transition: all 0.5s;
      outline: none;
      margin: 2vmax;
  }

  .shippingBtn:hover {
      background-color: rgb(179, 66, 46);
  }

  

  @media screen and (max-width: 1250px) {
    width: 50dvw;
  }
  
  @media screen and (max-width: 950px) {
   width: 70dvw;

   .shippingBtn {
      padding: 2vmax;
      font-size: 2rem;
    }
  }
  @media screen and (max-width: 750px) {
    width: 84dvw;
  }

  @media screen and (max-width: 600px) {
    width: 96dvw;

    .address-top{
      flex-direction: column;
    }

    .input-container{
      width: 92%;
      border-radius: 5px;
    }
  }
`;

export default Shipping;