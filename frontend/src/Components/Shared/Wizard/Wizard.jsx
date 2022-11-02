import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import "./Wizard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import WizardParte1 from "../../WizardParte1/WizardParte1";
import Toast from "../Toast/Toast";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
const ContainerWz = ({ children , props}) => {
  const [activePage, setActivePage] = React.useState(0);
  const pages = React.Children.toArray(children);
  const currentPage = pages[activePage];
  const [toast, setToast] = useState("");
  const [wizardTitle, setWizardTitle] = useState("Book Style");
  const navigate = useNavigate();
  


  

  const BtnBackClick = () => {
    setActivePage((index) => 0);
    setWizardTitle("Book Style");
  };

  const BtnContinueClick = () => {
    setActivePage((index) => 2);
    setWizardTitle("Add Book Information");
  };

  const BtnCloseClick = () => {
    setActivePage((index) => 0);
    navigate("/mylibrary");
  };

  const BtnSafeClick = () => {
    console.log("Información guardada!");
    callToast();
  };

  const callToast = () => {
    if (true) {
      setToast(
        <Toast
          type="success"
          title="Possitive Title"
          message="User task completed successfully."
        />
      );
    } else {
      setToast(
        <Toast
          type="error"
          title="Error Title"
          message="The user action presented a mistake."
        />
      );
    }
  };

  return (
    <>
      <div className="wizard-header">
        <Header />
      </div>

      <div className="wizard-body">
        <div className="d-flex flex-row bd-highlight buttons-container">
          <p className="wizard-title">{wizardTitle}</p>
          <Row>
            <Col>
              {activePage > 0 ? (
                <button
                  className="btn-left"
                  type="button"
                  onClick={BtnBackClick}
                >
                  <FontAwesomeIcon
                    className="icons-wizard-left"
                    icon={faAngleLeft}
                  />
                  Back
                </button>
              ) : null}
            </Col>

            <Col>
              {activePage < pages.length - 1 ? (
                <button
                  className="btn-right"
                  type="button"
                  onClick={(e)=> {
                    BtnContinueClick();
                  }}
                >
                  Continue
                  <FontAwesomeIcon
                    className="icons-wizard-right"
                    icon={faAngleRight}
                  />
                </button>
              ) : null}

              {activePage === pages.length - 1 ? (
                <button className="btn-right" type="submit">
                  Save Book
                  <FontAwesomeIcon
                    className="icons-wizard-right"
                    icon={faAngleRight}
                    onClick={BtnSafeClick}
                  />
                </button>
              ) : null}
            </Col>

            <Col>
              {activePage < pages.length ? (
                <button
                  className="btn-right"
                  type="button"
                  onClick={BtnCloseClick}
                >
                  Close
                  <FontAwesomeIcon
                    className="icons-wizard-right"
                    icon={faXmark}
                  />
                </button>
              ) : null}
            </Col>
          </Row>
        </div>

        <div className="wizard-bg">
          {currentPage}
        </div>
      </div>
      {toast}
    </>
  );
};

const Page1 = (props) => (
  <>
  <WizardParte1 onUpdateBookStyle={props.onUpdateBookStyle}/>
  
  </>
);
const Page2 = () => <h1>Page 2</h1>;
const Page3 = () => <h1>Page 3</h1>;

export default function Wizard() {
  const [bookStyle, setBookStyle] = useState({});
  

  const updateBookStyle = (value) => {
      setBookStyle(value)
      console.log(bookStyle);
  }


  return (
    <ContainerWz>
      <Page1 onUpdateBookStyle={updateBookStyle}/>
      <Page2 />
      <Page3 />
    </ContainerWz>
  );
}
