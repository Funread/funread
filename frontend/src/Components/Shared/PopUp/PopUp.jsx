import { useEffect, useState, useRef } from "react";
import "./PopUp.css";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";


const CustomPopup = (props) => {
  const [show, setShow] = useState(false);
  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  let contRef = useRef();
  useEffect(() => {
    setShow(props.show);

      document.addEventListener("mousedown", (event) => {
        if(!contRef.current.contains(event.target)) {
          closeHandler(false);
        }
      })
    
  }, [props.show]);
  
  return (
    <>
      <div 
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0"
      }}
      className="overlay"
      >
      <div ref={contRef} className="popup">
        
      
      <Row className="header">
        <h1>Header</h1>
      </Row>

      
      <Row className="dashboard">
        <Col>
          <div className='img-pop-container-left'>
            <h1>Dashboard Izquierdo</h1>
          </div>
        </Col>
        <Col>
          <div className='img-pop-container-right'>
            <h1>Dashboard Derecho</h1>
          </div>
        </Col>
      </Row>

      <Row className="footer">
        <h1>Footer</h1>
      </Row>
        

        <div className="content">{props.children}</div>
      </div>
    </div>
    </>
    
  );
};

CustomPopup.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default CustomPopup;