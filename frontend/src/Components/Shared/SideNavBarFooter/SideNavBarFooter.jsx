// SideNavBarFooter.js
import React from "react";
import "./SideNavBarFooter.css";

const SideNavBarFooter = ({ user, isExpanded }) => {
  return (
    <div className="d-flex align-items-center justify-content-center custom-style">
      <div
        className={isExpanded ? "d-flex flex-column" : "d-none"}
        style={{ fontSize: "17px" }}
      >
        <div className="small d-none d-sm-inline">Logged in as:</div>
        <span className="d-none d-sm-inline">{user}</span>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="dropdown open">
          <a
            className="text-decoration-none text-white dropdown-toggle p-3"
            href="#3"
            type="button"
            id="triggerId"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="bi bi-person-fill"></i>
          </a>
          <div className="dropdown-menu" aria-labelledby="triggerId">
            <a className="dropdown-item" href="#4">
              Settings
            </a>
            <a className="dropdown-item" href="#5">
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavBarFooter;
