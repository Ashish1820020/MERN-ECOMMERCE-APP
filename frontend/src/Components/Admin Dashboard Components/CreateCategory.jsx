import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify';
import axios from 'axios';
import { addCategory, updateCategories } from '../../Store/Slices/FilterTypeSlice';
import { useDispatch, useSelector } from 'react-redux';

const CreateCategory = () => {

  const { categories } = useSelector(state => state.filterType);
  const [value, setValue] = useState({name: "", description: ""});
  const dispatch =  useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`/api/v1/createcategory`, value)
    .then((res) => {
        toast.success(res.data.msg);
        dispatch(addCategory(res.data.newCategory))
    })
    .catch((err) => {
        toast.error(err.response?.data.msg);
        console.log(err);
    });
  }



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
        <form className='form' onSubmit={handleSubmit}>
          <input type="text" name='category' required value={value.name} placeholder='Category' onChange={(e) => setValue({...value, name: e.target.value})}/>
          <textarea type="text" name='description' value={value.description} placeholder='Description' onChange={(e) => setValue({...value, description: e.target.value})}/>
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
    input, textarea{
      width: 80%;
    }
    textarea{
      height: 10rem;
    }
    button{
      padding: 1rem 6rem;
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

export default CreateCategory
