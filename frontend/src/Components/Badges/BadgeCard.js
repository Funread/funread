// BadgeCard.js
import React from "react";

function BadgeCard({ title, description, points, level, iconName, status }) {
  return (
    <div className={`badge-card ${status.toLowerCase().replace(" ", "-")}`}>
      <div className="icon">{iconName}</div>
      <h4>{title}</h4>
      <p>{description}</p>
      <p>Points: {points}</p>
      <p>Level: {level}</p>
      <div className={`badge-status ${status.toLowerCase().replace(" ", "-")}`}>
        {status}
      </div>
    </div>
  );
}

export default BadgeCard;
