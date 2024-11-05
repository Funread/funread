// BadgeInfo.js
import React from 'react';

const BadgeInfo = ({ title, description, points, iconName, level, threshold }) => {
  const isAchieved = points >= threshold;
  const inProgress = points > 0 && points < threshold;

  return (
    <div className="badge-card">
      <div className="icon">{iconName}</div>
      <h4>{title}</h4>
      <p>{description}</p>
      <p>Points: {points}</p>
      <p>Level: {level}</p>
      <div className={`badge-status ${isAchieved ? 'done' : inProgress ? 'in-progress' : 'not-done'}`}>
        {isAchieved ? 'Done' : inProgress ? 'In Progress' : 'Not Done'}
      </div>
    </div>
  );
};

export default BadgeInfo;
