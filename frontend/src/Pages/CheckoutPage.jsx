import React, { useEffect, useState } from 'react'
import {MdLocalShipping} from "react-icons/md";
import {MdLibraryAddCheck} from "react-icons/md";
import {MdOutlineAccountBalance} from  "react-icons/md";
import { styled } from 'styled-components';
import ConfirmOrder from '../Components/Cart Sections/OutletSection/ConfirmOrder';
import ConfirmAddress from '../Components/Cart Sections/OutletSection/AddressContainer';
import axios from 'axios';
import PaymentPage from '../Components/Cart Sections/OutletSection/PaymentPage';

const steps = [
  {
    label: <div>Shipping Details</div>,
    icon: <MdLocalShipping className='icon' />
  },
  {
    label: <div>Confirm Order</div>,
    icon: <MdLibraryAddCheck className='icon' />
  },
  {
    label: <div>Payment</div>,
    icon: <MdOutlineAccountBalance className='icon' />
  },
];



const CheckoutPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [clientToken, setClientToken] = useState("");
    const [ deliveryAddress,  setDeliveryAddress ] = useState({});

    const totalSteps = steps.length;
    const width = `${(100 / (totalSteps - 1)) * activeStep}%`;


    //get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/v1/payment/braintree/token");
            // console.log(data);
            setClientToken(data?.clientToken);
        } catch (error) {
            // console.log(error);
        }
    };

    useEffect(() => {
        getToken();
    }, []);
  

  return (
    <Fragment width={width} >

        <div className="container">
            <div className='dot-container'>
                {
                    steps.map((item, index) => (
                        <div className="dot" key={index}>
                            <div className="dot-inside">
                                <div className="dot-top-section">{item.icon}</div>
                            </div>
                            <div className="dot-bottom-section">{item.label}</div>
                        </div>
                    ))
                }
            </div>

            <div className="outlet-section">
                {
                    activeStep === 0?
                        <ConfirmAddress  {...{deliveryAddress,  setDeliveryAddress}}/>
                    : 
                    (activeStep === 1)?
                        <ConfirmOrder {...{activeStep, setActiveStep}} />
                    :
                    <PaymentPage {...{clientToken, deliveryAddress}}/>
                }
            </div>

            <div className="button-section flex-row">
                <button onClick={() => setActiveStep(activeStep - 1)} disabled={activeStep <= 0}>Back</button>
                <button onClick={() => setActiveStep(activeStep + 1)} 
                disabled={activeStep !== totalSteps-1? Object.keys(deliveryAddress).length === 0? true : false : true }>Next</button>
            </div>

        </div>
        
    </Fragment>
  )
};





const Fragment = styled.div`
    display: flex;
    justify-content: space-between;
    width: 60%;
    padding: 2rem;
    margin: auto;

    .left-sc{
        width: 80%;
        margin: 0 auto;
        background-color: white;
        padding: 2rem;
    }

    .dot-container{
        display: flex;
        justify-content: space-between;
        position: relative; 
        &:before {
            content: '';
            position: absolute;
            background: #f3e7f3;
            height: 4px;
            width: calc(100% - 95px);
            top: 40%;
            transform: translateY(-50%);
            left: 55px;
        }
        &:after {
            content: '';
            position: absolute;
            background: #4a154b;
            height: 4px;
            width: calc(${({width}) => width} - 55px);
            /* z-index: -1; */
            top: 40%;
            transition: 0.4s ease;
            transform: translateY(-50%);
            left: 55px;
        }
    }
    .dot{
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1;
        .dot-inside{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #f3e7f3;
            ${({ step }) => (step === 'completed' ? '#4A154B' : '#F3E7F3')};
            transition: 0.4s ease;
            .icon{
                height: 2.5rem;
                width: 2.5rem;
            }
        }
    }

    .outlet-section{
        width: 100%;
        margin: 3rem 0;
    }

    .button-section {
        margin-top: 4rem;
    }
    .button-section > button {
        padding: .3rem 3rem;
        background-color: rgba(40,116,240,255);
        color: white;
        border: none;
    }
    .button-section > button:disabled {
        visibility: none;
        opacity: 0;
    }

    @media screen and (max-width: 770px) {
        width: 80%;
    }
    @media screen and (max-width: 550px) {
        width: 100%;
    }
`;

export default CheckoutPage;



















// return (
//     <Fragment>
//         <StepsContainer width={width}>
//         {
//             steps.map((item, index) => (
//                 <Steps className="dot" key={index}>
//                     <DotInside className="dot-inside">
//                         <div className="dot-top-section">{item.icon}</div>
//                     </DotInside>
//                     <div className="dot-bottom-section">{item.label}</div>
//                 </Steps>
//             ))
//         }
//         </StepsContainer>
//         <button onClick={prevStep} disabled={activeStep === 1}>Previous</button>
//         <button onClick={nextStep} disabled={activeStep === totalSteps}>Next</button>
//     </Fragment>
//   )
// };





// const Fragment = styled.div`
//     width: 100rem;
//     margin: 2rem auto;
// `;

// const StepsContainer = styled.div`
//     display: flex;
//     justify-content: space-between;
//     position: relative; 
//     &:before {
//         content: '';
//         position: absolute;
//         background: #f3e7f3;  
//         z-index: -1;
//         height: 4px;
//         width: calc(100% - 95px);
//         top: 40%;
//         transform: translateY(-50%);
//         left: 55px;
//     }
//     &:after {
//         content: '';
//         position: absolute;
//         background: #4a154b;
//         height: 4px;
//         width: ${ ({width}) => width };
//         z-index: -1;
//         top: 40%;
//         transition: 0.4s ease;
//         transform: translateY(-50%);
//         left: 55px;
//     }
// `;

// const Steps = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// `;

// const DotInside = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 40px;
//     height: 40px;
//     border-radius: 50%;
//     background-color: #f3e7f3;
//     ${({ step }) => (step === 'completed' ? '#4A154B' : '#F3E7F3')};
//     transition: 0.4s ease;
//     .icon{
//         height: 2.5rem;
//         width: 2.5rem;
//     }
// `;

// export default CheckoutPage


/* 

    .MuiStepConnector-line {
        display: none !important;
    }

    .MuiStepConnector-root {
        height: 1px;
        background-color: rgba(0, 0, 0, 0.349);
    }

    .MuiStepConnector-active,
    .MuiStepConnector-completed {
        background-color: tomato;
    } */
