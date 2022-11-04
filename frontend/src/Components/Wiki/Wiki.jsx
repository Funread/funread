import React from "react";
import "./Wiki.css";
import "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import PopUp_Wiki from "./PopUp_Wiki";
import Wizard from "../Shared/Wizard/Wizard";
import WizardTemplate from '../WizardTemplete/WizardTemplate';
import Tools from "../Shared/Tools/Tools";

class Wiki extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openContainer: false,
      openContainer2: "login",
    };
  }


render() {
  //Pre    
  return (
    <React.Fragment>
      <div>
        <div className="container-fluid">
          <div className="row content">
            <div className="col-sm-3 sidenav">
              <h4>FunRead's Wiki</h4>
              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="popup">Pop up</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="wizard">Wizard</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Modal</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Toast</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="tools">Tools</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="wizardtemplate">Wizard Template</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="#">Disabled</a>
                </li>

              </ul>
            </div>
            <div className="col-sm-9">
              <Routes>
                <Route path="/popup" element={<PopUp_Wiki />} />
                <Route path='/tools' element={<Tools />} />
                <Route path="/wizardtemplate" element={<WizardTemplate />} />
                <Route
                  exact
                  path="/wizard"
                  element={
                  <div className="index-background-padding">
                    <div className="index-background-container ">
                    <div className='secondContainer'>
                      <Wizard />
                    </div>
                    </div>
                  </div>
                  }
                  />
              </Routes>
            </div>
          </div>
        </div>
        </div>
      </React.Fragment>
    )
  }
}
export default Wiki;
