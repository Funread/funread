import './Loader.css'
import React, { useState, useEffect } from 'react'
import Modal from "react-bootstrap/Modal";
import _ from 'lodash'


function Loader({loading,text}){

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
        <span>{text}<br/>This could take a few minutes, thank you for your patience.</span>
      </div>
    </Modal>
    </>
  );
};

export default Loader;
