import React from "react";
import "./StatCard.css";

function StatCard({ icon, title, children, className = "", iconClassName = "", onClick }) {
  return (
    <div className={`stat-card ${className}`}
    onClick={onClick}>
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
