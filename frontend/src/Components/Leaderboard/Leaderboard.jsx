import React, { useState } from 'react';
import { useEffect } from 'react';
import { getLeaderboard } from '../../api/userPoints';

import './Leaderboard.css';


function Leaderboard() {

  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchLeaderboard = async () => {
      try {
        const leaderboardResponse = await getLeaderboard();
        console.log('Leaderboard data:', leaderboardResponse);
        setLeaderboard(leaderboardResponse);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="leaderboard__table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((item, index) => (
              <tr
                key={item.user_id}
                className={index === 0 ? 'leaderboard__row--first' : ''}
              >
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.lastname}</td>
                <td>{item.total_points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Leaderboard;