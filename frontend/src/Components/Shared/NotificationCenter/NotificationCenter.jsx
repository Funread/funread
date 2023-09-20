import React, { useState } from 'react';
import './NotificationCenter.css';

const NotificationCenter = () => {
  const [notifications] = useState([]);


  return (
    <div className="notification-center">
      <h2>Centro de Notificaciones</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            
           
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationCenter;