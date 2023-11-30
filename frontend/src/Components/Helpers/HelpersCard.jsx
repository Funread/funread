import React, { useState } from 'react';
import './HelpersCard.sass';

const getImage = 'http://localhost:8000'
const HelpersCard = ({
  id,
  imageUrl,
  photo,
  name,
  post,
  lugar,
  linke,

}) => {
  const imageCard = imageUrl || photo
    ? `${getImage}${imageUrl || photo}`
    : './imagenes/no-image.png';

  return (
    <div className='HelpersCard'
    style={{
      width: '260px',
      borderRadius: '5%',
      backgroundColor: '#EFEFEF',
      border: '20px solid white',
      marginTop: '125px',
      marginLeft: '25px',
      display: 'flex',
      flexDirection: 'column',  // Ajuste para distribuir el contenido verticalmente
      height: '75%',  // Ocupa el 100% de la altura de la tarjeta
      
    }}
  >
      <div className='align-items'>
        <div style={{ padding: '20px 0 20px 20px' }}>
          <img
            className='card-im'
            src={"https://cdn-icons-png.flaticon.com/512/6596/6596121.png"}
            alt='Portrait'
            style={{ width: '90px', height:'80px', borderRadius: '0px', marginRight: '10px', }}
          />
        </div>
        <div className='card-body d-flex flex-column justify-content-between'>
          <h5 className='helpers_card-title'>{name}</h5>
          <div>
            <h1 className='card-text'>{post}</h1>
          </div>
          <div>
            <h1 className='card-text '>{lugar}</h1>
          </div>
          <div>
            <h1 className='card-text'>{linke}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpersCard;
