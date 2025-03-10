
import BookCreator from './Components/BookCreator/BookCreator';
import './index.css';

import React from "react";
import ReactDOM from "react-dom/client";  // ✅ Asegúrate de que sea '/client'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
 <BookCreator />
  </React.StrictMode>
);