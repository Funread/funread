import React from "react";
import "./WelcomeFooter.css";

class WelcomeFooter extends React.Component {
  render() {
    return (
      <>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="10 0 1060 141">
          <path
            fill="#ffffff"
            d="M10,6.68C10,6.68,4,44,70,44h792.67c8.65,0,17.08,2.81,24,8L968,113c0,0,37,31,102,31H30
		c-11.05,0-20-8.95-20-20V6.68z"
          ></path>
          <text
            className="welcome-footer-text"
            x="45%"
            y="75%"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {this.props.message}
          </text>
        </svg>
      </>
    );
  }
}

export default WelcomeFooter;
