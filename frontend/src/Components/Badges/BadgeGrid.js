import React from 'react';
import { getMediaUrl } from '../../mediaUrl';

function BadgeGrid({ filter, badgesData }) {
  
  // Filtrar las insignias según el valor de "filter"
  const filteredBadges = badgesData.filter((badge) => {
    if (filter === 'all') return true; // Mostrar todas las insignias
    if (filter === 'achieved') return badge.achieved === true; // Mostrar solo las logradas
    if (filter === 'notAchieved') return badge.achieved === false; // Mostrar solo las no logradas
  });

  // Renderizar las insignias filtradas
  return (
    <>
      {filteredBadges.map((badge, index) => (
        <div key={index} className={`achievement-card ${badge.achieved === true ? 'unlocked' : 'locked'}`}>
          <div className="achievement-icon">
            {
              badge.achieved === true ? (
                <img src={getMediaUrl(badge.icon)} alt={badge.title} className="icon" /> /* Icono de la insignia */
              ) : (
                <div className="achievement-icon">🔒</div>
              )
            }
            
            
          </div>
          <h3>{badge.title}</h3>
          <p>{badge.description}</p>
          <p>Points: {badge.points}</p>
        </div>
      ))}
    </>
  );
}

export default BadgeGrid;