import "./SideNavBar.css";
import "bootstrap/js/dist/dropdown";
import NavItem from "../SideNavBarItem/NavItem";
import SideNavBarFooter from "../SideNavBarFooter/SideNavBarFooter";
import { useState } from "react";

const SideNavBar = () => {
  const [isExpanded, setExpendState] = useState(true);

  const user = "FUNREAD";
  const menuItems = [
    {
      text: "Text",
      icon: "bi bi-fonts",
      subItems: ["bi bi-type", "bi bi-type-bold"],
    },
    {
      text: "Shapes",
      icon: "bi bi-hexagon",
      subItems: [
        "bi bi-circle",
        "bi bi-circle-fill",
        "bi bi-diamond",
        "bi bi-heart",
        "bi bi-heptagon",
        "bi bi-hexagon",
        "bi bi-pentagon",
        "bi bi-octagon",
      ],
    },
    {
      text: "Images",
      icon: "bi bi-images",
      subItems: [
        "bi bi-card-image",
        "bi bi-file-earmark-image",
        "bi bi-file-earmark-image-fill",
      ],
    },
    {
      text: "Videos",
      icon: "bi bi-fast-forward-btn",
      subItems: [
        "bi bi-youtube",
        "bi bi-skip-forward-circle",
        "bi bi-skip-start-circle-fill",
        "bi bi-skip-end-circle-fill",
        "bi bi-stop-circle-fill",
      ],
    },
    {
      text: "Audio",
      icon: "bi bi-volume-up-fill",
      subItems: [
        "bi bi-soundwave",
        "bi bi-volume-up-fill",
        "bi bi-volume-off-fill",
        "bi bi-stop-fill",
      ],
    },
    {
      text: "Graphics",
      icon: "bi bi-bar-chart-line-fill",
      subItems: [
        "bi bi-diagram-3",
        "bi bi-bar-chart-fill",
        "bi bi-graph-up",
        "bi bi-graph-down",
        "bi bi-pie-chart-fill",
      ],
    },
  ];

  return (
    <div className={isExpanded ? "row gx-0" : "row gx-0 side-nav-container-NX"}>
      <div className="bg-dark col-auto min-vh-100 d-flex justify-content-between flex-column pl-0">
        <div>
          <div
            className="text-decoration-none text-white d-none d-sm-inline d-flex align-items-center ms-3 mt-3"
            style={{ fontSize: "20px" }}
          >
            <span className={isExpanded ? "d-none d-sm-inline me-2" : "d-none"}>
              FUNREAD
            </span>
          </div>
          <button
            className="button-no-background d-none d-sm-inline me-2"
            onClick={() => setExpendState(!isExpanded)}
          >
            <i className="bi bi-list fs-3"></i>
          </button>

          <hr className="text-secondary d-none d-sm-block" />
          <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
            {menuItems.map(({ text, icon, subItems }) => (
              <li key={text} className="text-white fs-4  py-sm-0">
                <NavItem
                  text={text}
                  icon={icon}
                  subItems={subItems}
                  isExpanded={isExpanded}
                />
              </li>
            ))}
          </ul>
        </div>
        <SideNavBarFooter user={user} isExpanded={isExpanded} />
      </div>
    </div>
  );
};

export default SideNavBar;
