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
import { listRole, insertRole, deleteRole, editRole } from "../../hooks/ListRoles";
import { listUserRoles, insertUserRole, deleteUserRole, editUserRole } from "../../hooks/useUserRoles";

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

      //-------------------------------Roles-----------------------------------
      const ListRole = () => {

        listRole ()

      }

      const InsertRole = () => {
        let role="admin"
        insertRole (role)

      }

      const DeleteRole = () => {

        deleteRole ()

      }

      const EditRole = () => {
        let role="admin"
        editRole (role)

      }


      //-------------------------------UserRoles-----------------------------------
      const ListUserRole = () => {

        listUserRoles ()

      }

      const InsertUserRole = () => {
        let UserRole="admin"
        insertUserRole (UserRole)

      }

      const DeleteUserRole = () => {

        deleteUserRole ()

      }

      const EditUserRole = () => {
        let UserRole="admin"
        editUserRole (UserRole)

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


              <tr>
                <td style={{ width: "50%" }}>RoleList</td>
                <td><center>
                    <Button
                      className="btneditar"
                      onClick={EditRole}
                    >
                      Editar
                    </Button>{" "}
                    <Button className="btneliminar"onClick={DeleteRole}>Eliminar</Button>{" "}
                    <Button className="btnagregar"onClick={InsertRole}>Agregar</Button>{" "}
                    <Button className="btnbuscar"onClick={ListRole}>Buscar</Button>{" "}
                    </center>
                  </td>
              </tr>
  
              <tr>
                <td style={{ width: "50%" }}>UserRoleList</td>
                <td><center>
                    <Button
                      className="btneditar"
                      onClick={EditUserRole}
                    >
                      Editar
                    </Button>{" "}
                    <Button className="btneliminar"onClick={DeleteUserRole}>Eliminar</Button>{" "}
                    <Button className="btnagregar"onClick={InsertUserRole}>Agregar</Button>{" "}
                    <Button className="btnbuscar"onClick={ListUserRole}>Buscar</Button>{" "}
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
