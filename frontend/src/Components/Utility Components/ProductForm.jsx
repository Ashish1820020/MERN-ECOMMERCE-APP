import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { addNewProduct } from "../../Store/Slices/ProductsSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";






const ProductForm = ({ header }) => {
    // <----STATES---->
    const [state, setState] = useState({
        name: "",
        category: "",
        company: "",
        price: 0,
        rating: "",
        warranty: "",
        description: "",
        discount: 0,
        stock: 0,
        featured: false,
    });


    const [color, setColor] = useState('#000000');
    const [colorsArray, setColorsArray] = useState([]);

    const [bulletPoint, setBulletPoint] = useState("");
    const [bulletPointsArray, setBulletPointsArray] = useState([]);

    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    
    const { categories } = useSelector((state) => state.filterType);
    const dispatch = useDispatch();
    const navigate =  useNavigate();

    const [ isLoading, setIsLoading] = useState(false);





    const handleSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData();

        formData.append("colors", colorsArray);
        formData.append("bulletHighlights", bulletPointsArray);

        
        Object.keys(state).map((key) => {
        formData.append(key, state[key]);
        });
        
        images.forEach((image) => {
        formData.append('newProductImages', image);
        });

        setIsLoading(true);

        await axios.post(`/api/v1/products/addproduct`, formData)
        .then((res) => {
            toast.success(res.data.msg);
            navigate('/dashboard/admin/showallproducts')
            dispatch(addNewProduct(res.data.newProduct))
        })
        .catch((err) => {
            toast.error(err.response?.data.msg);
            // console.log(err);
            setIsLoading(false);
        });
    };



    const handleImageSelect = (e) => {
        const uploaded = Array.from(e.target.files);

        const imageArray = [];
        
        if (uploaded.length > 4) {
        alert(`You can only add a maximum of 4 files`);
        setPreviewImages([]);
        setImages([]);
        }
        else{
        uploaded.forEach((image) => {
            imageArray.push(URL.createObjectURL(image))
        })
        setImages(uploaded);
        setPreviewImages(imageArray);
        }
    };

    // Finding only distinct values
    const controlDistinct = (arr) => {
        arr = [...new Set(arr)];
        const distinctValue = arr.filter((currElem) => {
          return currElem !== "";
        });
        return distinctValue;
    };
   
    const handlePointsAdd = (e) => {
        e.preventDefault()

        const distinctPoints = controlDistinct([...bulletPointsArray, bulletPoint]);
        setBulletPointsArray(distinctPoints);
        setBulletPoint("");
    }
    const handleColorsAdd = (e) => {
        e.preventDefault();
        const distinctColors = controlDistinct([...colorsArray, color]);
        setColorsArray(distinctColors);
        setColor('#000000');
    }



    if(isLoading){
      return <Spinner />
    }
    return (
      <Wrapper className="right-inside">
        <h2>{header}</h2>

        <form className="form" encType="multipart/form-data">
          <div className="form-top flex-column">
            <div className="w-100 flex-column">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                value={state.name}
                placeholder="Product Name"
                onChange={(e) => setState({ ...state, name: e.target.value })}
              />
            </div>
          </div>

          <div className="form-mid flex-row">
            <div className="w-50 flex-column">
              <label htmlFor="name">Category: </label>
              <select
                placeholder="Select a category"
                value={state.category}
                onChange={(e) =>
                  setState({ ...state, category: e.target.value })
                }
              >
                <option value="000"> select category </option>
                {categories?.map((currElem) => {
                  return (
                    <option key={currElem._id} value={currElem._id}>
                      {" "}
                      {currElem.name}{" "}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="w-50 flex-column">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                value={state.company}
                placeholder="Company Name"
                onChange={(e) =>
                  setState({ ...state, company: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-mid flex-row">
            <div className="w-30 flex-column">
              <label htmlFor="rating">Rating</label>
              <input
                type="number"
                value={state.rating}
                placeholder="Rating"
                onChange={(e) => setState({ ...state, rating: e.target.value })}
              />
            </div>

            <div className="w-30 flex-column">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                value={state.price}
                placeholder="Price"
                onChange={(e) => setState({ ...state, price: e.target.value })}
              />
            </div>

            <div className="w-30 flex-column">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                value={state.stock}
                placeholder="Stock"
                onChange={(e) => setState({ ...state, stock: e.target.value })}
              />
            </div>
          </div>

          <div className="form-mid flex-column">
            <label htmlFor="">Colors: </label>

            <div className="form-mid flex-row">
                <div className="w-25 flex-column">
                    <input
                        type="color"
                        className="colors"
                        value={color}
                        placeholder="colors1"
                        onChange={(e) =>
                        setColor(e.target.value)
                        }
                    />
                </div>
                <button className="add" onClick={handleColorsAdd}>add</button>
                <div className="w-50 flex-row" style={{ marginLeft: '2rem'}}>
                    {
                      colorsArray.map((col) => {
                          return <div className="color" key={col}><button style={{backgroundColor: `${col}`,height:'3rem', width: '3rem', fontSize:'1em'}}></button></div>
                      })
                    }
                </div>
            </div>
          </div>

          <div className="form-mid flex-row">
            <div className="w-50 flex-column">
              <label htmlFor="">Discount: </label>
              <input
                type="number"
                value={state.discount}
                placeholder="Discount"
                onChange={(e) =>
                  setState({ ...state, discount: e.target.value })
                }
              />
            </div>

            <div className="w-50 flex-column">
              <label htmlFor="">Warranty: </label>
              <input
                type="text"
                value={state.warranty}
                placeholder="Warranty"
                onChange={(e) =>
                  setState({ ...state, warranty: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-mid flex-column">
            <label htmlFor="">Images:(Maximum 4 possible) (only jpg, jpeg or png format is accepted)</label>
            <div className="form-mid flex-row flex-wrap">
              <div className="w-50 flex-column" >
                <div id="update-profile-image">
                  <input
                    type="file"
                    id="image-input"
                    name="productImages"
                    multiple
                    accept="image/*"
                    onChange={handleImageSelect}
                  />
                </div>
              </div>
              <div className="w-50 flex-row">
              {
                previewImages.map((image, index) => {
                  return (
                    <div className="w-25" key={index}>
                      <img src={image} style={{width: '100%', height: '80px', border: '1px solid black', objectFit: 'contain'}} alt="" />
                    </div>
                  )
                })
              }
              </div>
            </div>
          </div>

          <div className="form-mid flex-column">
            <label htmlFor="Bullet Points">Points: </label>
            <div className="form-mid flex-column flex-wrap">
                <div className="w-50 flex-row" >
                    <input
                        type="text"
                        value={bulletPoint}
                        placeholder="Point"
                        onChange={(e) =>setBulletPoint(e.target.value)}
                    />
                    <button className="add" disabled={bulletPointsArray.length > 3} onClick={handlePointsAdd}>add</button>
                </div>
                <div className="w-50 flex-row" >
                    <div className="w-50 flex-column" style={{ marginLeft: '2rem'}}>
                        {
                          bulletPointsArray.map((point, index) => {
                              return (
                                <div className="color" key={index}>
                                    <p style={{color: 'green'}}>{index}: {point}</p>
                                </div>
                              )
                          })
                        }
                    </div>
                </div>
            </div>
          </div>

          <div className="form-bottom flex-column">
            <div className="w-100 flex-column">
              <label htmlFor="">Description: </label>
              <textarea
                type="text"
                className="description"
                value={state.description}
                placeholder="description"
                onChange={(e) =>
                  setState({ ...state, description: e.target.value })
                }
              />
            </div>

            <div className="featured-box">
              <input
                type="checkbox"
                className="featured"
                checked={state.featured}
                placeholder="Featured"
                onChange={(e) => {
                  setState({ ...state, featured: e.target.checked });
                }}
              />
              <label htmlFor="">Featured Product </label>
            </div>
          </div>
          <div className="buttons">
            <button type="submit" className='submit' onClick={handleSubmit}>ADD PRODUCT</button>
          </div>

        </form>
      </Wrapper>
    )
};

const Wrapper = styled.div`
  padding: 2rem;

  h2 {
    text-align: center;
    margin-bottom: 3rem;
  }
  label {
    font-size: 1.4rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 2rem;

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
        gap: 1rem;
      }
    }
  }

  input {
    width: 100%;
  }
  textarea {
    height: 24rem;
    width: 100%;
    max-width: 80rem;
    margin: 2rem auto;
  }
  .colors {
    border: none;
    background: none;
    box-shadow: none;
    width: 100%;
    height: 5rem;
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
  .buttons {
    width: 80rem;
    display: flex;
    gap: 3rem;
    button {
      padding: 1rem 4rem;
      color: white;
    }
    .submit {
      background-color: #6c6cdb;
      &:hover {
        background-color: #8686da;
      }
    }
    .delete {
      background-color: #d55c5c;
      &:hover {
        background-color: #e97c7c;
      }
    }
  }

  select {
    width: 100%;
    height: 5rem;
    text-transform: capitalize;

    option {
      font-size: 1.8rem;
    }
  }
  
  .add{ 
    background-color: #6c6cdb;
    color: white;
    padding: .1rem 2rem;
    height: 50%;
    margin: auto 2rem;
    border: none;
      &:hover {
        background-color: #8686da;
      }
  }

  /* REUSABLE CLASSES */
  .flex-row {
    display: flex;
    justify-content: start;
    gap: 1rem;
  }
  .flex-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .w-50 {
    width: 47%;
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

  #update-profile-image {
    display: flex;
  }
  #update-profile-image > input {
    border: none;
    box-shadow: 0 0 0 0 black;
  }



  #image-input{
    width: 120px;
    height: 40px;
    overflow: hidden;
  }
  @media (max-width: 560px) {
    .form-mid {
      gap: 2rem;
    }
  }
  @media (max-width: 420px) {
    .flex-wrap > .w-50 {
      width: 90%;
    }
    .colors {
      width: 100%;
      height: 3rem;
      padding: 0%;
    }
  }
`;


export default ProductForm
