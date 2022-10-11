import { useEffect, useState, useRef } from "react";
import "./PopUp.css";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";


const PopUp = (props) => {
  const [show, setShow] = useState(false);
  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  let contRef = useRef();
  useEffect(() => {
    setShow(props.show);

    if(props.show === true){
      let handler = (event) =>{
        if(!contRef.current.contains(event.target)) {
          closeHandler(false);
        }
      };
  
        document.addEventListener("mousedown", handler);
  
        return () => {
          document.removeEventListener("mousedown", handler);
        };
    }
    
  }, [props.show]);
  
  return (
    <>
    {show && (
      <div 
      style={{
        visibility: "visible",
        opacity: "1"
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
    )}
      
    </>
    
  );
};

PopUp.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default PopUp;

