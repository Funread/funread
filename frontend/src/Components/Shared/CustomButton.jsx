import React from 'react';
import {Button } from "react-bootstrap";



class CustomButton extends React.Component {
    

  render() {
    return (
        <>
            <Button className="custom-button account-button-content btn-sm" variant="outline-light">{this.props.name}</Button>
        </>
        
    )
  }
}

export default CustomButton;