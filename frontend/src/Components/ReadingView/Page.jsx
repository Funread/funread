import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Page.sass';
import RV_ImageWithText from './Widgets/Media/RV_ImageWithText';
 

function Page() {
  return (
    <div className="slide-content">
    <RV_ImageWithText textbackgroundColor="#355377" textColor="#FFFFFF" />
    </div>
  );
}

export default Page;
