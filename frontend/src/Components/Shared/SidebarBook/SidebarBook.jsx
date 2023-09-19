import "./SidebarBook.css";
import "bootstrap/js/dist/dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShapes,
  faImage,
  faVideo,
  faVolumeUp,
  faPieChart,
  faTextHeight,
  faTextWidth,
  faSquare,
  faCircle,
  faRectangleAd,
  faF,
  faBook,
  faBookBookmark,
  faBookAtlas,
  faCalendarPlus,
  faCalendarDays,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import NavItem from "../SideNavBarItem/NavItem";
import { useEffect, useState } from "react";

const SidebarBook = () => {
  const [isExpanded, setExpendState] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index) => {
    if (selectedItem === index) {
      setSelectedItem(null); // Se cierra si es la misma card clickeada
    } else {
      setSelectedItem(index); // Abre la tarjeta clickeada.
    }
  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     // Activa el modo hamburguesa si el ancho de la pantalla es menor a 768px
  //     if (window.innerWidth <= 768) {
  //       setExpendState(false);
  //     } else {
  //       setExpendState(true);
  //     }
  //   };

  //   // Escucha cambios en el tamaño de la ventana
  //   window.addEventListener("resize", handleResize);

  //   // Limpia el oyente al desmontar el componente
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const user = "FUNREAD";
  const menuItems = [
    {
      text: "Text",
      icon: faF,
      subItems: [faTextHeight, faTextWidth],
    },
    {
      text: "Book",
      icon: faBook,
      subItems: [faSquare, faCircle, faRectangleAd],
    },
    {
      text: "Images",
      icon: faBookAtlas,
      subItems: [
        faImage,
        faImage,
        faImage,
        faImage,
        faImage,
        faImage,
        faImage,
        faImage,
        faImage,
      ],
    },
    {
      text: "Book",
      icon: faCalendarDays,
      subItems: [faVideo, faVideo, faVideo, faVideo, faVideo],
    },
    {
      text: "Bookmark",
      icon: faBookOpen,
      subItems: [faVolumeUp, faVolumeUp, faVolumeUp],
    },
    {
      text: "Graphics",
      icon: faPieChart,
      subItems: [faPieChart, faPieChart, faPieChart],
    },
  ];

  return (
    <div
      className={
        isExpanded
          ? "custom-side-nav-container"
          : "custom-side-nav-container custom-side-nav-container-NX"
      }
    >
      <div className="custom-nav-upper">
        <div className="custom-nav-heading d-flex justify-content-between align-items-center">
          {isExpanded && (
            <div className="custom-nav-brand">
              <h2>FUNREAD</h2>
            </div>
          )}
          {/* <button
            className="hamburger"
            onClick={() => setExpendState(!isExpanded)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button> */}
        </div>
        <div className="custom-nav-menu">
          {menuItems.map(({ text, icon, subItems }, index) => (
            <NavItem
              key={index}
              text={text}
              icon={icon}
              subItems={subItems}
              isExpanded={isExpanded}
              isSelected={selectedItem === index}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </div>
      </div>
      {/* <SideNavBarFooter user={user} isExpanded={isExpanded} /> */}
    </div>
  );
};

export default SidebarBook;
