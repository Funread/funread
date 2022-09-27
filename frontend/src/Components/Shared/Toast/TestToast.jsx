import React, { useState } from "react";
import Toast from "./Toast";

function TestToast() {
  const [toast, setToast] = useState("");

  function callInfoToast() {
    setToast(
      <Toast
        type="info"
        title="Info Title"
        message="Presents information than can be important to the user."
      />
    );
  }

  function callWarningToast() {
    setToast(
      <Toast
        type="warning"
        title="Warning Title"
        message="The user action may not be allowed."
      />
    );
  }

  function callErrorToast() {
    setToast(
      <Toast
        type="error"
        title="Error Title"
        message="The user action presented a mistake."
      />
    );
  }

  function callSuccessToast() {
    setToast(
      <Toast
        type="success"
        title="Possitive Title"
        message="User task completed successfully."
      />
    );
  }

  return (
    <>
      <div>
        <button onClick={callInfoToast}>Info</button>
        <button onClick={callWarningToast}>Warning</button>
        <button onClick={callErrorToast}>Error</button>
        <button onClick={callSuccessToast}>Success</button>
        {toast}
      </div>
    </>
  );
}

export default TestToast;
