import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct } from "../../Store/Slices/ProductsSlice";


const Form = ({header}) => {

  const dispatch =  useDispatch();

  
  // -------STATES--------
  const [state, setState] = useState({name: '', category: '', company: '', price: 0, rating: '', warranty: '', description: '', discount: 0, stock: 0, featured: ''});
  const [colors, setColors] = useState({  color1: "#000000", color2: "#000000", color3: "#000000", color4: "#000000" });
  const [bulletPoints, setBulletPoints] = useState({ point1: "", point2: "", point3: "", point4: "" });
  const [images, setImages] = useState({ image1:"", image2: "", image3: "", image4: "" });
  const {categories} = useSelector(state => state.filterType);
    


  // Finding only distinct values
  const controlDistinct = (obj) => {
    obj = [...new Set(obj)]
    const distinctValue = Object.values(obj).filter((currElem) => {
      return currElem !== "";
    });
    return distinctValue;
  }
  


  // <----ADD NEW PRODUCT---->
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const distinctColor = controlDistinct(Object.values(colors));
    const distinctBulletPoints = controlDistinct(Object.values(bulletPoints));
    const distinctImages = controlDistinct(Object.values(images));

    let value = {...state, colors: distinctColor, bulletHighlights: distinctBulletPoints, images: distinctImages};
    console.log(value);
    await axios.post(`${import.meta.env.VITE_ROOT_API}/products/addproduct`, value)
    .then((res) => {
        toast.success(res.data.msg);
        console.log(res.data.newProduct);

        dispatch(addNewProduct(res.data.newProduct))
    })
    .catch((err) => {
        toast.error(err.response?.data.msg);
        console.log(err);
    });
  };




  return (
    <Wrapper className="right-inside">
      <h3>{header}</h3>

      <form className="form" >

        <div className="form-top flex-column">
          <div className="w-50 flex-column">
            <label htmlFor="name">Name: </label>
            <input type="text" value={state.name} placeholder="Product Name" onChange={e => setState({...state, name: e.target.value})} />
          </div>
        </div>

          
        <div className="form-mid flex-row">
          <div className="w-50 flex-column">
            <label htmlFor="name">Category: </label>
            <select placeholder="Select a category" value={state.category} onChange={(e)=>setState({...state, category: e.target.value})}>
              <option value="000" > select category </option>
              {
                categories?.map((currElem) => {
                  return <option key={currElem._id} value={currElem._id} > {currElem.name} </option>
                })
              }
            </select>
          </div>

          <div className="w-50 flex-column">
            <label htmlFor="company">Company</label>
            <input type="text" value={state.company} placeholder="Company Name" onChange={(e)=>setState({...state, company: e.target.value})} />
          </div>
        </div>


        <div className="form-mid flex-row">
          <div className="w-30 flex-column">
            <label htmlFor="rating">Rating</label>
            <input type="number" value={state.rating} placeholder="Rating"onChange={(e)=>setState({...state, rating: e.target.value})}/>
          </div>

          <div className="w-30 flex-column">
            <label htmlFor="price">Price</label>
            <input type="number" value={state.price} placeholder="Price" onChange={(e)=>setState({...state, price: e.target.value})}/>
          </div>

          <div className="w-30 flex-column">
            <label htmlFor="stock">Stock</label>
            <input type="number" value={state.stock} placeholder="Stock" onChange={(e)=>setState({...state, stock: e.target.value})}/>
          </div>
        </div>

        
        <div className="form-mid flex-column">
            <label htmlFor="">Colors: </label>

          <div className="form-mid flex-row">
            {
              Object.keys(colors).map((color, index) => {
                return (
                  <div className="w-25 flex-column"  key={index}>
                    <input type="color" className="colors" value={colors[color]} placeholder="colors1" onChange={(e)=>setColors({...colors, [color]: e.target.value})}/>
                  </div>
                )
              })
            }
          </div>
        </div>


        <div className="form-mid flex-row">
          <div className="w-50 flex-column">
            <label htmlFor="">Discount: </label>
            <input type="number" value={state.discount} placeholder="Discount" onChange={(e)=>setState({...state, discount: e.target.value})}/>
          </div>

          <div className="w-50 flex-column">
            <label htmlFor="">Warranty: </label>
            <input type="text" value={state.warranty} placeholder="Warranty" onChange={(e)=>setState({...state, warranty: e.target.value})}/>
          </div>
        </div>


        <div className="form-mid flex-column">
          <label htmlFor="">Images: </label>
          <div className="form-mid flex-row flex-wrap">
            {
              Object.keys(images).map((image, index) => {
                return(
                  <div className="w-50 flex-column"  key={index}>
                    <input type="url" value={images[image]} placeholder="Images Url1" onChange={(e) => setImages({...images, [image]: e.target.value})}/>
                  </div>
                )
              })
            }
          </div>
        </div>


        <div className="form-mid flex-column">
          <label htmlFor="Bullet Points">Points: </label>
          <div className="form-mid flex-row flex-wrap">
            {
              Object.keys(bulletPoints).map((point, index) => {
                return(
                  <div className="w-50 flex-column" key={index}>
                    <input type="text" value={bulletPoints[point]} placeholder="Point1" onChange={(e) =>  setBulletPoints({...bulletPoints, [point]: e.target.value})}/>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className="form-bottom flex-column">
          <div className="w-100 flex-column">
            <label htmlFor="">Description: </label>
            <textarea type="text" className="description" value={state.description} placeholder="Description" onChange={ (e) => setState({...state, description: e.target.value}) }/>
          </div>

          <div className="featured-box">
            <input type="checkbox" className="featured"  checked={state.featured} placeholder="Featured" onChange={(e)=>setState({...state, featured: e.target.checked})} />
            <label htmlFor="">Featured Product </label>
          </div>
        </div>

        <div className="buttons">
          <button type="submit" className='submit' onClick={handleSubmit}>ADD PRODUCT</button>
        </div>

      </form>
    </Wrapper>
    )
  }


const Wrapper = styled.div`
  padding: 2rem;

  h3{
    text-align: center;
  }
  label{
    font-size: 1.4rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 0 3rem;

    .form-inside {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      gap: 4rem;
      margin-top: 5rem;
      .form-top {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
      .form-mid {
        display: flex;
        gap: 2rem;
      }
    }
  }


  input, textarea {
    border-radius: 5px;
  }
  input {
    width: 100%;
  }
  textarea {
    height: 24rem;
    width:100%;
    max-width: 80rem;
    margin: 2rem auto;
  }
  .colors {
    border: none;
    background: none;
    box-shadow: none;
    width: 100%;
    height: 5rem;
    margin: 0 auto;
    padding: 0%;
  }

  .featured-box {
    display: flex;
    gap: 2rem;
  }
  .featured {
    box-shadow: none;
    height: 1.5rem;
    width: 1.5rem;
  }
  .buttons{
    width: 80rem;
    display: flex;
    gap: 3rem;
    button{
      padding: 1rem 4rem;
      color: white;
    }
    .submit {
      background-color: #6c6cdb;
      &:hover {
        background-color: #8686da;
      } 
    }
    .delete{
      background-color: #d55c5c;
      &:hover {
        background-color: #e97c7c;
      }
    }
  }

  select{
    width: 100%;
    height: 5rem;
    text-transform: capitalize;
    
    option{
      font-size: 1.8rem;
    }
  }



  /* REUSABLE CLASSES */
  .flex-row {
    display: flex;
  }
  .flex-column {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  .flex-wrap{
    flex-wrap: wrap;
  }
  .w-50 {
    width: 45%;
    margin: 1rem 0;
    gap: 1rem;
  }
  .w-30 {
    gap: 1rem;
    width: 30%;
  }
  .w-100 {
    gap: 1rem;
  }
  .w-25 {
    gap: 1rem;
    width: 20%;
  }

  
  @media (max-width: 560px) {
   .form-mid{
    gap: 2rem;
   }
  }
  @media (max-width: 420px) {
    
   .flex-wrap > .w-50{
    width: 90%;
   }
   .colors {
    width: 100%;
    height: 3rem;
    /* margin: 0 auto; */
    padding: 0%;
  }
  }
`;
export default Form;