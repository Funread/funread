import React from "react";
import "./WelcomeFooter.css";

class WelcomeFooter extends React.Component {
  render() {
    return (
      <div className="welcome-footer">
        <svg
          className="svgt"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="10 15 1060 200"
        >
          <path
            fill="#ffffff"
            d="M10,6.68C10,6.68,4,44,70,44h792.67c8.65,0,17.08,2.81,24,8L968,113c0,0,37,31,102,31H30
		c-11.05,0-20-8.95-20-20V6.68z"
          ></path>
          <text x="45%" y="50%" dominant-baseline="middle" text-anchor="middle">
            {this.props.message}
          </text>
        </svg>
      </div>
    );
  }
}

export default WelcomeFooter;
