import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.sass";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReadingView from "./Components/ReadingView/ReadingView";
import ModalReadingView from "./Components/ReadingView/ModalReadingView";
import BookCreator from "./Components/BookCreator/BookCreator";
import LandingPage from "./Components/LandingPage/LandingPage";
import ProtectedRoutes from "./ProtectedRoutes";
import Library from "./Components/Library/Library";
import Helpers from "./Components/Helpers/Helpers";
import Group from "./Components/Group/Group";
import JoinValidator from "./Components/JoinValidator/JoinValidator";
import JoinCreator from "./Components/Shared/JoinCreator/JoinCreator";
import About from "./Components/About/About";
import Register from "./Components/Register/Register";
import TextSelectorMenu from "./Components/Shared/TextSelectorMenu/TextSelectorMenu";
import MyClasses from "./Components/MyClasses/MyClasses";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import BadgesPage from "./Components/Badges/BadgesPage";
import DashboardLayout from "./Components/DashboardLayout/DashboardLayout";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import AdminBadgesPage from "./Components/Admin/Badges/AdminBadgesPage";
import AdminMediaPage from "./Components/Admin/Media/AdminMediaPage";


const root = ReactDOM.createRoot(document.getElementById("root"));
//este porcion de codigo deberia permitir devolver el estado de reducx, pero no funciona por alguna razon
const persistedState = localStorage.getItem("reduxState"); // este
if (persistedState) {
  store.dispatch({ type: "REHYDRATE", payload: JSON.parse(persistedState) });
  localStorage.removeItem("reduxState");
}

const DashboardRoleHelper = () => {
  const role = useSelector((state) => state.user.roles?.[0]?.role);

  return <DashboardLayout role={role} />;
};

root.render(
  <>
    <TextSelectorMenu />
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route exact path="/dashboard" element={<DashboardRoleHelper />}>

              {/* Rutas para administradores - PRIMERO para evitar conflictos */}
              <Route element={<ProtectedRoutes roles={["administrativo"]} />}>
                <Route path="badges" element={<AdminBadgesPage />} />
                <Route path="media" element={<AdminMediaPage />} />
              </Route>

              {/* Rutas para profesores */}
              <Route element={<ProtectedRoutes roles={["profesor"]} />}>
                <Route path="library" element={<Library />} />
                <Route path="groups" element={<Group />} />
                <Route path="teacher-badges" element={<BadgesPage />} />
              </Route>

              {/* Rutas para estudiantes */}
              <Route element={<ProtectedRoutes roles={["estudiante"]} />}>
                <Route path="myclasses" element={<MyClasses />} />
                <Route path="achievements" element={<BadgesPage />} />
              </Route>

              {/* Rutas para cualquier usuario autenticado */}
              <Route element={<ProtectedRoutes roles={["profesor", "estudiante"]} />}>
                <Route path="leaderboard" element={<Leaderboard />} />
              </Route>
            </Route>
            <Route exact path="/" element={
                <div className="index-background-container landing-page">
                  <LandingPage />
                </div>
              }
            />
            {/* Esta parte es para DEMO sin iniciar Sesion */}
            <Route
              exact
              path="demo/bookcreator"
              element={
                <div className="">
                  <BookCreator />
                </div>
              }
            />
            <Route
              exact
              path="demo/library"
              element={
                <div className="">
                  <Library />
                </div>
              }
            />
            <Route
              exact
              path="demo/ModalReadingView"
              element={
                <div className="">
                  <ModalReadingView />
                </div>
              }
            />
            <Route
              exact
              path="demo/group"
              element={
                <div className="">
                  <Group />
                </div>
              }
            />
            <Route
              exact
              path="/join/:code"
              element={
                <div className="index-background-container">
                  <JoinValidator />
                </div>
              }
            />
            <Route //se utiliza est ruta para colocar el componente que genera los links de invitacion
              exact
              path="demo/book"
              element={
                <div className="index-background-container">
                  <JoinCreator id="1" type="book" />
                </div>
              }
            />
            {/* Las rutas poer debajo no son demo, pero no pueden estar dentro de las protegidas, quizas discutir si hacer una ruta protegida sin rol*/}

            <Route exact path="about" element={<About />} />
            <Route exact path="helpers" element={<Helpers />} />
            <Route
              exact
              path="ReadingView/:id"
              element={
                <div className="">
                  <ReadingView />
                </div>
              }
            />
            <Route exact path="register" element={<Register />} />
            <Route element={<ProtectedRoutes roles={["profesor"]} />}>
              <Route
                exact
                path="/bookcreator/:id"
                element={
                  <div className="index-background-padding">
                    <div className="index-background-container ">
                      <BookCreator />
                    </div>
                  </div>
                }
              />
            </Route>
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
reportWebVitals();
