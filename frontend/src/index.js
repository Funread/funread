import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import TestToast from "./Components/Shared/Toast/TestToast";
import Wizard from "./Components/Shared/Wizard/Wizard";
import MyLibrary from "./Components/MyLibrary/MyLibrary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <div className="background-container">
      <Routes>
        <Route exact path="/MyLibrary" element={<MyLibrary />} />
        <Route exact path="/Wizard" element={<Wizard />} />
        <Route exact path="/TestToast" element={<TestToast />} />
        <Route exact path="/" element={<LandingPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
