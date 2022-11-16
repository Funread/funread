import React from 'react'
import {Col, Row} from 'react-bootstrap';
import "./TextImage.css"
import Text from '../Widgets/Text/Text';
import Image from '../Widgets/Image/Image';
import Title from '../Widgets/Title/Title';

function TextImage(props) {
  return (
    <div className='container-textImage'>
      <Title texto="Esto es un Titulo"/>
      <Row>
        <Col>
          <Text/>
        </Col>
        <Col>
          <Image imagen="https://www.onlineprinters.es/blog/wp-content/uploads/2019/08/image-to-pdf.jpg"/>
        </Col>
      </Row>
    </div>
  );
}

Text.propTypes = {}

export default TextImage