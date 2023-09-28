
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookCreator from "./Components/BookCreator/BookCreator";
import LandingPage from "./Components/LandingPage/LandingPage";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "./Components/Shared/Dashboard/Dashboard";
import UniqueSelection from "./Components/Block/UniqueSelection/UniqueSelection";


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Routes>
    <Route
        exact
        path='/'
        element={
          <div className='index-background-container'>
            <LandingPage />
          </div>
        }
      /> 
      {/* Esta parte es para DEMO sin iniciar Sesion */}
      <Route
        exact
        path="demo/bookcreator"
        element={
          <div className='index-background-container'>
            <BookCreator />
          </div>
        }
      />

    <Route
        exact
        path="demo/quiz"
        element={
          
            <UniqueSelection />
          
        }
      />
      


      <Route element={<ProtectedRoutes/>}>
      {/* Cualquier nueva ruta que se cree debe encontrarse dentro de esta Route para que este protegida */}
        <Route
          exact
          path="/"
          element={
              <div className="index-background-container ">
                {/* <BookCreator /> */}
              </div>
          }
        />
     <Route
          exact
          path="/bookcreator"
          element={
            <div className="index-background-padding">
              <div className="index-background-container ">
                <BookCreator />

              </div>
            </div>
          }
        />
 <Route
          exact
          path="/dashboard"
          element={
            <div className='index-background-padding'>
              <div className='index-background-container '>
                <Dashboard />
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
