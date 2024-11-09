import React, { useState, useEffect } from "react";
import BadgeCard from "./BadgeCard";
import { getUserBadgesWithStatus } from "./badgesData";

function BadgeGrid({ filter, userId }) {
  const [badgesData, setBadgesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBadges() {
      try {
        const data = await getUserBadgesWithStatus(userId);
        setBadgesData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBadges();
  }, [userId]);

  if (loading) return <p>Loading badges...</p>;
  if (error) return <p>Error loading badges: {error}</p>;

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
