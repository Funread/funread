import React, { useState } from "react";
import { Dropdown, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import "./Tools.css";

function Tools() {
  const [size, setSize] = useState(10);

  return (
    <div>
      <div className="tools">
        <h3 className="tools-label">Tools</h3>
        <div className="tools-body">
          <Row className="tools-row">
            <Col lg={8} sm={8} xs={8} className="no-padding">
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
                  <Dropdown.Item>
                    {" "}
                    Tipografía 2{" "}
                  </Dropdown.Item>
                  <Dropdown.Item >
                    {" "}
                    Tipografía 3{" "}
                  </Dropdown.Item>
                  <Dropdown.Item >
                    {" "}
                    Tipografía 4{" "}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            <Col lg={4} sm={4} xs={4} className="no-padding">
              <input
                className="tools-size-counter"
                type="number"
                id="size"
                min={10}
                max={96}
                step={2}
                value = {size} onChange={(e) => setSize(e.target.value)} 
              ></input>
            </Col>
          </Row>
          <Row className="tools-row">
            <Col className="no-padding">
              <Row className="tools-row tools-list">
                <Col lg={8} sm={8} xs={8} className="no-padding">
                  <p className="tools-list-tool-name">Tool 1</p>
                </Col>
                <Col lg={4} sm={4} xs={4} className="no-padding tools-list-arrow">
                  <FontAwesomeIcon className="arrow-right" icon={faCaretRight} />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Tools;
