import React from "react";
import { WizardInformation } from "../../Components/WizardParte1/WizardInformation";
import Page2 from "../Shared/CreateBookPage2/CreateBookPage2";
export const Pages = (props) => {
  if (props.page === 1) {
    return (
      <>
        <WizardInformation fnNameOfBook={props.fnNameOfBook} fnClassOfBook={props.fnClassOfBook} fnNumberOfPages={props.fnNumberOfPages} ></WizardInformation>
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
