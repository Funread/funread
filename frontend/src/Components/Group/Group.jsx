import "./Group.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SidebarBook from "../Shared/SidebarBook/SidebarBook";
import ListGroups from "../Shared/ListGroups/ListGroups";
import StudentCard from "../Shared/StudentCard/StudentCard";
import GroupCardProgress from "../Shared/GroupCardProgress/GroupCardProgress";
import CardNewGroup from "../Shared/CardNewGroup/CardNewGroup";

const Group = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const toggleSidebar = (student) => {
    if (!selectedStudent) {
      setShowSidebar(true);
      setSelectedStudent(student);
      return;
    }

    if (selectedStudent.idStudent === student.idStudent) {
      setShowSidebar(false);
      setSelectedStudent(null);
      return;
    }
    setSelectedStudent(student);
  };

  return (
    
      <div className="container-fluid custom-padding text-center group">
        <div className="row flex-nowrap " style={{ height: "auto" }}>
          <SidebarBook></SidebarBook>
          <div className={`sidenav ${showSidebar ? "col-sm-9" : "col-12"}`}>
            <div
              style={{ maxWidth: "1100px" }}
              className="mx-auto content_group"
            >
              <Form className="d-flex mt-1 pt-3">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">
                  <FontAwesomeIcon
                    className="fa-magnifying-glass"
                    icon={faSearch}
                  />
                </Button>
              </Form>
              <CardNewGroup></CardNewGroup>
              <h4>My Groups</h4>
              <ListGroups toggleSidebar={toggleSidebar} />

              {selectedStudent && (
                <div
                  className="sidebar-mobile mt-4"
                  style={{ background: "#79ABA8" }}
                >
                  <StudentCard
                    idStudent={selectedStudent?.idStudent}
                    image={selectedStudent?.image}
                    name={selectedStudent?.name}
                    idGroup={selectedStudent?.idGroup}
                    pendingTasks={selectedStudent?.pendingTasks}
                    completeTasks={selectedStudent?.completeTasks}
                  />
                </div>
              )}

              <GroupCardProgress></GroupCardProgress>
              <br/>
            </div>
          </div>
          {selectedStudent && (
            <div
              className="col-sm-3 p-0 sidebar-desktop"
              style={{ background: "#79ABA8" }}
            >
              <StudentCard
                idStudent={selectedStudent?.idStudent}
                image={selectedStudent?.image}
                name={selectedStudent?.name}
                idGroup={selectedStudent?.idGroup}
                pendingTasks={selectedStudent?.pendingTasks}
                completeTasks={selectedStudent?.completeTasks}
              />
            </div>
          )}
        </div>
      </div>
    
  );
};

export default Group;
