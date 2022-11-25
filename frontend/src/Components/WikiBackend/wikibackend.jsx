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
import { InsertInstitute, ListInstitute, EditInstitute ,DeleteInstitute} from "../../hooks/useInstitute"

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

      const insertsInsitute = () => {
        let change="Juana"
        InsertInstitute (change)

      }
      
      const listInsitute = () => {

        ListInstitute ()

      }



      const deleteInstitute = () => {

        DeleteInstitute ()

      }

      const editsInstitute = () => {
        let name="Benjamina"
        EditInstitute (name)

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
        const modelList = [];
    
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            modelList.push(
              <tr key={i}>
                <td style={{ width: "50%" }}>{data[i].name}</td>
                <td><center>
                    <Button className="btneditar" onClick={editsInstitute}>Editar</Button>{" "}
                    <Button className="btneliminar"onClick={deleteInstitute}>Eliminar</Button>{" "}
                    <Button className="btnagregar"onClick={insertsInsitute}>Agregar</Button>{" "}
                    <Button className="btnbuscar"onClick={listInsitute}>Buscar</Button>{" "}
                    </center>
                  </td>
              </tr>
            );
          }
        }

        return modelList;

      }

      return (
        <div className="my-library-container">
          <div className="my-library-header">
            <HeaderDashboard /> 
            <Button className="btnbuscar">Buscar</Button>{" "}
          </div>
          <div className="my-library">
            <div className="my-library-banner">
              <p className="my-library-title">Wiki Backend</p>
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

export default WikiBackend;









