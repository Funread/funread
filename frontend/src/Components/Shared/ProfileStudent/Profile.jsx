import React, { useEffect, useState } from 'react';
import './Profile.css';
import { getUserLevelAndPoints } from '../../../api/profile'; 

const Profile = () => {
  const [levelAndPoints, setLevelAndPoints] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLevelAndPoints = async () => {
      try {
        const userLevelAndPoints = await getUserLevelAndPoints();
        setLevelAndPoints(userLevelAndPoints);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data.');
      }
    };

    fetchLevelAndPoints();
  }, []);

  if (error) {
    return <div className="profile-error">Error: {error}</div>;
  }

  if (!levelAndPoints) {
    return <div className="profile-loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Welcome, User!</h2>
      <div className="profile-level-points">
        <p>Level: {levelAndPoints.level}</p>
        <p>Total Points: {levelAndPoints.total_points}</p>
      </div>
    </div>
  );
};

export default Profile;
