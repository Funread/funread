import React from 'react';
import './NotificationCards.css';

const NotificationCard = ({ notifications }) => {
  return (
    <div className="notification-list">
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          <div className="notification-image">
            <img src={notification.imageSrc} alt="Notification" />
          </div>
          <div className="notification-text">
            {notification.text}
          </div>
        </div>
      ))}
    </div>
  );
};

const notifications = [
  {
    text: 'Notificación 1',
    imageSrc: '/iconos/libro.png',
  },
  {
    text: 'Notificación 2',
    imageSrc: '/iconos/pegatina.png',
  },
  // ... otras notificaciones ...
];


export default NotificationCard;
