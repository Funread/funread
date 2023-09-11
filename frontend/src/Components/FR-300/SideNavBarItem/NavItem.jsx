import React, { useState } from "react";
import "./NavItem.css";

const NavItem = ({ text, icon, subItems, isExpanded }) => {
  const [selectedItem, setSelectedItem] = useState(false);

  const handleItemClick = () => {
    setSelectedItem(!selectedItem);
  };

  return (
    <>
      <div
        className="nav-link text-white d-flex align-item-center justify-content-between"
        aria-current="page"
        onClick={handleItemClick}
      >
        <div>
          <i className={icon} style={{ fontSize: "20px" }}></i>
          <span
            className={isExpanded ? "d-none d-sm-inline fs-6 ms-2" : "d-none"}
          >
            {text}
          </span>
        </div>
        <i
          className={`align-self-end fs-6 bi bi-chevron-${
            selectedItem ? "down" : "right"
          } ${isExpanded ? " d-none d-sm-inline" : "d-none"}`}
        ></i>
      </div>
      {selectedItem && (
        <div className="card mt-3">
          <div className="card card-body size-card p-0">
            <div className="icon-grid">
              {subItems.map((subIcon, index) => (
                <i key={index} className={subIcon}></i>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavItem;
