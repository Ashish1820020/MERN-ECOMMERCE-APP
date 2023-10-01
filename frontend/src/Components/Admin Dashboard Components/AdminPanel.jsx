import React from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill} from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { Doughnut, Line } from "react-chartjs-2";
import { styled } from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function AdminPanel() {
   
  const { categories } = useSelector(state => state.filterType);
  const { allOrderData } = useSelector(state => state.order);
  const { allUsers } = useSelector(state => state.auth);
  const { products } = useSelector(state => state.product);

  var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];

  let totalAmount = 0, outOfStock = 0;
  allOrderData &&
  allOrderData.forEach((item) => {
    totalAmount += item.totalPrice;
    // console.log(item);
  });

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });
    
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#a121fc"],
        hoverBackgroundColor: ["#4B5000", "#531d6e"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };


  return (
    <Main className='main-container'>


      <div className='main-cards'>

        <div className='card'>
          <div className='card-inner'>
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className='card_icon'/>
          </div>
          <p>{products.length}</p>
        </div>

        <div className='card'>
          <div className='card-inner'>
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className='card_icon'/>
          </div>
          <p>{categories.length}</p>
        </div>

        <div className='card'>
          <div className='card-inner'>
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className='card_icon'/>
          </div>
          <p>{allUsers.length}</p>
        </div>

        <div className='card'>
          <div className='card-inner'>
            <h3>ORDERS</h3>
            <BsFillBellFill className='card_icon'/>
          </div>
          <p>{allOrderData.length}</p>
        </div>

      </div>


      <div className="charts">
        <div className="lineChart">
          <Line data={lineState} />
        </div>
        
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>


    </Main>
  )
}

const Main = styled.main`
grid-area: main;
color: rgba(255, 255, 255, 0.95);
display: flex;
flex-direction: column;
gap: 10rem;

.main-cards {
    display: flex;
    justify-content: space-between;
}

.card {
    display: flex;
    flex-direction: column;
    height: 12rem;
    margin: 0;
    width: 23%;
    border-radius: 5px;
}

.card:first-child {
    background-color: #2962ff;
}

.card:nth-child(2) {
    background-color: #ff6d00;
}

.card:nth-child(3) {
    background-color: #2e7d32;
}

.card:nth-child(4) {
    background-color: #d50000;
}
.card-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:  1.5rem;
}

.card-inner > .card_icon {
  font-size: 25px;
}

p, h3{
    font-weight: bolder;
    color: white;
}
p{
    font-size: 2.5rem;
    width: 88%;
    margin: 0 auto;
}


.charts{
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

.doughnutChart, .linechart{
  width: 100%;
}
  
@media screen and (max-width: 992px) {
  .grid-container {
    grid-template-columns: 1fr;
    grid-template-rows: 0.2fr 3fr;
    grid-template-areas:
      'header'
      'main';
  }

  #sidebar {
    display: none;
  }

  .menu-icon {
    display: inline;
  }

  .sidebar-title > span {
    display: inline;
  }
}
  
@media screen and (max-width: 768px) {
  .main-cards {
    grid-template-columns: 1fr;
    gap: 10px;
    margin-bottom: 0;
  }

  .charts {
    grid-template-columns: 1fr;
    margin-top: 30px;
  }
}

`

export default AdminPanel;

