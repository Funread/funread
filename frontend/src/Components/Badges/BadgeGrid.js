import React, { useState } from "react";
import BadgeCard from "./BadgeCard";
import { badgesData } from "./badgesData";

function BadgeGrid({ filter }) {
  const [userPoints] = useState(0); // Simula los puntos del usuario para controlarlo

  const filteredBadges = badgesData.filter((badge) => {
    const isDone = badge.points >= badge.threshold;
    const inProgress = badge.points > 0 && badge.points < badge.threshold;

    if (filter === "achieved") return isDone;
    if (filter === "notAchieved") return badge.points === 0;
    if (filter === "inProgress") return inProgress;
    return true;
  });

  return (
    <div className="badges-grid">
      {filteredBadges.map((badge, index) => (
        <BadgeCard
          key={index}
          title={badge.title}
          description={badge.description}
          points={badge.points}
          level={badge.level}
          iconName={badge.iconName}
          status={
            badge.points >= badge.threshold
              ? "Done"
              : badge.points > 0 && badge.points < badge.threshold
              ? "In Progress"
              : "Not Done"
          }
        />
      ))}
    </div>
  );
}

export default BadgeGrid;
