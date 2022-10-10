import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./MyLibrary.css";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import logo from "../../placeholderBook.jpg";
import Header from "../Shared/Header/Header";

/**
 * Function MyLibrary:
 * @param {*} props Información de los libros vistos recientemente por el usuario y los libros del usuario.
 *
 * Componente MyLibrary.
 */
function MyLibrary(props) {
  const [myView, setMyView] = useState("1");
  const arr = [0, 1, 2, 3, 4, 5, 6, 7];
  const booksList = [
    { name: "Libro 1", type: "Historia", pages: "12", date: "Enero 20" },
    { name: "Libro 2", type: "Historia", pages: "13", date: "Enero 20" },
    { name: "Libro 3", type: "Historia", pages: "50", date: "Enero 20" },
    { name: "Libro 4", type: "Historia", pages: "12", date: "Enero 20" },
    { name: "Libro 5", type: "Historia", pages: "12", date: "Enero 20" },
    { name: "Libro 6", type: "Historia", pages: "12", date: "Diciembre 19" },
    { name: "Libro 7", type: "Historia", pages: "785", date: "Enero 21" },
    { name: "Libro 8", type: "Historia", pages: "785", date: "Enero 21" },
    { name: "Libro 9", type: "Historia", pages: "785", date: "Enero 21" },
    { name: "Libro 10", type: "Historia", pages: "785", date: "Enero 21" },
    { name: "Libro 11", type: "Historia", pages: "785", date: "Enero 21" },
    { name: "Libro 12", type: "Historia", pages: "785", date: "Enero 21" },
    { name: "Libro 13", type: "Historia", pages: "785", date: "Enero 21" },
    { name: "Libro 14", type: "Historia", pages: "785", date: "Enero 21" },
  ];

  /**
   * Function changeView:
   * @param {*} view Número de vista a la que se desea cambiar.
   *
   * Cambia la vista (entre 3 opciones) de los libros del usuarios.
   */
  function changeView(view) {
    setMyView(view);
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
   * Function firstView:
   * Vista 1: Contiene la vista con la tabla de datos de los libros del usuario.
   */
  function firstView() {
    return (
      <div className="my-library-all-books-view-1">
        <Table className="books-table">
          <thead>
            <tr>
              <th style={{ width: "60%", paddingLeft: 20 }}>Book Title</th>
              <th style={{ width: "15%" }}>Class</th>
              <th style={{ width: "10%" }}>Pages</th>
              <th style={{ width: "15%" }}>Date</th>
            </tr>
          </thead>
          <tbody>{setBooksTableData(booksList)}</tbody>
        </Table>
      </div>
    );
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
            <td style={{ width: "60%", paddingLeft: 20 }}>{data[i].name}</td>
            <td style={{ width: "15%" }}>{data[i].type}</td>
            <td style={{ width: "10%" }}>{data[i].pages}</td>
            <td style={{ width: "15%" }}>{data[i].date}</td>
          </tr>
        );
      }
    }

    return booksList;
  }

  /**
   * Function secondView:
   * Vista 2: Contiene la vista con las tarjetas pequeñas (imagen y nombre de libro) de los libros del usuario.
   */
  function secondView() {
    return (
      <div className="my-library-all-books-view-2">
        {setSmallBookCardsData(booksList)}
      </div>
    );
  }

  /**
   * Function setSmallBookCardsData:
   * @param {*} data Lista/Objeto con la información de los libros del usuario.
   *
   * Agrega la información de los libros del usuario a tarjetas pequeñas con imagen y nombre  del libro.
   * Posteriormente las regresa como una lista para mostrar la información en pantalla (vista 2).
   */
  function setSmallBookCardsData(data) {
    const booksList = [];

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        booksList.push(
          <Card className="small-book-card" key={i}>
            <Card.Img
              variant="top"
              src={logo}
              alt={logo}
              height="115px"
              width="120px"
            />
            <Card.Body>
              <Card.Title>{data[i].name}</Card.Title>
            </Card.Body>
          </Card>
        );
      }
    }

    return booksList;
  }

  /**
   * Function thirdView:
   * Vista 3: Contiene la vista con las tarjetas grandes (imagen, nombre de libro y tipo) de los libros del usuario.
   */
  function thirdView() {
    return (
      <div className="my-library-all-books-view-3">
        <div className="swiper-books">
          <div className="swiper-wrapper">
            <Swiper
              modules={[Navigation]}
              slidesPerView={4}
              spaceBetween={20}
              navigation
              loop={true}
            >
              {setLargeBookCardsData(booksList)}
            </Swiper>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Function setLargeBookCardsData:
   * @param {*} data Lista/Objeto con la información de los libros del usuario.
   *
   * Agrega la información de los libros del usuario a tarjetas grandes con imagen, nombre y tipo del libro.
   * Posteriormente las regresa como una lista para mostrar la información en pantalla (vista 3).
   */
  function setLargeBookCardsData(data) {
    const booksList = [];

    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        booksList.push(
          <SwiperSlide key={i}>
            <Card className="large-book-card" key={i}>
              <Card.Img variant="top" src={logo} alt={logo} height="80%" />
              <Card.Body className="large-book-card-body">
                <Card.Title className="large-book-card-title">
                  {data[i].name}
                </Card.Title>
              </Card.Body>
              <Card.Text className="large-book-card-description">
                {data[i].type}
              </Card.Text>
            </Card>
          </SwiperSlide>
        );
      }
    }

    return booksList;
  }

  /**
   * Debe eliminarse el header actual cuando este creado el header del dashboard
   */
  return (
    <>
      <div className="landing-page-header">
        <Header />
      </div>
      <div className="my-library">
        <div className="my-library-banner">
          <h2>My Library</h2>
        </div>
        <Navbar bg="transparent" className="my-library-navbar">
          <Nav>
            <div className="my-library-options">
              <Nav.Link className="my-library-options-content">
                Create Book
              </Nav.Link>
              <Nav.Link className="my-library-options-content">
                Import Book
              </Nav.Link>
              <Nav.Link className="my-library-options-content">
                Filters
              </Nav.Link>
            </div>
          </Nav>
          <Nav className="me-auto"></Nav>
          <Nav className="my-library-options">
            <Navbar.Text className="my-library-select-view">
              Select View
            </Navbar.Text>
          </Nav>
          <Nav>
            <div className="my-library-options">
              <Nav.Link
                className="my-library-options-content"
                onClick={() => {
                  changeView("1");
                }}
              >
                1
              </Nav.Link>
              <Nav.Link
                className="my-library-options-content"
                onClick={() => {
                  changeView("2");
                }}
              >
                2
              </Nav.Link>
              <Nav.Link
                className="my-library-options-content"
                style={{ marginRight: "0px" }}
                onClick={() => {
                  changeView("3");
                }}
              >
                3
              </Nav.Link>
            </div>
          </Nav>
        </Navbar>
        <div className="my-library-body">
          <div className="my-library-recent-views">
            <p className="my-library-recent-views-title">Recent Views</p>
            <ListGroup className="recent-views">
              {setRecentViews(arr)}
            </ListGroup>
          </div>
          <div className="my-library-all-books">
            {myView === "1"
              ? firstView()
              : myView === "2"
              ? secondView()
              : thirdView()}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyLibrary;
