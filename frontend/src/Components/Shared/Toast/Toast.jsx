import React, { useState } from "react";
import "./Toast.css";
import { ToastContainer, toast, Slide } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faSquareCheck,
  faCircleXmark,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Function MyLibrary:
 * @param {*} props toastTitle, toastMessage & toastType
 *
 * Shared Component: Toast.
 */
function Toast(props) {
  const [closeTimer, setCloseTimer] = useState(5000);

  const toastBody = (toastColor, toastIcon, toastTitle, toastMessage) => (
    <div className="toast-body">
      <div
        className="toast-color-line"
        style={{ backgroundColor: toastColor }}
      ></div>
      <div style={{ color: toastColor }}>
        <FontAwesomeIcon className="toast-icon" icon={toastIcon} />
      </div>
      <div className="toast-message">
        <h3>{toastTitle}</h3>
        <p style={{ fontSize: "20px" }}>{toastMessage}</p>
      </div>
    </div>
  );

  const toastType = (toastType, toastTitle, toastMessage) => {
    if (toastType === "warning") {
      toast(
        toastBody("#fccb5b", faTriangleExclamation, toastTitle, toastMessage),
        {
          style: { borderColor: "#fccb5b" },
        }
      );
    } else if (toastType === "success") {
      toast(toastBody("#35ef4b", faSquareCheck, toastTitle, toastMessage), {
        style: { borderColor: "#35ef4b" },
      });
    } else if (toastType === "error") {
      toast(toastBody("#ff5a7e", faCircleXmark, toastTitle, toastMessage), {
        style: { borderColor: "#ff5a7e" },
      });
    } else {
      toast(toastBody("#4aa9ff", faCircleInfo, toastTitle, toastMessage), {
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
        autoClose={closeTimer}
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
