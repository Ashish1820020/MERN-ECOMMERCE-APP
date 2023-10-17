import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Work Sans", sans-serif;
}


html {
  font-size: 62.5%;
  scroll-behavior: smooth;
  overflow-x: hidden;
}

body {
  overflow-x: hidden;
   scrollbar-color: rgb(98 84 243);
    scrollbar-width: thin;
}

body::-webkit-scrollbar {
  width: 1.5rem;
}

body::-webkit-scrollbar-track {
   background-color: rgb(24 24 29);
}

body::-webkit-scrollbar-thumb {
 
  background: #fff;
    border: 5px solid transparent;
    border-radius: 9px;
    background-clip: content-box;
}

h1,
h2,
h3,
h4 {
   font-family: "Work Sans", sans-serif;
   color: black;
}

h1 {
  color: ${({ theme }) => theme.colors.heading};
  font-size: 4rem;
  font-weight: 900;
}

 h2 {
   color: ${({ theme }) => theme.colors.heading};
   font-size: 2.6rem;
   font-weight: 300;
   white-space: normal;
  
  }

h3 {
  font-size: 1.8rem;
  font-weight: 400;
}

p, button {
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.6rem;
  line-height: 1.5;
  font-weight:400;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}














/* ---------MAIN SECTION--------  */
.main-section{
  min-height: 80vh;
  width: 150rem;
  margin: 2rem auto;
}

/* BANNER SLIDER */
.slider{
  display: flex;
  justify-content: center;
  img{
    width: 100%;
    height: 24rem;
    /* border: 1px solid black; */
  }
}

.react-multiple-carousel__arrow{
  border-radius: 50%;
  z-index: 1;
  padding: 0;
  &::before{
    font-size: 2rem;
  }
  &:hover{
    background-color: white;
    color: black;
    box-shadow: 0 0px 10px 5px rgba(0, 0, 0, 0.5);
    &::before{
      color: black;
  }
  }
}
.react-multiple-carousel__arrow--right {
  right: 1.5rem;
}
.react-multiple-carousel__arrow--left {
  left: 1.5rem;
}




/* ----------------PRODUCTS SECTION------------------*/

/* PRODUCTS GRID VIEW CARD */
.card{
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  margin: auto auto;
  max-width: 92%;
  background-color: white;
  margin: 1rem auto;
  border-radius: 10px;
  box-shadow: 0 0px 2px 0px rgba(0, 0, 0, 0.5);
  height: 420px;
  
  .card-inside{
    height: 420px; //280
    
    .figure-container{
      height: 220px;
      
      .figure{
        padding: 10px;
        height: 100%;
        
        img{
            height: 13rem;
            background-color: transparent;
        }
      }
    }

    .data-container{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 86%;
      margin: 0 auto;
      height: 190px;
      div{
        h3{
          font-size: 1.6rem;
          color: black;
          text-transform: capitalize;
          font-weight: bold;
          margin-bottom: 1rem;
          padding-bottom: .5rem;
        }
      }
      p{
        font-size: 1.5rem;
      }
      .colors{
        display: flex;
        gap: .5rem;

      }
      .color{
        height: 3.6rem;
        width: 3.6rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        /* padding: 0.2rem; */
      }
      button{
        height: 2.5rem;
        width: 2.5rem;
        margin: 0;
        padding: 0;
        border: none;
        cursor: pointer;
        color: black;
        border-radius: 50%;
        box-shadow: 0px 0px 2px 1px black;
      }

      .card-data-price{
        color: tomato;
        font-size: 1.4rem;
        font-weight: 800;
      }
    }
  }
}


.out-of-stock{
  position: relative;
}
.out-of-stock:before {
    background: rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    color: white;
    content: "Out of Stock";
    cursor: not-allowed;
    display: grid;
    font-size: 2.3rem;
    font-weight: 800;
    height: 100%;
    left: 0;
    letter-spacing: 1.5px;
    place-items: center;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 2;
}



/* PAGINATION */

