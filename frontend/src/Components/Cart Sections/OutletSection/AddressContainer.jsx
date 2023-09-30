import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import { AiFillPlusSquare } from 'react-icons/ai';
import AddressForm from './AddressForm';

const ConfirmAddress = ({deliveryAddress,  setDeliveryAddress}) => {
  
  const { userData } = useSelector(state => state.auth);
  const address = userData.address;
  const [addAddress, setAddAddress] = useState(false);
  const refOne = useRef(null);

  const addressSelection = async (currentAddress) => {
    setDeliveryAddress(currentAddress); 
    const data = Array.from(document.getElementsByClassName("radio"));
    data.forEach((elem) => {
      elem.checked = false;
    });
    document.getElementById(currentAddress._id).checked = true;
  }
  
  useEffect(() => {
    function handleClick (e){
      if(refOne!=null && !refOne?.current?.contains(e.target)){
        setAddAddress(false);
      }
    }
    document.addEventListener("mousedown", handleClick)
  }, [addAddress])

  return (
    <Wrapper>

        <div>
          <button className="AddressCard_addAddressBtn__CwUtP" onClick={() => setAddAddress(true)}>
            <AiFillPlusSquare />
            <span>Add new address</span>
          </button>

          <div className="address-container">
            {
              address.length > 0 &&
              address.map((currentAddress, index) => {
                return (
                  <div className="address-card" key={index} onClick={() => addressSelection(currentAddress)} >
                    <div className="address-card-left"><input type='radio' className='radio' id={currentAddress._id}/></div>
                      <div className="address-card-right">

                        <div className="right-top">
                            <h2>{currentAddress.name}</h2>
                            <p>Mobile: <span>{currentAddress.phoneNo}</span></p>
                        </div>

                        <div className="right-bottom">
                          <p>{currentAddress.locality}, {currentAddress.landmark}, {currentAddress.address}, {currentAddress.state} - {currentAddress.pinCode}</p>
                        </div>

                      </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className={addAddress? "address_form show" : "address_form"} >
          <AddressForm {...{addAddress, setAddAddress, refOne}} />

        </div>

      {/* <div className="address-header">
        <h2>Delivery Address</h2>
      </div> */}
      {/* <NavLink to="/cart/checkout/addaddress"><button>Add New Address</button></NavLink> */}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 80%;
  margin: 0 auto;

  .AddressCard_addAddressBtn__CwUtP {
    align-items: center;
    border: 1px solid;
    cursor: pointer;
    display: flex;
    font-size: .85rem;
    gap: 0 1rem;
    justify-content: flex-start;
    min-width: 250px;
    padding: 2rem;
    background-color: rgba(255,255,255,.2);
    width: calc(100% - 4rem);
    span{
      font-size: 2rem;
      color: #627d98;
    }
    svg{
      font-size: 3rem;
    }
}

  .address-container{
    border-radius: 5px;
    min-width: 250px;
    .address-card{
      display: flex;
      gap: 2rem;
      padding: 1rem;
      border-radius: 5px;
      margin-bottom: .5rem;
      box-shadow: 0px 0px 2px 0px #000000;

      .address-card-right{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .right-top{
          display: flex;
          flex-direction: column;
          gap: .5rem;
          p{
            font-size: 1.2rem;
            font-weight: 700;
            span{
              font-weight: 400;
            }
          }

        }
        .right-bottom{
          width: 70%;
        }
      }
    }
  }

  button{
    color: #6262e4;
    background-color: white;
    border: none;
    margin: 1rem 0;
  }


  .address_form{
    display: none;
    position: absolute;
    top: -200rem;
    left: 0;
    visibility: hidden;
    z-index: -1;
    height: 100%;
    width: 100%;
    background-color: white;
    background-color: rgba(0, 0, 0, .3);
    transition: all .5s ease-in-out;
  }
  .show{
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    visibility: visible;
    top: 0rem;
    z-index: 101;
  }
  @media screen and (max-width: 750px) {
    width: 96%;
  }
`;

export default ConfirmAddress;
