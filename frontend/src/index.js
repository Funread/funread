
import ReactDOM from "react-dom/client";
import "./index.sass";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReadingView from "./Components/ReadingView/ReadingView";
import ModalReadingView from "./Components/ReadingView/ModalReadingView";
import BookCreator from "./Components/BookCreator/BookCreator";
import LandingPage from "./Components/LandingPage/LandingPage";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "./Components/Shared/Dashboard/Dashboard";
import Library from "./Components/Library/Library";
import Helpers from "./Components/Helpers/Helpers";
import Group from "./Components/Group/Group";
import JoinValidator from "./Components/JoinValidator/JoinValidator";
import JoinCreator from "./Components/Shared/JoinCreator/JoinCreator";
import About from "./Components/About/About";
import Register from "./Components/Register/Register";
import TextSelectorMenu from "./Components/Shared/TextSelectorMenu/TextSelectorMenu";
import MyClasses from "./Components/MyClasses/MyClasses";
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
          <Route element={<ProtectedRoutes roles={["profesor"]} />}>
              {/* Cualquier nueva ruta que se cree debe encontrarse dentro de esta Route para que este protegida */}
              <Route
                exact
                path="/"
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
                    
                      <Dashboard />
                    </div>
                  </div>
                }
              />

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

            <Route element={<ProtectedRoutes roles={["estudiante"]} />}>
              <Route
                exact
                path="/myclasses"
                element={
                  <div className="index-background-padding">
                    <div className="index-background-container ">
                      <MyClasses />
                    </div>
                  </div>
                }
              />

            </Route>
            <Route
              exact
              path="/"
              element={
                <div className="index-background-container landing-page">
                  <LandingPage />
                </div>
              }
            />
              <Route
              exact
              path="/logout"
              element={
                <div className="index-background-container landing-page">
                  <LandingPage />
                </div>
              }
            />
            {/* Esta parte es para DEMO sin iniciar Sesion */}
            <Route
              exact
              path="ReadingView/:id"
              element={
                <div className="">
                  <ReadingView />
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

            <Route exact path="about" element={<About />} />
            <Route exact path="helpers" element={<Helpers />} />
            {/* Las rutas poer debajo no son demo, pero no pueden estar dentro de las protegidas, quizas discutir si hacer una ruta protegida sin rol*/}


            <Route exact path="register" element={<Register />} />

           
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
