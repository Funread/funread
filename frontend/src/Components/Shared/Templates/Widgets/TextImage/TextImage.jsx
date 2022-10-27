import React from 'react'
import "./TextImage.css"
import {Col, Row}from "react-bootstrap"

function TextImage(props) {
  return (
    <div className='container-textImage'>
        <Row>
            <Col md className='text-col'>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consequat venenatis tincidunt. Vestibulum ut turpis consequat, aliquet ante vitae, sodales augue. Sed semper justo ut sapien rutrum, eu pulvinar massa sodales. Nam eget laoreet ipsum. Sed sed nulla at sem tristique efficitur. Suspendisse ligula augue, eleifend a metus non, euismod sagittis velit. Ut in nisl ex. Phasellus non iaculis ante, sed laoreet augue. Sed hendrerit nisl ut felis consectetur ullamcorper.</p>
            </Col>
            <Col md className='image-col'>
                <img
                  className="image"
                  src="https://149695847.v2.pressablecdn.com/wp-content/uploads/2020/08/What-is-Computer-Vision-scaled.jpg"
                  alt="First slide"
                />
            </Col>
        </Row>
    </div>
  );
}

TextImage.propTypes = {}

export default TextImage