import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./wikibackend.css";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
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
import { Button } from "react-bootstrap";
import { useListAuthor, searchAuthor, insertAuthorList, deleteAuthor, editAuthor } from "../../hooks/useAuthorList";
import { useListSharedBooks, searchSharedBooks, insertSharedBooks, deleteSharedBooks, editSharedBooks,  } from "../../hooks/useSharedBooks";
import { useListTagsPerPage, searchTagsPerPage, insertTagsPerPage, deleteTagsPerPage, editTagsPerPage,  } from "../../hooks/useTagsPerPage";

function WikiBackend(props) {
    const modelList = [
    
        { name: "AuthorList" },
        { name: "Book" },
        { name: "BooksPerClasses"},
        { name: "Classes" },
        { name: "ClassesLog" },
        { name: "File" },
        { name: "Folder" },
        { name: "Grades" },
        { name: "GroupsPerClasses" },
        { name: "Institute" },
        { name: "InstituteMembers" },
        { name: "Mail" },
        { name: "MailControl" },
        { name: "Pages"},
        { name: "Roles" },
        { name: "UserRoles" },
        { name: "SharedBooks" },
        { name: "StudentsGroups" },
        { name: "Tags" },
        { name: "TagsPerPage" },
        { name: "TagsPerBooks" },
        { name: "User" },
        { name: "Widget" },
        { name: "WidgetItem" },

      ];

// -----------------------------------------------AuthorList---------------------------------------------------------

      const ListAuthor = () => {

        useListAuthor ()
           
      }

      const UseSearchAuthor = () => {

        searchAuthor ()
           
      }

      const InsertsAuthor = () => {
        
        let author=1
        let book=1
        insertAuthorList (author, book)

      }

      const DeletsAuthor = () => {

        deleteAuthor ()

      }

      const EditsAuthor = () => {
        let author="student"
        editAuthor (author)

      }

// -----------------------------------------------SharedBooks---------------------------------------------------------

      const ListSharedBooks = () => {

        useListSharedBooks ()
           
      }

      const UseSharedBooks = () => {

        searchSharedBooks ()
           
      }

      const InsertsSharedBooks = () => {
        
        let author=1
        let book=1
        insertSharedBooks (author, book)

      }

      const DeletsSharedBooks = () => {

        deleteSharedBooks ()

      }

      const EditsSharedBooks = () => {
        let author="student"
        editSharedBooks (author)

      }

// -----------------------------------------------TagsPerPage---------------------------------------------------------

const ListTagsPerPage = () => {

  useListTagsPerPage ()
     
}

const UseTagsPerPage = () => {

  searchTagsPerPage ()
     
}

const InsertsTagsPerPage = () => {
  
  let page=1
  let tags=1
  insertTagsPerPage (page, tags)

}

const DeletsTagsPerPage = () => {

  deleteTagsPerPage  ()

}

const EditsTagsPerPage = () => {
  let author="student"
  editTagsPerPage (author)

}


      function firstView() {
        return (
          
          <div className="Wiki">
            <Table className="Wiki-Table">
              <thead>
              <tr>
                  <th style={{ width: "20%" }}>Name</th>
                  <center>
                  <th style={{ width: "60%" }}>Options</th>
                  </center>
                </tr>
              </thead>
              <tbody>{setBooksTableData(modelList)}</tbody>
              
            </Table>
          </div>
        );
      }
    

      function setBooksTableData(data) {
        
      }

      return (
        <div className="my-library-container">
          <div className="my-library-header">
            <HeaderDashboard />
          </div>
          <div className="my-library">
            <div className="my-library-banner">
              <p className="my-library-title">Wiki Backend</p>
            </div>
            <div className="my-library-body">
              <div className="my-library-all-books">

{/*----------------------------------------------------Botones Author----------------------------------------------------*/}

              <tr>
                <td style={{ width: "50%" }}>AuthorList</td>
                <td><center>
                    <Button
                      className="btneditar"
                      onClick={EditsAuthor}
                    >
                      Editar
                    </Button>{" "}
                    <Button className="btneliminar"onClick={DeletsAuthor}>Eliminar</Button>{" "}
                    <Button className="btnagregar"onClick={InsertsAuthor}>Agregar</Button>{" "}
                    <Button className="btnbuscar"onClick={ListAuthor}>Buscar</Button>{" "}
                    <Button className="btnbuscar"onClick={UseSearchAuthor}>BuscarID</Button>{" "}
                    </center>
                  </td>
              </tr>

{/*----------------------------------------------------Botones SharedBooks----------------------------------------------------*/}

              <tr>
                <td style={{ width: "50%" }}>SharedBooks</td>
                <td><center>
                    <Button
                      className="btneditar"
                      onClick={EditsSharedBooks}
                    >
                      Editar
                    </Button>{" "}
                    <Button className="btneliminar"onClick={DeletsSharedBooks}>Eliminar</Button>{" "}
                    <Button className="btnagregar"onClick={InsertsSharedBooks}>Agregar</Button>{" "}
                    <Button className="btnbuscar"onClick={ListSharedBooks}>Buscar</Button>{" "}
                    <Button className="btnbuscar"onClick={UseSharedBooks}>BuscarID</Button>{" "}
                    </center>
                  </td>
              </tr>

{/*----------------------------------------------------Botones TagsPerPage----------------------------------------------------*/}

              <tr>
                <td style={{ width: "50%" }}>TagsPerPage</td>
                <td><center>
                    <Button
                      className="btneditar"
                      onClick={EditsTagsPerPage}
                    >
                      Editar
                    </Button>{" "}
                    <Button className="btneliminar"onClick={DeletsTagsPerPage}>Eliminar</Button>{" "}
                    <Button className="btnagregar"onClick={InsertsTagsPerPage}>Agregar</Button>{" "}
                    <Button className="btnbuscar"onClick={ListTagsPerPage}>Buscar</Button>{" "}
                    <Button className="btnbuscar"onClick={UseTagsPerPage}>BuscarID</Button>{" "}
                    </center>
                  </td>
              </tr>

              </div>
            </div>
          </div>
        </div>

      );
   
}

export default WikiBackend;