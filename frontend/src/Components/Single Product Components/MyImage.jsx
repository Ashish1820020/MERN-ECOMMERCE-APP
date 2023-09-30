import React, { useEffect } from 'react'
import { useState } from 'react';
import styled from 'styled-components';

const MyImage = ({img}) => {

  const [currImage, setCurrImage] = useState(img[0]);

  // console.log(currImage);
  
  useEffect(() => {
    // setCurrImage(img[0]);
  }, [])
  

  return (
    <Wrapper className='product-image-inside'>

      <figure>
        <img src={currImage} alt={currImage.filename} />
      </figure>


      <div className="image-left">
        {
          img.map((currentImage,index)=>{
           
           return (
              <div className="left-images" key={index}>
                <figure  key={index}>
                  <img
                    src={currentImage}
                    alt={currImage.id} 
                    onClick={()=>setCurrImage(currentImage)}
                    key={index}
                    className='current-image'
                  />
                </figure>
              </div>
           )
          })
        }
      </div>
      
            
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  height: 100%;
  gap: 0;

/* image-left SECTION */
  .image-left{
    display: flex;
    /* flex-direction: column; */
    width: 100%;
    height: 20%;

    
    .left-images{
      height: 100%;
      width: 25%;
      padding: 2rem 1rem;
      border-top: 2px solid #D7C0AE;
      border-right: 2px solid #D7C0AE;
      &:last-child{
        border-right: none;
      }
      figure{
        height: 100%;
        img{
          width: 100%;
          padding: 4px;
          height: 100%;
          object-fit: contain;
        }
      }
      &:hover{
        border: 2px solid #525FE1;
        cursor: pointer;
      }
    }
  }


  figure{
    height: 80%;
    display: flex;
    justify-content: center;
    img{
      width: 82%;
      padding: 1rem 2rem;
      object-fit: contain;
    }
  }

  
`;
export default MyImage;
