import React, { useState, useCallback } from "react";
import { Pages } from "../../Components/Pages/Pages";
import { Col, Row } from "react-bootstrap";
import "../ContainerWizard/style.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

import Toast from "../Shared/Toast/Toast";
import { useNavigate } from "react-router-dom";
import Header from "../Shared/Header/Header";

export const ContainerWizard = (props) => {
  const [activePage, setActivePage] = React.useState(0);
  const [toast, setToast] = useState("");
  const [wizardTitle, setWizardTitle] = useState("Book Style");
  const navigate = useNavigate();
  const [pages, setPages] = useState(1);
  const [nameOfBook, setNameOfBook] = useState("");
  const [classOfBook, setClassOfBook] = useState("");
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [tools, setTools] = useState([]);

  const BtnBackClick = () => {
    setActivePage((index) => 0);
    setWizardTitle("Book Style");
    setPages(pages - 1);
  };

  const BtnContinueClick = () => {
    setActivePage((index) => 2);
    setPages(pages + 1);
    setWizardTitle("Add Book Information");
    console.log(nameOfBook);
    console.log(classOfBook);
    console.log(numberOfPages);
  };

  const BtnCloseClick = () => {
    setActivePage((index) => 0);
    navigate("/mylibrary");
  };

  const BtnSafeClick = () => {
    /**Use variables from hooks in this area to save them */
    console.log(tools);
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

  const fnNameOfBook = useCallback(
    (props) => {
      setNameOfBook(props);
    },
    [nameOfBook]
  );

  const fnClassOfBook = useCallback(
    (props) => {
      setClassOfBook(props);
    },
    [classOfBook]
  );

  const fnNumberOfPages = useCallback(
    (props) => {
      setNumberOfPages(props);
    },
    [numberOfPages]
  );

  const fnTools = useCallback(
    (props) => {
      setTools(props);
    },
    [tools]
  );

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
              {pages !== 1 ? (
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
              {pages === 1 ? (
                <button
                  className="btn-right"
                  type="button"
                  onClick={(e) => {
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

              {pages !== 1 ? (
                <button
                  className="btn-right"
                  type="submit"
                  onClick={BtnSafeClick}
                >
                  Save Book
                  <FontAwesomeIcon
                    className="icons-wizard-right"
                    icon={faAngleRight}
                  />
                </button>
              ) : null}
            </Col>

            <Col>
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
            </Col>
          </Row>
        </div>

        <div className="wizard-bg">
          <Pages
            page={pages}
            fnNameOfBook={fnNameOfBook}
            fnClassOfBook={fnClassOfBook}
            fnNumberOfPages={fnNumberOfPages}
            fnTools={fnTools}
            nameOfBook={nameOfBook}
          ></Pages>
        </div>
      </div>
      {toast}
    </>
  );
};
