import React from 'react';
import './RV_ImageWithText.scss'; // Asegúrate de que el archivo SASS se importe correctamente

const RV_ImageWithText = ({ textbackgroundColor, textColor }) => {

  const style = {
    backgroundColor: textbackgroundColor,
    color: textColor,
 
  };

  return (
    <div>
    <div className="image-container">
      <img src="/imagenes/Libro1/1.png" alt="Mi Imagen" className="imagen" />
    </div>
    <div className="rv_text-image-container"  style={style} >
         <h1><strong>From Bullying to Friendship: The Costa Rican Connection</strong></h1>
      </div>
  </div>
  );
};
    
 
export default RV_ImageWithText;
