
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavbarDashboardStudents.css';

const Navbar = () => {
  const [fechaActual, setFechaActual] = useState('');

  useEffect(() => {
    const obtenerFechaActual = () => {
      const fechaActual = new Date();
      const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
      const fechaFormateada = fechaActual.toLocaleDateString('es-ES', opcionesFecha);
      setFechaActual(fechaFormateada);
    };

    obtenerFechaActual();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <form className="d-flex ms-auto">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-primary" type="submit">
              <img src="/buscar.png" alt="Buscar" style={{ width: '20px', height: '20px' }} />
            </button>
          </form>
          <span className="navbar-text mx-auto" id="fecha">
            {fechaActual}
          </span>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active hover-celeste" aria-current="page" href="#">
                <img src="/configuraciones.png" alt="Conf" />
              </a>
            </li>
            <li className="nav-item mx-2">
              <span className="nav-link hover-celeste">Nombre del estudiante</span>
            </li>
            <li className="nav-item">
              <a className="nav-link hover-celeste" href="#">
                <img src="/usuario.png" alt="Enlace" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;