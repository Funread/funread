import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './Components/LandingPage/LandingPage'
import MyLibrary from './Components/MyLibrary/MyLibrary'
import Dashboard from './Components/Shared/Dashboard/Dashboard'
import Wiki from './Components/Wiki/Wiki'
import Puzzle from './Components/Shared/Templates/Widgets/Puzzle/Puzzle'
import Wizard from './Components/Shared/Wizard/Wizard'
import WizardTemplate from './Components/WizardTemplete/WizardTemplate'
import AddPage from './Components/Shared/AddPage/AddPage'
import Template1 from './Components/Shared/Templates/Template 1/Template1'
import Template2 from './Components/Shared/Templates/Template 2/template2'
import Template3 from './Components/Shared/Templates/Template3/Template3'
import MemoryGame from './Components/Shared/Templates/Widgets/MemoryGame/MemoryGame'
import ProtectedRoutes from './ProtectedRoutes'
import POCFR_315 from './POCFR-315/pocfr-315'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        exact
        path='/'
        element={
          <div className='index-background-padding'>
            <div className='index-background-container '>
              <LandingPage />
            </div>
          </div>
        }
      />

      <Route element={<ProtectedRoutes />}>
        {/* Cualquier nueva ruta que se cree debe encontrarse dentro de esta Route para que este protegida */}
        <Route
          exact
          path='/mylibrary'
          element={
            <div className='index-background-padding'>
              <div className='index-background-container '>
                <MyLibrary />
              </div>
            </div>
          }
        />

        <Route
          path='/dashboard'
          element={
            <div className='index-background-padding'>
              <div className='index-background-container '>
                <Dashboard />
              </div>
            </div>
          }
        />
        <Route path='/wiki' element={<Wiki />} />

        <Route
          path='/puzzle'
          element={
            <Puzzle imagen='https://149695847.v2.pressablecdn.com/wp-content/uploads/2020/08/What-is-Computer-Vision-scaled.jpg' />
          }
        />
        {/* <Route path="/wizard" element={<Wizard />}/> */}

        <Route
          exact
          path='/wizard'
          element={
            <div className='index-background-padding'>
              <div className='index-background-container '>
                <Wizard />
              </div>
            </div>
          }
        />
        <Route path='/wizardtemplate' element={<WizardTemplate />} />

        <Route
          path='/addpage'
          element={
            <div className='index-background-padding'>
              <div className='index-background-container '>
                <AddPage />
              </div>
            </div>
          }
        />
        <Route path='/template-1' element={<Template1 />} />

        <Route path='/template-2' element={<Template2 />} />

        <Route path='/template-3' element={<Template3 />} />

        <Route path='/memorygame' element={<MemoryGame />} />
        <Route path='/POC/FR-315' element={<POCFR_315 />} />

        {/* Final de Routes protegidas */}
      </Route>
    </Routes>
  </BrowserRouter>
)
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
reportWebVitals()
