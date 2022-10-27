import React from "react";
import { Dropdown, Row, Col, Button } from "react-bootstrap";
import "./Tools.css";

function Tools() {
  return (
    <div className="tools">
      <h3 className="tools-label">Tools</h3>
      <div className="tools-body">
        <Row className="tools-row">
          <Col lg={8} className="no-padding">
            <Dropdown>
              <Dropdown.Toggle
                className="tools-dropdown"
                variant="outline-dark"
                size="sm"
                id="dropdown-basic"
              >
                Times New Roman
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item> Tipografía 1 </Dropdown.Item>
                <Dropdown.Item href="#/typography2">
                  {" "}
                  Tipografía 2{" "}
                </Dropdown.Item>
                <Dropdown.Item href="#/typography3">
                  {" "}
                  Tipografía 3{" "}
                </Dropdown.Item>
                <Dropdown.Item href="#/typography4">
                  {" "}
                  Tipografía 4{" "}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col lg={4} className="no-padding">
            <input
              className="tools-size-counter"
              type="number"
              id="size"
              min={1}
              max={96}
              step={2}
            ></input>
          </Col>
        </Row>
        <Row className="tools-row">
          <Col className="no-padding">
            <Row className="tools-row tools-list">
              <Col lg={8} className="no-padding">
                <p className="tools-list-tool-name">Tool 1</p>
              </Col>
              <Col lg={4} className="no-padding tools-list-arrow">
                <Button></Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Tools;
