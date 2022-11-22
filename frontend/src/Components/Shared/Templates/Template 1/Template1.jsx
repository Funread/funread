import React from "react";
import { Col, Row } from "react-bootstrap";
import "./Template 1.css";
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
            <Image imagen="https://www.onlineprinters.es/blog/wp-content/uploads/2019/08/image-to-pdf.jpg" />
          </div>
          <Text />
        </Col>
      </Row>
    </div>
  );
}

Text.propTypes = {};

export default TextImage;
