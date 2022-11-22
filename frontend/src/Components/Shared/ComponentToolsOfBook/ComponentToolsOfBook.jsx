import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ComponentToolsOfBook.css";
import { Button, Col, Row, Image } from "react-bootstrap";
import Template1 from "../Templates/Template 1/Template1";
import Template2 from "../Templates/Template 2/template2";
import Template3 from "../Templates/Template3/Template3";

function ComponentToolsOfBook(props) {
  const [nameFistButton, setNameFistButton] = useState("Template");
  const [nameSecondButton, setNameSecondButton] = useState("Widget");
  const [toolsName, setToolsName] = useState("Tools");
  const [template, setTemplate] = useState(false);
  const [widget, setWidget] = useState(false);

  const btnTemplate = () => {
    setWidget(false);
    setTemplate(true);
  };

  const btnWidget = () => {
    setTemplate(false);
    setWidget(true);
  };

  const setPageTemplate = (template) => {
    console.log("apply template to page: " + props.pageNumber);
    props.setPageTemplate({ page: props.pageNumber, template: template });
  };

  return (
    <div className="tools-main-container">
      <div className="tools-header">{toolsName}</div>
      <div className="container-buttons">
        <Row>
          <Col>
            <Button
              className="style-button-template"
              size="md"
              onClick={btnTemplate}
            >
              {nameFistButton}
            </Button>
          </Col>
          <Col>
            <Button
              className="style-button-widget"
              size="md"
              onClick={btnWidget}
            >
              {nameSecondButton}
            </Button>
          </Col>
        </Row>
      </div>

      {template === true ? (
        <div className="scroll-bar">
          <Row>
            <Col>
              <Image
                className='style-template d-flex flex-row mb-3"'
                src="https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png"
                onClick={() => setPageTemplate(<Template1 />)}
              ></Image>
            </Col>
            <Col>
              <Image
                className="style-template d-flex flex-row-reverse"
                src="https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png"
                onClick={() => setPageTemplate(<Template2 />)}
              ></Image>
            </Col>
          </Row>
          <Row>
            <Col>
              <Image
                className='style-template d-flex flex-row mb-3"'
                src="https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png"
                onClick={() => setPageTemplate(<Template3 />)}
              ></Image>
            </Col>
            <Col>
              <Image
                className="style-template d-flex flex-row-reverse"
                src="https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png"
              ></Image>
            </Col>
          </Row>
          <Row>
            <Col>
              <Image
                className='style-template d-flex flex-row mb-3"'
                src="https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png"
              ></Image>
            </Col>
            <Col>
              <Image
                className="style-template d-flex flex-row-reverse"
                src="https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png"
              ></Image>
            </Col>
          </Row>
        </div>
      ) : null}
      {widget === true ? (
        <div className="scroll-bar">
          <Row>
            <Col>
              <Image
                className='style-widget d-flex flex-row mb-3"'
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&usqp=CAU"
              ></Image>
            </Col>
            <Col>
              <Image
                className='style-widget d-flex flex-row mb-3"'
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&usqp=CAU"
              ></Image>
            </Col>
          </Row>
          <Row>
            <Col>
              <Image
                className='style-widget d-flex flex-row mb-3"'
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&usqp=CAU"
              ></Image>
            </Col>
            <Col>
              <Image
                className='style-widget d-flex flex-row mb-3"'
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&usqp=CAU"
              ></Image>
            </Col>
          </Row>
          <Row>
            <Col>
              <Image
                className='style-widget d-flex flex-row mb-3"'
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&usqp=CAU"
              ></Image>
            </Col>
            <Col>
              <Image
                className='style-widget d-flex flex-row mb-3"'
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&usqp=CAU"
              ></Image>
            </Col>
          </Row>
        </div>
      ) : null}
    </div>
  );
}

ComponentToolsOfBook.propTypes = {};

export default ComponentToolsOfBook;
