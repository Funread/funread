import React, { useState, useEffect } from "react";
import { Row, Col, FormSelect } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import "./Tools.sass";

function Tools(props) {
  const [typographyList, setTypographyList] = useState([
    "Times New Roman",
    "Tipografía 1",
    "Tipografía 2",
    "Tipografía 3",
  ]);
  const [typography, setTypography] = useState(typographyList[0]);
  const [typographySize, setTypographySize] = useState(10);
  /**(Placeholder)
   * Es necesario agregar el resto de las herramientas
   * Y modificar el onChange para que se guarden todas las herramientas cuando alguna cambie */
  const [toolsList, setToolsList] = useState([
    { typography: typography, typographySize: typographySize },
  ]);

  useEffect(() => {
    props.fnTools(toolsList);
  }, [toolsList]);

  return (
    <div className="tools">
      <h3 className="tools-label">Tools</h3>
      <div className="tools-body">
        <Row className="tools-row">
          <Col lg={8} sm={8} xs={8} className="no-padding">
            <FormSelect
              className="tools-select"
              value={typography}
              onChange={(event) => {
                setTypography(event.target.value);
                setToolsList([
                  {
                    typography: event.target.value,
                    typographySize: typographySize,
                  },
                ]);
              }}
            >
              {typographyList.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </FormSelect>
          </Col>

          <Col lg={4} sm={4} xs={4} className="no-padding">
            <input
              className="tools-size-counter"
              type="number"
              id="size"
              min={10}
              max={96}
              step={2}
              value={typographySize}
              onChange={(event) => {
                setTypographySize(event.target.value);
                setToolsList([
                  {
                    typography: typography,
                    typographySize: event.target.value,
                  },
                ]);
              }}
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
  );
}

export default Tools;
