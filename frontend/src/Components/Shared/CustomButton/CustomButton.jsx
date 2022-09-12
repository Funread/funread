import React from "react";
import "./CustomButton.css";
import { Button } from "react-bootstrap";


class CustomButton extends React.Component {
  render() {
    return (
      <>
        <Button
          className="custom-button account-button-content"
          variant="outline-light"
          onClick={() => {
            if(this.props.name === "Log In"){
              {this.props.setLogin(true)}
              {this.props.setSignup(false)}
            }else if(this.props.name === "Sign Up"){
              {this.props.setSignup(true)}
              {this.props.setLogin(false)}
            }

            
          }}
        >
          {this.props.name}
        </Button>
      </>
    );
  }
}

export default CustomButton;
