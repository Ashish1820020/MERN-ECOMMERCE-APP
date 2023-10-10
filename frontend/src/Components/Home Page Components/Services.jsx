import styled from "styled-components";
import { TbTruckDelivery, TbTruckReturn } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { RiCustomerService2Fill, RiSecurePaymentLine } from "react-icons/ri";

const Services = () => {
  return (
    <Wrapper className="container ">
      <div className="services flex-row">

        <div className="service">
          <div  >
            <RiCustomerService2Fill className="icon" />
          </div>
          <div>
            <h3>Super Fast and Free Delivery</h3>
            <p>Online Support 24/7</p>
          </div>
        </div>

        <div className="service">
          <div  >
            <TbTruckDelivery className="icon" />
          </div>
          <div>
            <h3>Free Worldwide Shipping</h3>
            <p>On Order Over $49</p>
          </div>
        </div>

        <div className="service">
          <div  >
            <GiReceiveMoney className="icon" />
          </div>
          <div>
            <h3>Money-back Guaranteed</h3>
            <p>100% Secure Payment</p>
          </div>
        </div>


        <div className="service">
          <div>
            <TbTruckReturn className="icon" />
          </div>
          <div>
            <h3>Free Returns</h3>
            <p>Returns are free within 10 days</p>
          </div>
        </div>

      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 2rem;
  min-height: 30rem;
  
  .service{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 3rem 0.5rem;
    width: 24%;
    border-radius: 5px;
    box-shadow: 0 0px 2px 0px rgba(0, 0, 0, 0.5);
  }
  
  
  .service>div:first-child{
    padding: 1rem;
    background-color: #d8d8d8;
    border-radius: 50%;
    margin-right: 1rem;
  }
  
  .service>div:last-child{
    display: flex;
    flex-direction: column;
  }
  .icon {
    width: 4rem;
    height: 4rem;
    color: black;
    &:hover{
      cursor: pointer;
    }
  }


  h3 {
    display: inline;
    font-weight: 600;
  }
  p{
    display: inline;
  }
  
  
@media (max-width: 1250px) {
  .service{
    flex-direction: column;
  }
  h3{
    text-align: center;
  }
  .service>div:last-child{
    margin-top: 1.5rem;
    align-items: center;
  }
}

@media (max-width: 544px) {
  .services{
    flex-wrap: wrap;
  }
  .service{
    width: 45%;
    margin: 2rem 0;
  }
}

@media (max-width: 465px) {
  .services{
    flex-direction: column;
  }
  .service{
    width: 94%;
    margin: 2rem auto;
  }
  .service > div{
    h3{
      font-size: 15px;
    }
    p{
      font-size: 14px;
    }
  }
  .service > div> .icon {
    height: 5rem;
    width: 5rem;
  }
}
`;
export default Services;