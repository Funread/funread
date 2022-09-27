import React from "react";
import "./Toast.css";
import { ToastContainer, toast, Slide } from "react-toastify";

/**
 * Function MyLibrary:
 * @param {*} props toastTitle, toastMessage y toastType
 *
 * Componente compartido Toast.
 */
function Toast(props) {
  const toastBody = (toastColor, toastTitle, toastMessage) => (
    <div className="toast-body">
      <div
        className="toast-color-line"
        style={{ backgroundColor: toastColor }}
      ></div>
      <div className="toast-icon" style={{ backgroundColor: toastColor }}></div>
      <div className="toast-message">
        <h3>{toastTitle}</h3>
        <p style={{ fontSize: "20px" }}>{toastMessage}</p>
      </div>
    </div>
  );

  const toastType = (toastType, toastTitle, toastMessage) => {
    if (toastType === "warning") {
      toast(toastBody("#fccb5b", toastTitle, toastMessage), {
        style: { borderColor: "#fccb5b" },
      });
    } else if (toastType === "success") {
      toast(toastBody("#35ef4b", toastTitle, toastMessage), {
        style: { borderColor: "#35ef4b" },
      });
    } else if (toastType === "error") {
      toast(toastBody("#ff5a7e", toastTitle, toastMessage), {
        style: { borderColor: "#ff5a7e" },
      });
    } else {
      toast(toastBody("#4aa9ff", toastTitle, toastMessage), {
        style: { borderColor: "#4aa9ff" },
      });
    }
  };

  return (
    <>
      {toastType(props.type, props.title, props.message)}
      <ToastContainer
        position="bottom-right"
        transition={Slide}
        autoClose={5000}
        hideProgressBar={true}
        pauseOnHover={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
      />
    </>
  );
}

export default Toast;
