import React from 'react'
import "./Text.css"
import {Col, Row}from "react-bootstrap"

function Text(props) {
  return (
    <div className='container-text'>
        <Row>
            <Col md className='text-col'>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consequat venenatis tincidunt. Vestibulum ut turpis consequat, aliquet ante vitae, sodales augue. Sed semper justo ut sapien rutrum, eu pulvinar massa sodales. Nam eget laoreet ipsum. Sed sed nulla at sem tristique efficitur. Suspendisse ligula augue, eleifend a metus non, euismod sagittis velit. Ut in nisl ex. Phasellus non iaculis ante, sed laoreet augue. Sed hendrerit nisl ut felis consectetur ullamcorper.</p>
            </Col>
            <Col md className='text-col'>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consequat venenatis tincidunt. Vestibulum ut turpis consequat, aliquet ante vitae, sodales augue. Sed semper justo ut sapien rutrum, eu pulvinar massa sodales. Nam eget laoreet ipsum. Sed sed nulla at sem tristique efficitur. Suspendisse ligula augue, eleifend a metus non, euismod sagittis velit. Ut in nisl ex. Phasellus non iaculis ante, sed laoreet augue. Sed hendrerit nisl ut felis consectetur ullamcorper.</p>
            </Col>
        </Row>
    </div>
  );
}

Text.propTypes = {}

export default Text