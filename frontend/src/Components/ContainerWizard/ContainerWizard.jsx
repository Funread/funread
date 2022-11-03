import React, {useState} from "react";
import {Pages} from '../../Components/Pages/Pages'
import { Col, Row } from "react-bootstrap";
import "../ContainerWizard/style.css";
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
  // const pages = React.Children.toArray(children);
  // const currentPage = pages[activePage];
  const [toast, setToast] = useState("");
  const [wizardTitle, setWizardTitle] = useState("Book Style");
  const navigate = useNavigate();
  const [pages,setPages] = useState(1)

  const BtnBackClick = () => {
    setActivePage((index) => 0);
    setWizardTitle("Book Style");
    setPages(pages-1)
    console.log(pages)
  };

  const BtnContinueClick = () => {
    setActivePage((index) => 2);
    setPages(pages+1)
    console.log(pages)
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
              {/* {activePage < pages.length - 1 ? ( */}
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
              {/* // ) : null} */}

              {/* {activePage === pages.length - 1 ? ( */}
                <button className="btn-right" type="submit">
                  Save Book
                  <FontAwesomeIcon
                    className="icons-wizard-right"
                    icon={faAngleRight}
                    onClick={BtnSafeClick}
                  />
                </button>
              {/* ) : null} */}
            </Col>

            <Col>
              {/* {activePage < pages.length ? ( */}
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
              {/* ) : null} */}
            </Col>
          </Row>
        </div>

        <div className="wizard-bg">

          <Pages page= {pages} ></Pages>
        </div>
      </div>
      {toast}

      {/* <Pages></Pages> */}
    </>
  );
};
