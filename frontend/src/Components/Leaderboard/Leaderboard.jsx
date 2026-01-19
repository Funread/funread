import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../../api/userPoints';
import './Leaderboard.css';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const leaderboardResponse = await getLeaderboard();
        setLeaderboard(leaderboardResponse);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError('Error loading ranking. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="leaderboard">
        <h1>Leaderboard</h1>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading ranking...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard">
        <h1>Leaderboard</h1>
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <div className="leaderboard">
        <h1>Leaderboard</h1>
        <div className="no-data-message">
          <p>No ranking data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard">
      <h1>🏆 Leaderboard</h1>
      <div className="table-container">
        <table className="leaderboard__table">
          <thead>
            <tr>
              <th>Pos.</th>
              <th>Name</th>
              <th className="hide-mobile">Last Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((item, index) => (
              <tr
                key={item.user_id}
                className={index < 3 ? `leaderboard__row--podium leaderboard__row--${index + 1}` : ''}
              >
                <td>
                  <span className="rank-number">{index + 1}</span>
                  {getRankIcon(index) && (
                    <span className="rank-icon">{getRankIcon(index)}</span>
                  )}
                </td>
                <td className="user-name">{item.name}</td>
                <td className="hide-mobile user-lastname">{item.lastname}</td>
                <td className="user-points">{item.total_points?.toLocaleString() || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;