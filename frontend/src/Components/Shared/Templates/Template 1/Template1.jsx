import React from "react";
import { Col, Row } from "react-bootstrap";
import "./Template 1.sass";
import Text from "../Widgets/Text/Text";
import Image from "../Widgets/Image/Image";
import Title from "../Widgets/Title/Title";

function TextImage(props) {
  return (
    <div className="container-textImage">
      <Row>
        <Col>
          <Title texto="Esto es un Titulo" />
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="template1-image">
            <Image />
          </div>
          <Text />
        </Col>
      </Row>
    </div>
  );
}

Text.propTypes = {};

export default TextImage;
