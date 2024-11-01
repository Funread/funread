import React from "react";

function Collection({ name, onClick }) {
  return (
    <div onClick={onClick} className="filter-option">
      <h3>{name}</h3>
    </div>
  );
}

export default Collection;
