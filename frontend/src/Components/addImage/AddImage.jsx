import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./addImage.css";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import logo from "../../placeholderBook.jpg";
import HeaderDashboard from "../Shared/HeaderDashboard/HeaderDashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSliders,
    faDownload,
    faPlus,
    faBars,
    faGripVertical,
    faEllipsis,
  } from "@fortawesome/free-solid-svg-icons";


function AddImage(props){
    const [myView, setMyView] = useState("1");
    const fileList = [
        { nombre: "Musica", Tipo: "Audio/mp3", tamano: "57.74 MB", fecha: "Enero 20" },
        { nombre: "Logo", Tipo: "Imagen/png", tamano: "30,74 kb", fecha: "Enero 20" },
        { nombre: "text", Tipo: "text", tamano: "text", fecha: "text" },
        { nombre: "text ", Tipo: "text", tamano: "text", fecha: "text" },
        { nombre: "text ", Tipo: "text", tamano: "text", fecha: "text" },
        { nombre: "text ", Tipo: "text", tamano: "text", fecha: "text" }
    ];

    function firstView() {
        return (
          <div className="my-library-all-books-view-1">
            <Table className="books-table">
              <thead>
                <tr>
                  <th style={{ width: "25%" }}>Nombre</th>
                  <th style={{ width: "25%" }}>Tipo</th>
                  <th style={{ width: "25%" }}>Tamaño</th>
                  <th style={{ width: "25%" }}>Fecha</th>
                  <th>opciones</th>
                </tr>
              </thead>
              <tbody>{setBooksTableData(fileList)}</tbody>
            </Table>
          </div>
        );
    }

      /**
   * Function setRecentViews:
   * @param {*} userRecentViews Libros vistos recientemente por el usuario.
   *
   * Si el usuario ha visto libros recientemente, los agrega a una lista y la regresa para mostrarla en pantalla.
   */
  function setRecentViews(userRecentViews) {
    const recentViewsList = [];

        if (userRecentViews.length > 0) {
        for (let i = 0; i < userRecentViews.length; i++) {
            recentViewsList.push(
            <ListGroup.Item key={i}>{userRecentViews[i]}</ListGroup.Item>
            );
        }
        }

    return recentViewsList;
  }
    

     /**
   * Function setBooksTableData:
   * @param {*} data Lista/Objeto con la información de los libros del usuario.
   *
   * Agrega la información de los libros del usuario a la tabla de datos.
   * Posteriormente la regresa como una lista para mostrar la información en pantalla (vista 1).
   */
    function setBooksTableData(data) {
        const booksList = [];

        if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            booksList.push(
            <tr key={i}>
                <td style={{ width: "20%" }}>{data[i].nombre}</td>
                <td style={{ width: "20%" }}>{data[i].Tipo}</td>
                <td style={{ width: "20%" }}>{data[i].tamano}</td>
                <td style={{ width: "20%" }}>{data[i].fecha}</td>
            </tr>
            );
        }
    }

    return booksList;
  }

  return (
    <div className="my-library-container">
      <div className="my-library-header">
        <HeaderDashboard />
      </div>
      <div className="my-library">
        <div className="my-library-banner">
          <p className="my-library-title">Gestor de archivos</p>
          <div className="add-image-banner-buttons-container">
                <Button
                    variant="outline-dark"
                    size="md"
                    className="add-image-banner-option-button"
                    type="button"
                >
                Agregar
                </Button>
            </div>
        </div>
        <div className="my-library-body">
        <div className="my-library-all-books">
           {firstView()}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddImage; 