import React from "react";
import "./StatCard.css"; // Si tenés estilos separados

function StatCard({ icon, title, children, className = "", iconClassName = "" }) {
  return (
    <div className={`stat-card ${className}`}>
      {iconClassName && (
        <div className={`stat-icon ${iconClassName}`}>
          {icon}
        </div>
      )}
      {title && (
        <div className="stat-info">
          <h3>{title}</h3>
          {children}
        </div>
      )}
      {!title && children}
    </div>
  );
}

export default StatCard;
