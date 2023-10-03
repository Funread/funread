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
  const [selectedStudent, setSelectedStudent] = useState(null);

  const toggleSidebar = (student) => {
    if (!selectedStudent) {
        setSelectedStudent(student);
      return;
    }

    if (selectedStudent.idStudent === student.idStudent) {      
      setSelectedStudent(null);
      return;
    }
    setSelectedStudent(student);
  };

  return (
    
      <div className="container-fluid text-center group">
        <div className="row" style={{ height: "auto" }}>
        <div className='col-1 p-0'>
          <SidebarBook/>
          </div>

          <div className='sidenav col-8'>
            <div
              style={{ maxWidth: "1100px" }}
              className="mx-auto content_group"
            >
              <Form className="d-flex mt-1 pt-3 ">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 custom-input-search"
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
              <h4 className="custom-group-title">My Groups</h4>
              <ListGroups toggleSidebar={toggleSidebar} />            
              <GroupCardProgress></GroupCardProgress>
              <br/>
            </div>
          </div>
        
            <div
              className="col-3 shadow rounded mobile-below-tap-group">
                {selectedStudent && (
                <StudentCard
                  idStudent={selectedStudent?.idStudent}
                  image={selectedStudent?.image}
                  name={selectedStudent?.name}
                  idGroup={selectedStudent?.idGroup}
                  pendingTasks={selectedStudent?.pendingTasks}
                  completeTasks={selectedStudent?.completeTasks}
                />
              )}
            </div>
          </div>
      </div>
    
  );
};

export default Group;
