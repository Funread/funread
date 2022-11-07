import React from "react";
import { Col } from "react-bootstrap";
import { WizardInformation } from "../../Components/WizardParte1/WizardInformation";
import "../Pages/style.css";
import Page2 from "../Shared/CreateBookPage2/CreateBookPage2";
export const Pages = (props) => {
  if (props.page == 1) {
    return (
      <>
        <WizardInformation fn={props.fnBook}></WizardInformation>
      </>
    );
  } else {
    return (
      <>
      <div className='d-flex justify-content-center'>
        <Page2></Page2>
      </div>
      </>
    );
  }
};
