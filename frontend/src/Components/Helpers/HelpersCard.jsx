import React, { useState } from 'react';
import './HelpersCard.sass';
import { getMediaUrl } from '../Utils/mediaUrl'
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
    ? getMediaUrl(imageUrl || photo)
    : '/imagenes/no-image.png';

  return (
    <div className='HelpersCard align-items' 
    style={{
      width: '260px',
      borderRadius: '5%',
      backgroundColor: '#EFEFEF',
      border: '20px solid white',
      marginTop: '125px',
      marginLeft: '25px',
      display: 'flex',
      flexDirection: 'column',  // Ajuste para distribuir el contenido verticalmente
      height: '28rem',  // Ocupa el 100% de la altura de la tarjeta
      
    }}
  >

        <div style={{ padding: '20px 0 0 0' }}>
          <img
            className='card-im'
            src={"https://cdn-icons-png.flaticon.com/512/6596/6596121.png"}
            alt='Portrait'
            style={{ width: '90px', height:'80px', borderRadius: '0px', marginRight: '10px', }}
          />
        </div>
        <div className='card-body d-flex flex-column'>
          <h5 className='helpers_card-title'>{name}</h5>
          <div>
            <p className='card-text'>{post}</p>
          </div>
          <div>
            <p className='card-text '>{lugar}</p>
          </div>
          <div>
            <p className='card-text'>{linke}</p>
          </div>
        </div>
      </div>
  );
};

export default HelpersCard;
