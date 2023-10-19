

import React, { useEffect } from "react";
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
import Library from "./Components/Library/Library";
import Group from "./Components/Group/Group";
import JoinValidator from "./Components/JoinValidator/JoinValidator";
import JoinCreator from "./Components/Shared/JoinCreator/JoinCreator";

import { Provider } from "react-redux";
import { store } from "./redux/store"
import Gallery from "./Components/Gallery/components/Gallery";
import './Components/Gallery/styles/styles.scss';



const root = ReactDOM.createRoot(document.getElementById('root'))

//este evento se utiliza para guardar el estado de redux, para evitar perder el estado al recargar la pagina (F5)
const handleBeforeUnload = () => {
  // Guardar el estado de Redux en localStorage
  //localStorage.setItem('reduxState', JSON.stringify(store.getState())); //se comento para que de momento no se guarde la informacion sensible
};

//este porcion de codigo deberia permitir devolver el estado de reducx, pero no funciona por alguna razon
const persistedState = localStorage.getItem('reduxState'); // este 
if (persistedState) {
  store.dispatch({ type: 'REHYDRATE', payload: JSON.parse(persistedState) });
  localStorage.removeItem('reduxState')
}

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <div className='index-background-container landing-page'>
              <LandingPage />
            </div>
          }
          /> 
        {/* Esta parte es para DEMO sin iniciar Sesion */}
        <Route
          exact
          path="demo/bookcreator"
          element={
            <div className=''>
              <BookCreator />
            </div>
          }
          />
        <Route
          exact
          path="demo/library"
          element={
            <div className='index-background-container'>
              <Library />
            </div>
          }
          />

        <Route
          exact
          path="demo/group"
          element={
            <div className=''>
              <Group />
            </div>
          }
          />
      <Route
          exact
          path="/join/:code"
          element={
            <div className='index-background-container'>
              <JoinValidator />
            </div>
          }
        />
        <Route //se utiliza est ruta para colocar el componente que genera los links de invitacion
          exact
          path="demo/book"
          element={
            <div className='index-background-container'>
              <JoinCreator id="1" type="book" />
            </div>
          }
        />


      <Route 
        exact 
         path='demo/quiz' 
          element={
            <UniqueSelection />
          } 
       />
       <Route
          exact
          path="demo/GalleryDemo"
          element={
            <div className=''>
              <Gallery />
            </div>
          }
          />


        <Route element={<ProtectedRoutes roles={['profesor','estudiante']} /> } >

        </Route>
        <Route element={<ProtectedRoutes roles={['profesor']} /> } >
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
            path="/library"
            element={
              <div className="index-background-padding">
                <div className="index-background-container ">
                  <Library/>

                </div>
              </div>
            }
            />
          <Route
            exact
            path="/group"
            element={
              <div className="index-background-padding">
                <div className="index-background-container ">
                  <Group/>

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
    </Provider>
  </BrowserRouter>
)

// Agregar event listener para beforeunload
window.addEventListener('beforeunload', handleBeforeUnload);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
reportWebVitals()