.pagination {
  margin: 15px auto;
  display: flex;
  list-style: none;
  outline: none;
  /* width: 20rem; */
  justify-content: center;
}
.pagination > .active > a{
  background-color: #47ccde ;
  border-color: #47ccde ;
  color: #fff;
}
.pagination > li > a{
  border: 1px solid #47ccde ;
  padding: 1rem 2rem;
  outline: none;
  cursor: pointer;
}
.pagination > .active > a, 
.pagination > .active > span, 
.pagination > .active > a:hover, 
.pagination > .active > span:hover, 
.pagination > .active > a:focus, 
.pagination > .active > span:focus{
  background-color: #47ccde ;
  border-color: #47ccde;
  outline: none ;
}
.pagination > li > a, 
.pagination > li > span{
  color: #47ccde
}
.pagination > li:first-child > a, 
.pagination > li:first-child > span, 
.pagination > li:last-child > a, 
.pagination > li:last-child > span{
  border-radius: unset
}
    


button{
  cursor: pointer;
}

.figure {
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: all 0.5s linear;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.2s linear;
    cursor: pointer;
    border-radius: 10px 10px 0 0;
  }
  &:hover::after {
    width: 100%;
  }
  &:hover img {
    transform: scale(1.12);
  }
  img {
    max-width: 90%;
    margin-top: 1.5rem;
    height: 11rem;
    transition: all 0.2s linear;
  }
}

.common-heading {
    font-size: 3.8rem;
    font-weight: 600;
    margin-bottom: 6rem;
    text-transform: capitalize;
  }

  .intro-data {
    margin-bottom: 0;
    text-transform: uppercase;
    color: #5138ee;
  }

.caption {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 4%;
    right: 8%;
    background-color: white;
    color: ${({ theme }) => theme.colors.helper};
    padding: 0.5rem;
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
    &:hover{
      background-color: #b3aaee;
      color: white;
    }
    .icon{
      height: 2.8rem;
      width: 2.8rem;
    }
    .icon-fill{
      color: red;
    }
  }



.stars{
  display: flex;
  align-items: center;
  gap: .1rem;
  p{
    display: inline-block;
    padding-left: 1rem;
  }
  .icon{
    height: 1.4rem;
    width: 1.4rem;
    color: orange;
  }
}

.amount-toggle{
  display: flex;
  align-items: center;
        
  button{
    padding: 1rem .4rem;
    height: 1rem;
    display: flex;
    align-items: center;
    background-color: rgba(40,116,240,255);;
    border: none;
      &:hover{
        cursor: pointer;
      }
      &:active{
        transform: scale(.98);
      }
  }
  
  .button-left{
    border-radius: 50px 0 0 50px;
    border-right: none;
    &:hover{
        /* border-right: none; */
    }
  }
  .button-right{
    border-radius: 0 50px 50px 0;
    border-left: none;
    &:hover{
        border-left: none;
    }
  }
  
}
.amount-style{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: bolder;
  border: 1px solid black;
  color: black;
  width: 3rem;
  height: 1.2rem;
  padding: .9rem 2rem ;
}




/*--------------REUSABLE CODE SECTION---------------*/


.btn-primary{
  background-color: tomato;
  color: white;
  border: none;
  padding: .6rem 1.6rem;
}
.icon{
  height: 4rem;
  width: 4rem;
}
.w-100{
  width: 100%;
}
.relative{
  position: relative;
}
.absolute{
  position: absolute;
}
.flex{
  display: flex;
  gap: 1rem;
}
.justify-between{
  justify-content: space-between;
}
.container {
  min-height: 74vh;
  max-width: 1680px;
  width: 79.6dvw;
  margin: 2rem auto;
  
}
.hero-section-container{
  display: flex;
  flex-direction: row;
}
.flex-row {
  display: flex;
  justify-content: space-between;
  /* gap: 9rem; */
}
.flex-column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.grid {
  display: grid;
  gap: 9rem;
}

.grid-two-column {
  grid-template-columns: repeat(2, 1fr);
}

