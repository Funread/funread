import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonNav from "../NavButton/ButtonNav";
import "./NavbarButtons.sass";
import { faSave, faExpand } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NavbarButtons = ({ saveSlides, titleBook, handleEnterFullScreen }) => {
  const navigate = useNavigate();

  const handleSaveSlides = (e) => {
    e.preventDefault();
    saveSlides(e);
  };

  const handleNavigate = (url) => {
    navigate(url);
  };

  return (
    <nav className="custom-navbar-buttons">
      <div className="buttons-navbar">
        <ButtonNav
          onClickHandler={() => handleNavigate("/library")}
          title="My Library"
        />
        {/* <ButtonNav title='Shared Library' /> */}
        <ButtonNav
          onClickHandler={() => handleNavigate("/group")}
          title="My Groups"
        />
      </div>
      <div className="d-flex">
        <h3 className="mt-1 mx-5 text-muted">Title: {titleBook}</h3>
        <button
          className="custom-navbar-save-buttom"
          onClick={handleEnterFullScreen}
        >
          <FontAwesomeIcon size="2x" icon={faExpand} />
        </button>
        <button
          className="custom-navbar-save-buttom"
          onClick={handleSaveSlides}
        >
          <FontAwesomeIcon size="2x" icon={faSave} />
        </button>
      </div>
    </nav>
  );
};

export default NavbarButtons;
