import React from 'react';
import './RV_ImageWithText.scss'; // Asegúrate de que el archivo SASS se importe correctamente
import { BASE_URL } from '../../../settings';

const RV_ImageWithText = ({ textbackgroundColor, textColor , img  , text}) => {
 const imgpath=BASE_URL
  const style = {
    backgroundColor: textbackgroundColor,
    color: textColor,
 
  };
  console.log("here img")
  console.log(img.value)
  return (
    <div>
    <div className={"image-container"}>
      <img src={imgpath+img.value.data} alt="Mi Imagen" className="imagen" />
    </div>
    <div className="rv_text-image-container"  style={style} >
    
       
      </div>
  </div>
  );
};
    
 
export default RV_ImageWithText;
