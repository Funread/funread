import React from "react";
import { Col } from "react-bootstrap";
import { WizardInformation } from "../../Components/WizardParte1/WizardInformation";
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
        <Page2 />
      </>
    );
  }
};
