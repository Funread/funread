import './Group.css'
import React, { useState, useEffect } from 'react'
import { Button, Card, Modal, Form, Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faUserPlus, faBook, faUsers } from '@fortawesome/free-solid-svg-icons'
import { listedCreatedBy, newGroup, deleteGroup } from '../../api/group'
import { studentGroupSearch, newStudentGroup, deleteStudentGroup } from '../../api/studentGroups'
import { listed } from '../../api/books'
import { usersList } from '../../api/users'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

const Group = () => {
  const [groups, setGroups] = useState([])
  const [selectedGroupId, setSelectedGroupId] = useState(null)
  const [newGroupName, setNewGroupName] = useState("")
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false)
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [students, setStudents] = useState([])
  const [assignedBooks, setAssignedBooks] = useState([])
  const [studentSearch, setStudentSearch] = useState("")
  const [allStudents, setAllStudents] = useState([])
  const userId = useSelector((state) => state.user.userId)

  useEffect(() => {
    if (userId) {
      fetchGroups()
    }
  }, [userId])

  useEffect(() => {
    if (selectedGroupId) {
      fetchStudents(selectedGroupId)
      fetchAssignedBooks(selectedGroupId)
    }
  }, [selectedGroupId])

  useEffect(() => {
    if (isAddStudentOpen) {
      fetchAllStudents();
    }
  }, [isAddStudentOpen]);

  const fetchGroups = async () => {
    try {
      const response = await listedCreatedBy(userId)
      setGroups(response.data)
      if (response.data.length > 0) {
        setSelectedGroupId(response.data[0].groupscreateid)
      }
    } catch (error) {
      toast.error("Error fetching groups.")
      console.error("Error fetching groups:", error)
    }
  }

  const fetchStudents = async (groupId) => {
    try {
      const response = await studentGroupSearch(groupId)
      setStudents(response.data)
    } catch (error) {
      console.error("Error fetching students:", error)
      setStudents([])
    }
  }

  const fetchAllStudents = async () => {
    try {
      const response = await usersList();
      console.log("API response from usersList:", response.data);
      const studentUsers = response.data.filter(user => user.roles === 2);
      console.log("Filtered student users:", studentUsers);
      setAllStudents(studentUsers);
    } catch (error) {
      console.error("Error fetching all students:", error);
      toast.error("Error fetching students.");
    }
  };
  
  const fetchAssignedBooks = async (groupId) => {
    try {
      // NOTE: Backend does not support fetching books by group.
      // This is a placeholder.
      const response = await listed()
      setAssignedBooks(response.data.slice(0, 2)) // Mock assigned books
    } catch (error) {
      console.error("Error fetching assigned books:", error)
      setAssignedBooks([])
    }
  }

  const selectedGroup = groups.find((g) => g.groupscreateid === selectedGroupId)

  const createGroup = async () => {
    if (newGroupName.trim()) {
      try {
        await newGroup(newGroupName.trim(), 1, userId, 1) // Using dynamic userId
        fetchGroups() // Refresh groups list
        setNewGroupName("")
        setIsCreateGroupOpen(false)
        toast.success("Group created successfully!")
      } catch (error) {
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          let errorMessage = "Error creating group:";
          for (const key in errorData) {
            errorMessage += `\n${key}: ${errorData[key]}`;
          }
          toast.error(errorMessage);
        } else {
          toast.error("Error creating group. Please try again.")
        }
        console.error("Error creating group:", error)
      }
    }
  }

  const handleDeleteGroup = async (groupId) => {
    try {
      await deleteGroup(groupId)
      fetchGroups()
      toast.success("Group deleted successfully!")
    } catch (error) {
      toast.error("Error deleting group. Please try again.")
      console.error("Error deleting group:", error)
    }
  }

  const addStudentToGroup = async (studentId) => {
    try {
      await newStudentGroup(studentId, 0, userId, selectedGroupId) // Using dynamic userId
      fetchStudents(selectedGroupId)
      toast.success("Student added successfully!")
      setIsAddStudentOpen(false)
    } catch (error) {
      toast.error("Error adding student. Please try again.")
      console.error("Error adding student to group:", error)
    }
  }

  const removeStudentFromGroup = async (studentId) => {
    try {
      await deleteStudentGroup(studentId)
      fetchStudents(selectedGroupId)
      toast.success("Student removed successfully!")
    } catch (error) {
      toast.error("Error removing student. Please try again.")
      console.error("Error removing student from group:", error)
    }
  }

  const addBookToGroup = (bookId) => {
    // NOTE: Backend does not support assigning books to a group.
    toast.warn("Assigning books is not yet implemented.")
  }

  const removeBookFromGroup = (bookId) => {
    // NOTE: Backend does not support removing books from a group.
    toast.warn("Removing assigned books is not yet implemented.")
  }

  const filteredStudents = allStudents.filter(student =>
    student.name.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <div className="funread-demo">
      <ToastContainer />
      <div className="header">
        <div className="group-selector">
          <FontAwesomeIcon icon={faUsers} className="icon" />
          <span>Select Group:</span>
          <Dropdown onSelect={(eventKey) => setSelectedGroupId(eventKey)}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {selectedGroup ? selectedGroup.name : "Choose a group"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {groups.map((group) => (
                <Dropdown.Item key={group.groupscreateid} eventKey={group.groupscreateid}>
                  {group.name} ({students.length} students)
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="header-actions">
          <Button onClick={() => setIsCreateGroupOpen(true)}>
            <FontAwesomeIcon icon={faPlus} /> Create Group
          </Button>
          <Button variant="danger" onClick={() => handleDeleteGroup(selectedGroupId)}>
            <FontAwesomeIcon icon={faTrash} /> Delete Group
          </Button>
        </div>
      </div>

      <main className="main-content">
        {selectedGroup && (
          <>
            <div className="summary-cards">
              <Card>
                <Card.Body>
                  <Card.Title>Students in {selectedGroup.name}</Card.Title>
                  <Card.Text>{students.length} active students</Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Assigned Books</Card.Title>
                  <Card.Text>{assignedBooks.length} books assigned</Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Average Books</Card.Title>
                  <Card.Text>Functionality not available</Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="details-cards">
              <Card>
                <Card.Header>
                  <div className="card-header-content">
                    <Card.Title>
                      <FontAwesomeIcon icon={faUsers} /> Students in {selectedGroup.name}
                    </Card.Title>
                    <Button size="sm" onClick={() => setIsAddStudentOpen(true)}>
                      <FontAwesomeIcon icon={faUserPlus} /> Add Student
                    </Button>
                  </div>
                </Card.Header>
                <Card.Body>
                  {students.length > 0 ? (
                    students.map((student) => (
                      <div key={student.userid} className="student-item">
                        <span>{student.name} {student.lastname}</span>
                        <span>Books read: Not available</span>
                        <Button size="sm" variant="outline-danger" onClick={() => removeStudentFromGroup(student.studentsgroupsid)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p>No students in this group yet.</p>
                  )}
                </Card.Body>
              </Card>

              <Card>
                <Card.Header>
                  <div className="card-header-content">
                    <Card.Title>
                      <FontAwesomeIcon icon={faBook} /> Assigned Books
                    </Card.Title>
                    <Button size="sm" onClick={() => addBookToGroup()}>
                      <FontAwesomeIcon icon={faBook} /> Assign Book
                    </Button>
                  </div>
                </Card.Header>
                <Card.Body>
                  {assignedBooks.length > 0 ? (
                    assignedBooks.map((book) => (
                      <div key={book.bookid} className="book-item">
                        <span>{book.title}</span>
                        <Button size="sm" variant="outline-danger" onClick={() => removeBookFromGroup(book.bookid)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p>No books assigned yet.</p>
                  )}
                </Card.Body>
              </Card>
            </div>
          </>
        )}
      </main>

      <Modal show={isCreateGroupOpen} onHide={() => setIsCreateGroupOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Group name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsCreateGroupOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={createGroup}>
            Create Group
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isAddStudentOpen} onHide={() => setIsAddStudentOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student to Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Search for students"
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
          />
          <div className="student-search-results mt-3">
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <div key={student.userid} className="student-item">
                  <span>{student.name} {student.lastname}</span>
                  <Button size="sm" onClick={() => addStudentToGroup(student.userid)}>
                    Add
                  </Button>
                </div>
              ))
            ) : (
              <p>No students found.</p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Group