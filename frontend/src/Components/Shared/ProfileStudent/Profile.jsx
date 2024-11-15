import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faAward, faStar, faCamera, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';
import { fetchUserData, fetchUserBadges } from './data'; 

const KidsProfile = ({ closeProfile }) => {
  const [profileImage, setProfileImage] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6zpeYqtKpIWB_q0SY3NrtlQa9CEkvUtl6eA&s');
  const [userData, setUserData] = useState(null); // Inicializamos `userData` como `null`
  const [badges, setBadges] = useState([]); // Inicializamos `badges` como un array vacío
  const userId = 0; // Cambia el ID del usuario según corresponda

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData(userId);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user level and points:", error);
      }
    };

    const getUserBadges = async () => {
      try {
        const badgesData = await fetchUserBadges(userId);
        setBadges(badgesData);
      } catch (error) {
        console.error("Error fetching user badges:", error);
      }
    };

    getUserData();
    getUserBadges();
  }, [userId]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-body">
      <div className="profile-section fixed-profile-info">
        <div className="profile-close-container">
          <FontAwesomeIcon
            icon={faTimes}
            size="lg"
            onClick={closeProfile}
            className="profile-close-icon"
          />
        </div>
        <div className="profile-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <img src={profileImage} alt="Profile" className="avatar-img" />
              <label htmlFor="file" className="camera-icon-label">
                <FontAwesomeIcon icon={faCamera} className="camera-icon" />
              </label>
            </div>

            <input
              type="file"
              id="file"
              onChange={handleImageChange}
              accept="image/*"
              className="image-input"
            />

            <h2 className="profile-name">Aimar</h2>

            {/* Stats Cards */}
            <div className="profile-stats-horizontal">
              <div className="stats-card">
                <div className="stats-content">
                  <div className="stats-text">
                    <div className="stats-label">Level</div>
                    <div className="stats-value">{userData ? userData.level : 'Loading...'}</div>
                  </div>
                  <FontAwesomeIcon icon={faStar} className="stats-icon green" />
                </div>
              </div>

              <div className="stats-card">
                <div className="stats-content">
                  <div className="stats-text">
                    <div className="stats-label">Total Points</div>
                    <div className="stats-value">{userData ? userData.total_points : 'Loading...'}</div>
                  </div>
                  <FontAwesomeIcon icon={faTrophy} className="stats-icon blue" />
                </div>
              </div>

              <div className="stats-card">
                <div className="stats-content">
                  <div className="stats-text">
                    <div className="stats-label">Total Badges</div>
                    <div className="stats-value">{Array.isArray(badges) ? badges.length : 0}</div>
                  </div>
                  <FontAwesomeIcon icon={faAward} className="stats-icon purple" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="badges-section">
        <div className="badges-container">
          <h4>Badges</h4>
          <div className="badges-grids">
            {Array.isArray(badges) && badges.map((badge, index) => (
              <div key={index} className="badge-item">
                <div className="badge-circle">
                  <div className="badge-icon">{badge.iconName || "Default Icon"}</div>
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








