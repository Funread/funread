import './Loader.css'
import React, { useState, useEffect } from 'react'
import Modal from "react-bootstrap/Modal";
import _ from 'lodash'


function Loader({loading}){

  return (
    <>
    <Modal className="spinner-modal" show={loading}>
      <div className="spinner-container">
        <div class="loader">
          <div class="box box-1">
            <div class="side-left"></div>
            <div class="side-right"></div>
            <div class="side-top"></div>
          </div>
          <div class="box box-2">
            <div class="side-left"></div>
            <div class="side-right"></div>
            <div class="side-top"></div>
          </div>
          <div class="box box-3">
            <div class="side-left"></div>
            <div class="side-right"></div>
            <div class="side-top"></div>
          </div>
          <div class="box box-4">
            <div class="side-left"></div>
            <div class="side-right"></div>
            <div class="side-top"></div>
          </div>
        </div>
        <span>Subiendo el video a la nube!<br/>Esto podria tardar unos minutos, agredecemos tu paciensia</span>
      </div>
    </Modal>
    </>
  );
};

export default Loader;
