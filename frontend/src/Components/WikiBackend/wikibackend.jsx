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
import { InsertInstituteMembers, ListInstituteMembers, EditInstituteMembers ,DeleteInstituteMembers} from "../../hooks/useInstituteMembers"
import { InsertTagsPersBook, ListTagsPersBook, EditTagsPersBook ,DeleteTagsPersBook} from "../../hooks/useTagsPersBook"
import { InsertClasses, ListClasses, EditClasses ,DeleteClasses} from "../../hooks/useClasses"
import { InsertClassesLog, ListClassesLog, EditClassesLog ,DeleteClassesLog} from "../../hooks/useClassesLog"
import { InsertBook, ListAllBooks, ListNotPublishBook, ListPrivateBook, ListPublishBook, SearchBook, EditBook, BookToPrivate, BookToPublish} from "../../hooks/useBook"
import { InsertTags, ListTags, SearchTags, EditTags} from "../../hooks/useTags"
import { InsertUser, ListAllUser, ListActiveUser, ListDeactiveUser, EditUser ,DeleteUser, SearchUser, ActivateUser, LoginUser, UserPassword} from "../../hooks/useUser"
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

      //--------Institute---------------------------------------

      const insertInsitute = () => {
        let name="nombre"
        InsertInstitute (name)
      }
      
      const listInsitute = () => {

        ListInstitute ()
      }

      const deleteInstitute = () => {
        let instituteId=1

        DeleteInstitute (instituteId)
      }

      const editsInstitute = () => {
        let name = "nombre"
        let change="nombre2"
        EditInstitute (name,change)
      }

      //--------InstituteMembers-----------------------------------

      const insertInsituteMembers = () => {
        let userId=1
        let instituteId=1
        InsertInstituteMembers (userId, instituteId)
      }
      
      const listInsituteMembers = () => {

        ListInstituteMembers ()
      }

      const deleteInstituteMembers = () => {
        let instituteMembersId=1

        DeleteInstituteMembers (instituteMembersId)
      }

      const editsInstituteMembers = () => {
        let instituteMembersId=1
        let userchange=2
        let institutechange=2
        EditInstituteMembers (instituteMembersId, userchange, institutechange)
      }


      //--------Classes----------------------------------------

      const insertClasses = () => {
        let name = "¿yo que sé? name"
        let grade = 1
        let teacherAssigned = 1
        InsertClasses (name, grade, teacherAssigned)
      }
      
      const listClasses = () => {

        ListClasses ()
      }

      const deleteClasses = () => {
        let classesId=1

        DeleteClasses (classesId)
      }

      const editsClasses = () => {
        let classesId = 1
        let name = "loquesea"
        let grade = 1
        let teacherAssigned = 1 
        EditClasses (classesId,name,grade,teacherAssigned)
      }



      //--------ClassesLog-------------------------------------

      const insertClassesLog = () => {
        let classesid = 1
        let userid = 1
        let createat = "2000-01-01T00:00:00Z"
        let description = "text"
        InsertClassesLog (classesid, userid, createat, description)
      }
      
      const listClassesLog = () => {

        ListClassesLog ()
      }

      const deleteClassesLog = () => {
        let classeslogid=1

        DeleteClassesLog (classeslogid)
      }

      const editsClassesLog = () => {
        let classeslogid = 1
        let classesid = 1
        let userid = 1
        let createat = "2000-01-01T00:00:00Z"
        let description = "text"
        EditClassesLog (classeslogid, classesid, userid, createat, description)
      }


      //--------TagsPersBook-----------------------------------


      const insertTagsPersBook = () => {
        let tagsid=1
        let bookid=1
        InsertTagsPersBook (tagsid, bookid)
      }
      
      const listTagsPersBook = () => {

        ListTagsPersBook ()
      }

      const deleteTagsPersBook = () => {
        let instituteMembersId=1

        DeleteTagsPersBook (instituteMembersId)
      }

      const editsTagsPersBook = () => {
        let tagsperbookid= 1
        let tagschange= 2
        let bookchange= 2
        EditTagsPersBook (tagsperbookid, tagschange, bookchange)
      }



  //--------Book--------------------------------------------------------
      
      const insertBook = () => {
        let title="libr"
        let category=1 
        let portrait="imagen"
        let createdby=1
        let updatedby=1
        let state=1
        let sharedBook=1
    
        InsertBook (title,category,portrait,createdby,updatedby,state,sharedBook)
    
  
      }

      const listAllBooks = () => {

        ListAllBooks ()
        ListPublishBook()
        ListNotPublishBook()
        ListPrivateBook()
      }

 
      const searchBook = () => {
        let search="libr"

        SearchBook (search)
      }

      const editBook = () => {
        let title= "libr"
        let new_title= "libro"
        let portrait= "otra cosa"
        let category= 1
        let createdby = 1
        let updatedby = 1
        let state = 1
        EditBook (title,new_title,portrait,category,createdby,updatedby,state)
      }

      const bookToPrivate = () => {
        let title="title"

        BookToPrivate (title)
      }

      const bookToPublish = () => {
        let title="title"

        BookToPublish (title)
      }




       //--------tags--------------------------------------------------------

      
       const insertTags = () => {
        let description="cosa"

        InsertTags (description)
      }
      
      const listTags = () => {

        ListTags ()
      }

      const searchTags = () => {
        let search=1

        SearchTags (search)
      }

      const editTags = () => {
        let tagsid = 3
        let description = "otra cosa"
        EditTags (tagsid, description)
      }

      //--------User--------------------------------------------------------


      const insertUser = () => {
        let email = "h"
        let name = "d"
        let lastname = "d"
        let password = "1234"
        let createat = ""
        let actived = 1
        
        
        InsertUser (email,name,lastname,password,createat,actived)
        
      
      }
      
      const loginUser = () => {
        let username= "z"
        let password= ""

        
        LoginUser (username, password)
        
      
      }
  
      const listAllUser = () => {

        ListAllUser ()
        ListActiveUser()
        ListDeactiveUser()
   
      }

     
      const searchUser = () => {
        let search="z"

        SearchUser (search)
      }

      const editUser = () => {
        let email= "h"
        let new_email= "z"
        let name= "kev"
        let lastname= "g"
        let password="1234"
        EditUser (email, new_email, name, lastname, password)
      }

      const activateUser = () => {
        let email= "z"

        ActivateUser (email)
      }

      const userPassword = () => {
        let email="z"
        let passsword="el nuevo password"

        UserPassword (email, passsword)
      }

      const deleteUser = () => { 
        let email="z"

        DeleteUser (email)
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
                <td style={{ width: "50%" }}>Institute</td>
                <td><center>

                    <Button className="btneditar" onClick={editsInstitute}>Editar</Button>{" "}
                    <Button className="btneliminar"onClick={deleteInstitute}>Eliminar</Button>{" "}
                    <Button className="btnagregar"onClick={insertInsitute}>Agregar</Button>{" "}
                    <Button className="btnbuscar"onClick={listInsitute}>Listar</Button>{" "}
                    </center>
                  </td>
              </tr>
              <tr>
                <td style={{ width: "50%" }}>Institute Members</td>
                <td><center>

                    <Button className="btneditar" onClick={editsInstituteMembers}>Editar</Button>{" "}
                    <Button className="btneliminar"onClick={deleteInstituteMembers}>Eliminar</Button>{" "}
                    <Button className="btnagregar"onClick={insertInsituteMembers}>Agregar</Button>{" "}
                    <Button className="btnbuscar"onClick={listInsituteMembers}>Listar</Button>{" "}
                    </center>
                  </td>
              </tr>
              <tr>
                <td style={{ width: "50%" }}>Classes</td>
                <td><center>
 
                    <Button className="btneditar" onClick={editsClasses}>Editar</Button>{" "}
                    <Button className="btneliminar"onClick={deleteClasses}>Eliminar</Button>{" "}
                    <Button className="btnagregar"onClick={insertClasses}>Agregar</Button>{" "}
                    <Button className="btnbuscar"onClick={listClasses}>Listar</Button>{" "}
                    </center>
                  </td>
              </tr>
              <tr>
                <td style={{ width: "50%" }}>ClassesLog</td>
                <td><center>

                    <Button className="btneditar" onClick={editsClassesLog}>Editar</Button>{" "}
                    <Button className="btneliminar"onClick={deleteClassesLog}>Eliminar</Button>{" "}
                    <Button className="btnagregar"onClick={insertClassesLog}>Agregar</Button>{" "}
                    <Button className="btnbuscar"onClick={listClassesLog}>Listar</Button>{" "}
                    </center>
                  </td>
              </tr>
              <tr>
                <td style={{ width: "50%" }}>TagsPerBooks</td>
                <td><center>

                    <Button className="btneditar" onClick={editsTagsPersBook}>Editar</Button>{" "}
                    <Button className="btneliminar"onClick={deleteTagsPersBook}>Eliminar</Button>{" "}
                    <Button className="btnagregar"onClick={insertTagsPersBook}>Agregar</Button>{" "}
                    <Button className="btnbuscar"onClick={listTagsPersBook}>Listar</Button>{" "}
                    </center>
                  </td>
              </tr>
              <tr>
                <td style={{ width: "50%" }}>Books</td>
                <td><center>

                    <Button className="btneditar" onClick={editBook}>Editar</Button>{" "}
                    <Button className="btneliminar"onClick={bookToPrivate}>Privar</Button>{" "}
                    <Button className="btneditar"onClick={bookToPublish}>Publicar</Button>{" "}
                    <Button className="btnagregar"onClick={insertBook}>Agregar</Button>{" "}
                    <Button className="btnbuscar"onClick={listAllBooks}>Listar</Button>{" "}
                    <Button className="btnbuscar"onClick={searchBook}>Buscar</Button>{" "}

                    </center>
                  </td>
              </tr>
              <tr>
                <td style={{ width: "50%" }}>Tags</td>
                <td><center>

                    <Button className="btneditar" onClick={editTags}>Editar</Button>{" "}
                    <Button className="btnagregar"onClick={insertTags}>Agregar</Button>{" "}
                    <Button className="btnbuscar"onClick={listTags}>Listar</Button>{" "}
                    <Button className="btnbuscar"onClick={searchTags}>Buscar</Button>{" "}

                    </center>
                  </td>
              </tr>

              <tr>
                <td style={{ width: "50%" }}>User</td>
                <td><center>

                    <Button className="btneditar" onClick={editUser}>Editar</Button>{" "}
                    <Button className="btneliminar"onClick={deleteUser}>Eliminar</Button>{" "}
                    <Button className="btnagregar"onClick={insertUser}>Agregar</Button>{" "}
                    <Button className="btnbuscar"onClick={listAllUser}>Listar</Button>{" "}
                    <Button className="btnbuscar"onClick={searchUser}>Buscar</Button>{" "}
                    <Button className="btneditar" onClick={activateUser}>Activar</Button>{" "}
                    <Button className="btneditar" onClick={userPassword}>Contraseña</Button>{" "}
                    <Button className="btnagregar" onClick={loginUser}>Login</Button>{" "}

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









