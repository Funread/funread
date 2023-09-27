import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookCreator from "./Components/POC/BookCreator";
import ProtectedRoutes from "./ProtectedRoutes";

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        exact
        path="/bookcreator"
        element={
          <div className='index-background-container landing-page'>
            <BookCreator />
          </div>
        }
      />
<Route
        exact
        path="/mylibrary"
        element={
          <div className='index-background-container landing-page'>
            {/* <MyLibrary /> */}
          </div>
        }
      />

      <Route element={<ProtectedRoutes/>}>
      {/* Cualquier nueva ruta que se cree debe encontrarse dentro de esta Route para que este protegida */}
        <Route
          exact
          path="/mylibrary"
          element={
            <div className="index-background-padding">
              <div className="index-background-container ">
                {/* <MyLibrary /> */}
              </div>
            </div>
          }
        />


      </Route>
    </Routes>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
