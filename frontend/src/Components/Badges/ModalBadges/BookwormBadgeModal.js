// src/badges/modalbadges/BookwormBadgeModal.js
import React from 'react';
import './BookwormBadgeModal.scss';

const BookwormBadgeModal = ({ onClose, badge }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✖</button>
        <h2 className="modal-title">{badge.title}</h2>
        <div className="modal-icon">{badge.iconName || '🏅'}</div>
        <p className="modal-description">{badge.description}</p>
        <p className="modal-points">Points: {badge.points}</p>
        <p className="modal-level">Level: {badge.level}</p>
        <button className="modal-close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BookwormBadgeModal;
