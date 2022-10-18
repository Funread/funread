import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import MyLibrary from "./Components/MyLibrary/MyLibrary";
import Dashboard from "./Components/Shared/Dashboard/Dashboard";
import Wiki from "./Components/Wiki/Wiki";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        exact
        path="/mylibrary"
        element={
          <div className="index-background-padding">
            <div className="index-background-container ">
              <MyLibrary />
            </div>
          </div>
        }
      />

      <Route
        exact
        path="/"
        element={
          <div className="index-background-padding">
            <div className="index-background-container ">
              <LandingPage />
            </div>
          </div>
        }
      />
      <Route path="/dashboard" 
      element={<div className="index-background-padding">
            <div className="index-background-container ">
              <Dashboard />
            </div>
          </div>} />
      <Route path="/wiki" element={<Wiki />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
