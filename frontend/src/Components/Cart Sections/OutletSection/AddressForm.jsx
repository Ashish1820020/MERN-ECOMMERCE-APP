import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BiSolidHome, BiSolidCity } from "react-icons/bi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdPinDrop } from "react-icons/md";
import { State } from "country-state-city";
import { styled } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addUserData } from "../../../Store/Slices/AuthSlice";

const AddressForm = ({ addAddress, setAddAddress, refOne }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [locality, setLocality] = useState("");

  const [address, setAddress] = useState("");

  const [state, setState] = useState("");
  const [altNo, setAltNo] = useState("");

  const shippingSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      id: userData._id,
      name,
      phoneNo,
      pinCode,
      locality,
      address,
      state,
      altNo,
    };
    const newAddress = {
      name,
      phoneNo,
      pinCode,
      locality,
      address,
      state,
      altNo,
    };

    await axios
      .post(`/api/v1/auth/addaddress`, formData)
      .then((res) => {
        const data = res.data;
        console.log(data);
        localStorage.setItem("userData", JSON.stringify(data.userData));
        dispatch(addUserData(res.data.userData));
        setAddAddress(false);
        navigate("/cart/checkout");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment ref={refOne}>
      <form className="shippingForm" onSubmit={shippingSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <div className="input-container">
            <BiSolidHome className="icon" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="name">Mobile No.</label>
          <div className="input-container">
            <BsFillTelephoneFill className="icon" />
            <input
              type="number"
              placeholder="Phone Number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
              size="10"
            />
          </div>
        </div>

        <div>
          <label htmlFor="name">Pin Code</label>
          <div className="input-container">
            <MdPinDrop className="icon" />
            <input
              type="number"
              placeholder="Pin Code"
              required
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="name">Locality</label>
          <div className="input-container">
            <MdPinDrop className="icon" />
            <input
              type="text"
              placeholder="Locality"
              required
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="name">Address</label>
          <div className="input-container">
            <textarea
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="name">State</label>
          <div className="input-container">
            <select
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
            >
              <option value="default">Choose Your State.</option>
              {State.getStatesOfCountry("IN").map((item) => (
                <option key={item.isoCode} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="name">Alternative No.</label>
          <div className="input-container">
            <BiSolidCity className="icon" />
            <input
              type="text"
              placeholder="Alternative No"
              value={altNo}
              onChange={(e) => setAltNo(e.target.value)}
            />
          </div>
        </div>

        <input
          type="submit"
          value="Continue"
          className="shippingBtn"
          style={{ float: "right" }}
        />
      </form>
    </Fragment>
  );
};

const Fragment = styled.div`
  border-radius: 5px;
  box-shadow: 0 0px 1px 1px rgba(0, 0, 0, 0.5);
  width: 450px;
  background-color: white !important;
  min-height: 300px;

  .shippingForm {
    padding: 2rem;
    width: 90%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    gap: 0.8rem;
  }
  label {
    font-size: 1.6rem;
    margin-bottom: 0.25rem;
  }

  .input-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border: 1px solid black;
    width: 100%;
    border-radius: 5px;
    background-color: #eff6ff;
    height: 40px;
    .icon {
      height: 2rem;
      width: 2rem;
    }
  }

  .input-container:has(select) {
    padding: 0%;
  }

  .input-container:has(textarea) {
    padding: 0 1.5rem;
    height: 60px;
  }

  input,
  textarea {
    border: none;
    outline: none;
    box-shadow: none;
    background-color: #eff6ff;
  }

  input {
    width: 96%;
    padding: 0.8rem 2rem;
  }

  textarea {
    width: 100%;
    height: 100%;
    padding: 1.5rem 1.5rem;
  }
  select {
    width: 100%;
    border: none;
    outline: none;
    border-radius: 5px;
  }

  .shippingBtn {
    background-color: rgba(40, 116, 240, 1);
    color: white;
    border: none;
    font: 300 1vmax "Roboto";
    max-width: 100%;
    width: 100%;
    padding: 1rem 2rem;
    cursor: pointer;
    transition: all 0.5s;
    outline: none;
    margin-top: 1rem;
  }

  .shippingBtn:hover {
    background-color: rgba(40, 116, 240, 0.8);
  }

  @media screen and (max-width: 750px) {
    width: 400px;
  }
  @media screen and (max-width: 400px) {
    min-height: 300px;
    width: 300px;
  }
`;

export default AddressForm;
