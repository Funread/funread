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
import Image from "./Components/Shared/Templates/Widgets/Image/Image";
import Text from "./Components/Shared/Templates/Widgets/Text/Text";
import Audio from "./Components/Shared/Templates/Widgets/Audio/Audio";
import Collage from "./Components/Shared/Templates/Widgets/Collage/Collage";
import Puzzle from "./Components/Shared/Templates/Widgets/Puzzle/Puzzle";
import Title from "./Components/Shared/Templates/Widgets/Title/Title";
import Wizard from "./Components/Shared/Wizard/Wizard";
import WizardTemplate from "./Components/WizardTemplete/WizardTemplate";
import AddPage from "./Components/Shared/AddPage/AddPage";
import Template2 from "./Components/Shared/Templates/Template 2/template2";
import Template3 from "./Components/Shared/Templates/Template3/Template3";
import AddImage from "./Components/addImage/AddImage";

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
        path="/addImage"
        element={
          <div className="index-background-padding">
            <div className="index-background-container ">
              <AddImage />
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
      <Route
        path="/dashboard"
        element={
          <div className="index-background-padding">
            <div className="index-background-container ">
              <Dashboard />
            </div>
          </div>} />
      <Route path="/wiki" element={<Wiki />} />

      <Route path="/image" element={<Image imagen="https://149695847.v2.pressablecdn.com/wp-content/uploads/2020/08/What-is-Computer-Vision-scaled.jpg"/>} />
      <Route path="/title" element={<Title texto="Esto es un Titulo"/>} />
      <Route path="/audio" element={<Audio audio="https://file-examples.com/storage/fe8c7eef0c6364f6c9504cc/2017/11/file_example_MP3_700KB.mp3" />} />
      <Route path="/text" element={<Text texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam egestas eget orci eu imperdiet. Vivamus eros ligula, ornare eu lorem sed, vehicula consectetur mi." />} />
      <Route path="/collage" element={<Collage />} />
      <Route path="/puzzle" element={<Puzzle imagen="https://149695847.v2.pressablecdn.com/wp-content/uploads/2020/08/What-is-Computer-Vision-scaled.jpg" />} />
      <Route path="/wiki/*" element={<Wiki />} />
      {/* <Route path="/wizard" element={<Wizard />}/> */}
      

      <Route
        exact
        path="/wizard"
        element={
          <div className="index-background-padding">
            <div className="index-background-container ">
              <Wizard />
            </div>
          </div>
        }
      />
      <Route path="/wizardtemplate" element={<WizardTemplate />} />

      <Route path="/template-3" element={<Template3/>} />

      <Route
        path="/addpage"
        element={
          <div className="index-background-padding">
            <div className="index-background-container ">
              <AddPage />
            </div>
          </div>
        }
      />
      <Route path="/template-2" element={<Template2 />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
