import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faAward, faStar, faCamera, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Profile.css'; // Importar el archivo CSS
import { badgesData } from './data'; // Importar los datos de badges

const KidsProfile = ({ closeProfile }) => {// Recibe closeProfile como prop
  const [profileImage, setProfileImage] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6zpeYqtKpIWB_q0SY3NrtlQa9CEkvUtl6eA&s'); // Imagen por defecto


  // Manejar el cambio de imagen
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Establecer la imagen seleccionada
      };
      reader.readAsDataURL(file); // Leer el archivo como una URL de datos
    }
  };

  return (
    <div className="profile-body">
      {/* Botón de cierre en la esquina superior derecha */}


      <div className="profile-section fixed-profile-info">
        {/* Profile Section */}
        <div className="profile-close-container" >
          <FontAwesomeIcon
            icon={faTimes} // Icono de "X" para cerrar
            size="lg"
            onClick={closeProfile} // Llama la función pasada como prop para cerrar el perfil
            className="profile-close-icon"
          />
        </div>
        <div className="profile-card">
          <div className="profile-avatar-section">
            {/* Avatar */}
            <div className="profile-avatar">
              <img
                src={profileImage}
                alt="Profile"
                className="avatar-img"
              />
              {/* Ícono de cámara sobre la imagen */}
              <label htmlFor="file" className="camera-icon-label">
                <FontAwesomeIcon icon={faCamera} className="camera-icon" />
              </label>
            </div>

            {/* Botón invisible para cambiar la imagen */}
            <input
              type="file"
              id="file"
              onChange={handleImageChange}
              accept="image/*"
              className="image-input"
            />

            {/* Nombre */}
            <h2 className="profile-name">Aimar</h2>

            {/* Stats Cards */}
            <div className="profile-stats-horizontal">
              {/* Nivel */}
              <div className="stats-card">
                <div className="stats-content">
                  <div className="stats-text">
                    <div className="stats-label">Level</div>
                    <div className="stats-value">Aspirante</div>
                  </div>
                  <FontAwesomeIcon icon={faStar} className="stats-icon green" />
                </div>
              </div>

              {/* Total Points */}
              <div className="stats-card">
                <div className="stats-content">
                  <div className="stats-text">
                    <div className="stats-label">Total Points</div>
                    <div className="stats-value">12,000</div>
                  </div>
                  <FontAwesomeIcon icon={faTrophy} className="stats-icon blue" />
                </div>
              </div>

              {/* Total Badges */}
              <div className="stats-card">
                <div className="stats-content">
                  <div className="stats-text">
                    <div className="stats-label">Total Badges</div>
                    <div className="stats-value">{badgesData.length}</div>
                  </div>
                  <FontAwesomeIcon icon={faAward} className="stats-icon purple" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content (Badges Section) */}
      <div className="badges-section">
        <div className="badges-container">
          <h4>Badges</h4>

          {/* Badge container */}
          <div className="badges-grids">
            {badgesData.map((badge, index) => (
              <div key={index} className="badge-item">
                <div className={`badge-circle`}>

                  <div className="badge-icon">{badge.iconName}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsProfile;
