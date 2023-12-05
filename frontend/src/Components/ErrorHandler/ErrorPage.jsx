import React from 'react';
// Asegúrate de que la ruta a tu archivo SASS sea correcta
import styles from './ErrorPage.sass'; // Esta debería ser la ruta relativa correcta

const ErrorPage = ({ errorMessage }) => {
  // La imagen se referenciará directamente desde la carpeta public
  const errorImagePath = './error.png';

  return (
    <div className={`container ${styles.errorPageContainer}`}>
      <img
        src={errorImagePath}
        alt="Error"
        className={`img-fluid ${styles.errorImage}`}
      />
      <h1 className={`mt-4 ${styles.errorMessage}`}>
        Oops! Something went wrong.
      </h1>
      <p className="text-center">
        {errorMessage || 'We are having trouble processing your request.'}
      </p>
      <button
        onClick={() => window.history.back()}
        className={`btn btn-primary ${styles.errorAction}`}
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
