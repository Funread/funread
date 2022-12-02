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
import { InsertGrades, ListGrades, EditGrades, DeleteGrades} from "../../hooks/useGrades"
import { InsertPages, ListPages, EditPages} from "../../hooks/usePages"

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

//--------Grades-----------------------------------


      const insertGrades = () => {
        let booksid="Sam"
        let progress=7
        let grade=5
        let iduser=1
      InsertGrades (booksid,progress,grade,iduser)
    }
 
      const listGrades = () => {
      ListGrades ()
    }

      const deleteGrades = () => {
        let gradesid=1
      DeleteGrades (gradesid)
    }

      const editsGrades = () => {
        let gradesid=32
        let booksid="pamcha"
        let progress=1
        let grade=1
        let iduser=1
      EditGrades (gradesid,booksid,progress,grade,iduser)
    }

//--------Pages-----------------------------------


const insertPages = () => {
  
  let book=1
  let elementorder=2
  let type=1
  let template=2

 
InsertPages (book,elementorder,type,template)
}

const listPages = () => {
ListPages ()
}

const editsPages = () => {
  let book=1
  let pageid=1
  let elementorder=2
  let type=1
  let template=1
  
EditPages (book,pageid,elementorder,type,template)
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
                    <Button className="btnbuscar"onClick={listInsitute}>Buscar</Button>{" "}
                    </center>
                  </td>
              </tr>
              <tr>
                <td style={{ width: "50%" }}>Institute Members</td>
                <td><center>

                    <Button className="btneditar" onClick={editsInstituteMembers}>Editar</Button>{" "}
                    <Button className="btneliminar"onClick={deleteInstituteMembers}>Eliminar</Button>{" "}
                    <Button className="btnagregar"onClick={insertInsituteMembers}>Agregar</Button>{" "}
                    <Button className="btnbuscar"onClick={listInsituteMembers}>Buscar</Button>{" "}
                    </center>
                  </td>
              </tr>
              <tr>
                <td style={{ width: "50%" }}>Classes</td>
                <td><center>
 
                    <Button className="btneditar" onClick={editsClasses}>Editar</Button>{" "}
                    <Button className="btneliminar"onClick={deleteClasses}>Eliminar</Button>{" "}
                    <Button className="btnagregar"onClick={insertClasses}>Agregar</Button>{" "}
                    <Button className="btnbuscar"onClick={listClasses}>Buscar</Button>{" "}
                    </center>
                  </td>
              </tr>
              <tr>
                <td style={{ width: "50%" }}>ClassesLog</td>
                <td><center>

                    <Button className="btneditar" onClick={editsClassesLog}>Editar</Button>{" "}
                    <Button className="btneliminar"onClick={deleteClassesLog}>Eliminar</Button>{" "}
                    <Button className="btnagregar"onClick={insertClassesLog}>Agregar</Button>{" "}
                    <Button className="btnbuscar"onClick={listClassesLog}>Buscar</Button>{" "}
                    </center>
                  </td>
              </tr>
              <tr>
                <td style={{ width: "50%" }}>TagsPerBooks</td>
                <td><center>

                    <Button className="btneditar" onClick={editsTagsPersBook}>Editar</Button>{" "}
                    <Button className="btneliminar"onClick={deleteTagsPersBook}>Eliminar</Button>{" "}
                    <Button className="btnagregar"onClick={insertTagsPersBook}>Agregar</Button>{" "}
                    <Button className="btnbuscar"onClick={listTagsPersBook}>Buscar</Button>{" "}
                    </center>
                  </td>
              </tr>
              <tr>
                <td style={{ width: "50%" }}>Grades</td>
                <td><center>
                    <Button className="btneditar" onClick={editsGrades}>Editar</Button>{" "}
                    <Button className="btneliminar"onClick={deleteGrades}>Eliminar</Button>{" "}
                    <Button className="btnagregar"onClick={insertGrades}>Agregar</Button>{" "}
                    <Button className="btnbuscar"onClick={listGrades}>Buscar</Button>{" "}
                    </center>
                  </td>
              </tr>
              <tr>
                <td style={{ width: "50%" }}>Pages</td>
                <td><center>
                    <Button className="btneditar" onClick={editsPages}>Editar</Button>{" "}
                    <Button className="btnagregar"onClick={insertPages}>Agregar</Button>{" "}
                    <Button className="btnbuscar"onClick={listPages}>Buscar</Button>{" "}
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









