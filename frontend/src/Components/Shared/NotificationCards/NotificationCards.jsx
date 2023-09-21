import React from 'react';
import './NotificationCards.css';

const notifications = [
  {
    text: 'Opcion 1',
    imageSrc:'/libro.png',
  },
  {
    text: 'Opcion 2',
    imageSrc: '/libro-de-texto.png',
  },
  {
    text: 'Opcion 3',
    imageSrc: '/pegatina.png',
  },

  {
    text: 'Opcion 4',
    imageSrc: '/libros.png',
  },
 
];

const NotificationCard = () => {
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

export default NotificationCard;