.grid-three-column {
  /* grid-template-columns: repeat(4, 1fr); */
}

.grid-four-column{
   grid-template-columns: 1fr 1.2fr .5fr .8fr ;
}

.grid-five-column{
  grid-template-columns: repeat(5, 1fr);
}



.h-50{
  height: 50rem;
}
.h-60{
  height: 60rem;
}
.h-70{
  height: 70rem;
}
.h-90{
  height: 90rem;
}
.h-100{
  height: 100%;
}

.b-black{
  border: 2px solid black;
}


input, textarea{
  max-width: 50rem;
  color: ${({ theme }) => theme.colors.black};
  padding: 1.6rem 2.4rem;
  border: 1px solid rgba(98, 84, 243, 0.5);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
input{
  color: #5959ec;
}
textarea{
  font-size: 1.56rem;
}
input[type="submit"]{
  max-width: 16rem;
  margin-top: 2rem;
  background-color: ${({ theme }) => theme.colors.btn};
  color: ${({ theme }) => theme.colors.white};
  padding: 1.4rem 2.2rem;
  border-style: solid;
  border-width: .1rem;
  text-transform: uppercase;
  font-size: 1.8rem;
  cursor: pointer;
}

label{
  color: black;
}



tbody > tr >td{
  color: black;
  font-size: 1.8rem; 
  text-align: center;
}
thead > tr > td{
  color: black;
  font-size: 2rem;
  text-align: center;
}




.mobile-navbar-btn{
    position: absolute;
    top: -100rem;
    left: -100rem;
    z-index: 0;
    opacity: 0;
    visibility: hidden;
  }



@media (max-width: 1400px) {
  .container {
    width: 86%;
    /* padding: 0 3.2rem; */
  }
  h2{
    font-size: 22px;
  }
  h3{
    font-size: 14px;
  }
  h4{
    font-size: 22px;
  }

}
@media (max-width: 1250px) {
  .container {
    width: 90%;
  }
  h1{
    font-size: 26px;
  }
  h2{
    font-size: 20px;
  }
  h4{
    font-size: 20px;
  }
}

@media (max-width: 1100px) {
  .container {
    width: 96%;
  }
  h1{
    font-size: 24px;
  }
  h3{
    font-size: 12px;
  }
  thead > tr > td{
    font-size: 18px;
  }
}

@media (max-width: 930px) {
  .container {
    padding: 0 1rem;
  }
  h1{
    font-size: 21px;
  }
  h2{
    font-size: 1.8rem;
  }
  h3{
    font-size: 10px;
  }
  h4{
    font-size: 20px;
  }
  tbody > tr >td, p{
    font-size: 10px;
    span{
      font-size: 13px;
    }
  }
  thead > tr > td{
    font-size: 16px;
  }
  
  .list-card{
    min-height: 210px;
  }
}
@media (max-width: 550px) {
  h1{
    font-size: 1.7rem
  }
  h2{
    font-size: 1.4rem;
    font-weight: 700;
  }
  h3{
    font-size: 10px;
  }
  h4{
    font-size: 17px;
  }
  tbody > tr >td, p{
    span{
      font-size: 11px;
    }
  }
  thead > tr > td{
    font-size: 13px;
  }
}
@media (max-width: 420px) {
  .container {
    width: 99%;
    margin: 1rem auto;
  }
  h1{
    font-size: 1.4rem;
  }
  h2{
    font-size: 1.2rem;
    font-weight: 700;
  }
  h3{
    font-size: 9px;
  }
  h4{
    font-size: 15px;
  }
  tbody > tr >td, p{
    font-size: 9px;
  }
  thead > tr > td{
    font-size: 11px;
  }
}
@media (max-width: 380px){
  h2{
    font-size: 1rem;
    font-weight: 700;
  }
}

.grid{
  gap: 3.2rem;
}
.grid-two-column , .grid-three-column, .grid-four-column{
    grid-template-columns: 1fr;
  }

`;
