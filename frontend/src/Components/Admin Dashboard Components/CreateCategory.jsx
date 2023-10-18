import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify';
import axios from 'axios';
import { addCategory, updateCategories } from '../../Store/Slices/FilterTypeSlice';
import { useDispatch, useSelector } from 'react-redux';

const CreateCategory = () => {

  const { categories } = useSelector(state => state.filterType);
  const [ name, setName] = useState("");
  const [ categoryImg, setCategoryImg ] =useState("");
  const [imgPreview, setImgPreview] = useState("");
  const dispatch =  useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("categoryImg", categoryImg);

    await axios.post(`/api/v1/createcategory`, myForm)
    .then((res) => {
        toast.success(res.data.msg);
        dispatch(addCategory(res.data.newCategory))
    })
    .catch((err) => {
        toast.error(err.response?.data.msg);
        console.log(err);
    });
  }

  const updateCategoryImg = (e) => {
    setCategoryImg(e.target.files[0]);
    setImgPreview(URL.createObjectURL(e.target.files[0]));
  };



  return (
    <Wrapper className='right-inside'>
      <div className="category-top">
        <h2>Existing Categories: </h2>
       {
         <div className="list">
          { categories.map((currElem, index) =><button onClick={() => setValue({ ...value, name: currElem.name})} className="list-item" key={index}>{currElem.name}</button>) }
         </div>
       }
      </div>

      <div className="category-bottom">
        <h2>Add New Categories: </h2>
        <form className='form' encType="multipart/form-data" onSubmit={handleSubmit}>
          <input type="text" name='category' required value={name} placeholder='Category' onChange={(e) => setName(e.target.value)}/>
          <div id='file-input-container'>
            {
              imgPreview === ''?
              <></>
              :
              <img src={imgPreview} alt="img" />
            }
            <input type="file" name="categoryImg" accept="image/*" onChange={updateCategoryImg}/>
          </div>
          <button type='submit' className='submit'>Add</button>
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  padding: 2rem;
  
  .category-top,
  .category-bottom{
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

 
  
  .list, form{
    display: flex;
    gap: 1rem;
    margin: 1rem auto;
  }

  .list{
    flex-wrap: wrap;
    button{
      line-height: 1;
      padding: .8rem 1.3rem;
      box-shadow: 0 0 2px 0px #ccc;
    }
  }
  
  .form{
    justify-content: center;
    align-items: center;
    width: 80%;
    flex-direction: column;
    input { 
      color: #5959ec;
      padding: 1vmax 2vmax;
      padding-right: 1vmax;
      width: 80%;
      height: 80%;
      box-sizing: border-box;
      border: 1px solid rgba(0, 0, 0, 0.267);
      border-radius: 4px;
      outline: none;
    }
    #file-input-container{
      width: 80%;
      display: flex;
      gap: 2rem;
      margin: 0 auto;
      max-width: 50rem;
      justify-content: space-between;
      align-items: center;
    }
    #file-input-container > img{
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
    }
    #file-input-container > input{
      width: 100%;
      padding: 0%;
    }
    #file-input-container > input::file-selector-button {
      cursor: pointer;
      width: 100%;
      z-index: 2;
      height: 5vh;
      border: none;
      margin: 0%;
      font: 400 1.5rem;
      transition: all 0.5s;
      padding: 0 1vmax;
      color: rgba(0, 0, 0, 0.623);
      background-color: rgb(255, 255, 255);
    }

    #file-input.container > input::file-selector-button:hover {
      background-color: rgb(235, 235, 235);
    }
    
    button{
      padding: 1rem 6rem;
      border: none;
    }
  }

  .submit{
    color: white;
    background-color: rgba(40,116,240,255);
    &:hover{
      background-color: rgba(40,116,240,0.9);
    }
  }

`;

export default CreateCategory;
