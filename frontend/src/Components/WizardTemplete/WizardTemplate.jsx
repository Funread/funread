import React from 'react'
import PropTypes from 'prop-types'
import "./WizardTemplate.css";
import Prueba from './img/Prueba.png';
import Imagen from './img/Imagen.png';


function WizardTemplate(props) {
  return (
    <div className='background-template'>
        <div className = 'Image'>
          <div >
            <center>
            <img className = 'prueba' src={require('./img/Imagen.png')}/>
            </center>
          </div>
    </div>
        <div className='Template'><center><h3>Template</h3></center></div>
    </div>
  )
}

WizardTemplate.propTypes = {}

export default WizardTemplate

//Responsive: 862x416
