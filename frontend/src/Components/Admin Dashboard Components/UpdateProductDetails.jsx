import axios from "axios";
import { toast } from "react-toastify";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  isError,
  isSingleLoading,
  updateProductList,
  updateSingleProductData,
} from "../../Store/Slices/ProductsSlice";
import Spinner from "../Utility Components/Spinner";

const UpdateProductDetails = ({ header }) => {
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
    featured: "",
  });
  const [colors, setColors] = useState({
    color1: "#000000",
    color2: "#000000",
    color3: "#000000",
    color4: "#000000",
  });
  const [bulletPoints, setBulletPoints] = useState({
    point1: "",
    point2: "",
    point3: "",
    point4: "",
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  
  const { categories } = useSelector((state) => state.filterType);
  const productData = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();





  // <----GET SINGLE PRODUCT DATA---->
  const getSingleProduct = async (id) => {
    dispatch(isSingleLoading());

    const res = await axios
      .get(`/api/v1/products/productlist/${id}`)
      .then((res) => {
        const singleProduct = res.data;
        dispatch(updateSingleProductData(singleProduct.product));
        return singleProduct.product;
      })
      .catch((err) => {
        dispatch(isError());
      });
    return res;
  };

  const getProduct = async () => {
    const data = await getSingleProduct(id);
    if (data) {
      const {
        name,
        category,
        company,
        price,
        rating,
        warranty,
        description,
        discount,
        stock,
        featured,
        colors,
        images,
        bulletHighlights,
      } = data;
      
      setState({
        name,
        category,
        company,
        price,
        rating,
        warranty,
        description,
        discount,
        stock,
        featured,
      });

      let colorObj = {};
      colors.forEach((color, index) => {
        if (color != null) {
          colorObj = { ...colorObj, [`color${index + 1}`]: color };
        }
      });
      setColors(colorObj);

     setPreviewImages(images);

      let bulletPointObj = {};
      bulletHighlights.forEach((point, index) => {
        if (point != null) {
          bulletPointObj = { ...bulletPointObj, [`point${index + 1}`]: point };
        }
      });
      setBulletPoints(bulletPointObj);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);



  // Finding only distinct values
  const controlDistinct = (obj) => {
    obj = [...new Set(obj)];
    const distinctValue = Object.values(obj).filter((currElem) => {
      return currElem !== "";
    });
    return distinctValue;
  };

  // <----UPDATING OF PRODUCT---->
  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    const distinctColor = controlDistinct(Object.values(colors));
    const distinctBulletPoints = controlDistinct(Object.values(bulletPoints));
    formData.append("colors", distinctColor);
    formData.append("id", id);
    formData.append("bulletHighlights", distinctBulletPoints);

    Object.keys(state).map((key) => {
      formData.append(key, state[key]);
    });
    
    images.forEach((image) => {
      formData.append('productImages', image);
    });
      
    setIsUpdateLoading(true);
    
    await axios.put(`/api/v1/products/updateproduct`, formData)
    .then((res) => {
      toast.success(res.data.msg);
      dispatch(updateProductList(res.data.data));
      navigate("/dashboard/admin/showallproducts");
    })
    .catch((err) => {
      setIsUpdateLoading(false);
      toast.error(err.response?.data.msg);
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
      setPreviewImages(imageArray)
    }
  };


    // <----HANDLING DELETION---->
  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    const promptValue = window.confirm(
      "Do you really want to delete this item?"
    );

    if (promptValue) {
      await axios.delete(`/api/v1/products/deleteproduct/${id}`)
      .then((res) => {
        toast.success(res.data.msg);
        dispatch(deleteProduct({ id }));
        navigate("/dashboard/admin/showallproducts")
      })
      .catch((err) => {
        toast.error(err.response?.data.msg);
      });
    }
  };





  if (productData.isSingleLoading) {
    return <Spinner />
  } 
  else if(isUpdateLoading){
    return <Spinner />
  }
  else {
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
              {Object.keys(colors).map((color, index) => {
                return (
                  <div className="w-25 flex-column" key={index}>
                    <input
                      type="color"
                      className="colors"
                      value={colors[color]}
                      placeholder="colors1"
                      onChange={(e) =>
                        setColors({ ...colors, [color]: e.target.value })
                      }
                    />
                  </div>
                );
              })}
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
            <label htmlFor="">Images:(Maximum 4 possible)(only jpg, jpeg or png format is accepted) </label>
            <div className="form-mid flex-row flex-wrap product-photo-container">
              <div className="w-50 flex-column" >
                <div id="update-product-image">
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
            <div className="form-mid flex-row flex-wrap">
              {Object.keys(bulletPoints).map((point, index) => {
                return (
                  <div className="w-50 flex-column" key={index}>
                    <input
                      type="text"
                      value={bulletPoints[point]}
                      placeholder="Point1"
                      onChange={(e) =>
                        setBulletPoints({
                          ...bulletPoints,
                          [point]: e.target.value,
                        })
                      }
                    />
                  </div>
                );
              })}
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
            <button type="submit" className="submit" onClick={handleSubmit}>
              UPDATE PRODUCT
            </button>
            <button
              type="delete"
              className="delete"
              onClick={handleDeleteProduct}
            >
              DELETE PRODUCT
            </button>
          </div>
        </form>
      </Wrapper>
    );
  }
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
    width: 10rem;
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
    display: flex;
    gap: 3rem;
    border: none;
    outline: none;
    button {
      font-size: 1rem;
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

  #update-product-image > input{
    display: flex;
    padding: 0%;
    height: 100%;
  }
  #update-product-image > input::file-selector-button{
    cursor: pointer;
    width: 100%;
    z-index: 2;
    height: 5vh;
    border: none;
    margin: 0%;
    font: 400 1.5rem cursive;
    transition: all 0.5s;
    padding: 0 1vmax;
    color: rgba(0, 0, 0, 0.623);
    background-color: rgb(255, 255, 255);
  }
  #update-product-image > input::file-selector-button:hover {
    background-color: rgb(235, 235, 235);
  }

  .product-photo-container{
    align-items: center;
    justify-content: center;
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
      /* margin: 0 auto; */
      padding: 0%;
    }
  }
`;
export default UpdateProductDetails;
