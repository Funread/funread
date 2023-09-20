import React from 'react';
import './NotificationCards.css';


const NotificationCard = ({ notifications }) => {
  return (
    <div className="notification-list">
        {notifications.map((notification, index) => (
          <div key={index} className="notification">
            {notification}
          </div>
        ))}
      </div>
  );
};

export default NotificationCard;
