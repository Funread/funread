import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.sass";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookCreator from "./Components/BookCreator/BookCreator";
import LandingPage from "./Components/LandingPage/LandingPage";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "./Components/Shared/Dashboard/Dashboard";
import Library from "./Components/Library/Library";
import Group from "./Components/Group/Group";
import JoinValidator from "./Components/JoinValidator/JoinValidator";
import JoinCreator from "./Components/Shared/JoinCreator/JoinCreator";
import ReverseUniqueSelection from "./Components/Widgets/Quiz/ReverseQuiz/ReverseUniqueSelection";
import Video from "./Components/Widgets/Media/Video/Video";
import Voice from "./Components/Widgets/Media/VoiceRecorder/Voicerecorder";
import GameMode from "./Components/Widgets/Game/WordSearchGame/GameModes";
import TextSelectorMenu from "./Components/Shared/TextSelectorMenu/TextSelectorMenu";
import UniqueSelection from "./Components/Widgets/Quiz/UniqueSelection/UniqueSelection";
import Gallery from "./Components/GalleryCollage/Gallery";
import WidgetImage from "./Components/Widgets/Media/Images/WidgetImage";
import About from "./Components/About/About";
import Register from "./Components/Register/Register";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
//este porcion de codigo deberia permitir devolver el estado de reducx, pero no funciona por alguna razon
const persistedState = localStorage.getItem("reduxState"); // este
if (persistedState) {
  store.dispatch({ type: "REHYDRATE", payload: JSON.parse(persistedState) });
  localStorage.removeItem("reduxState");
}

root.render(
  <>
    <TextSelectorMenu />
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route
              exact
              path="/"
              element={
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

            <Route
              exact
              path="demo/quizreverse"
              element={<ReverseUniqueSelection />}
            />

            <Route exact path="demo/video" element={<Video />} />

            <Route exact path="demo/voice" element={<Voice />} />

            <Route exact path="demo/quiz" element={<UniqueSelection />} />

            <Route exact path="about" element={<About />} />

            <Route exact path="demo/Gallery2" element={<Gallery />} />

            <Route exact path="demo/image" element={<WidgetImage />} />

             <Route exact path="demo/wordsearchgame" element={<GameMode />} />

            {/* Las rutas poer debajo no son demo, pero no pueden estar dentro de las protegidas, quizas discutir si hacer una ruta protegida sin rol*/}


            <Route exact path="register" element={<Register />} />  

            <Route element={<ProtectedRoutes roles={["profesor"]} />}>
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
                path="/library"
                element={
                  <div className="index-background-padding">
                    <div className="index-background-container ">
                      <Library />
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
                      <Group />
                    </div>
                  </div>
                }
              />
              <Route
                exact
                path="/dashboard"
                element={
                  <div className="index-background-padding">
                    <div className="index-background-container ">
                      <Dashboard />
                    </div>
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
