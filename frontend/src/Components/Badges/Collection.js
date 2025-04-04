import React from "react";

function Collection({ name, onClick, isActive}) {
  return (
    <div onClick={onClick} className={`filter-option ${isActive ? "active" : ""}`}>
      {name}
    </div>
  );
}

export default Collection;
