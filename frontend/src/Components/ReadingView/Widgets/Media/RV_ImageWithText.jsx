import React from 'react';
import './RV_ImageWithText.scss'; // Asegúrate de que el archivo SASS se importe correctamente

const RV_ImageWithText = ({ textbackgroundColor, textColor , img  , text}) => {
 const imgpath="http://localhost:8000"
  const style = {
    backgroundColor: textbackgroundColor,
    color: textColor,
 
  };
  console.log("here")
  return (
    <div>
    <div className={"image-container"}>
      <img src={imgpath+img.data} alt="Mi Imagen" className="imagen" />
    </div>
    <div className="rv_text-image-container"  style={style} >
    <div dangerouslySetInnerHTML={{ __html: text.data }} />

       
      </div>
  </div>
  );
};
    
 
export default RV_ImageWithText;
