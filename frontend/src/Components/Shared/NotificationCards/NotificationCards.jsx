import React from 'react';
import './NotificationCards.css';

const NotificationCard = ({ notifications }) => {
  return (
    <div className="notification-list">
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          <div className="notification-image">
            <img src="/libro-de-texto.png" alt="Notification" />
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
    imageSrc:'/Estudiantes1.jpeg',
  },
  {
    text: 'Notificación 2',
    imageSrc: '/logo192.png',
  },

  {
    text: 'Notificación ',
    imageSrc: '/logo192.png',
  },


];


export default NotificationCard;
