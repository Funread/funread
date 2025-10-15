import './Group.css'
import React, { useState, useEffect } from 'react'
import { Button, Card, Modal, Form, Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faUserPlus, faBook, faUsers, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import { listedCreatedBy, newGroup, deleteGroup } from '../../api/group'
import { studentGroupSearch, newStudentGroup, deleteStudentGroup } from '../../api/studentGroups'
import { newClass, listedClassesId } from '../../api/classes'
import { listed, bookSearchById } from '../../api/books'
import { newBookPerClass, listedBooksPerClassesById } from '../../api/booksPerClasses'
import { listedStudents } from '../../api/userroles'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
const moment = require('moment')

const Group = () => {
  const [groups, setGroups] = useState([])
  const [selectedGroupId, setSelectedGroupId] = useState(null)
  const [newGroupName, setNewGroupName] = useState("")
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false)
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [students, setStudents] = useState([])
  const [studentSearch, setStudentSearch] = useState("")
  const [allStudents, setAllStudents] = useState([])
  const [classes, setClasses] = useState([])
  const [isAddClassOpen, setIsAddClassOpen] = useState(false)
  const [newClassName, setNewClassName] = useState("")
  const [selectedClassId, setSelectedClassId] = useState(null)
  const [classBooks, setClassBooks] = useState([])
  const [isAssignBookOpen, setIsAssignBookOpen] = useState(false)
  const [availableBooks, setAvailableBooks] = useState([])
  const [selectedBookId, setSelectedBookId] = useState("")
  const userId = useSelector((state) => state.user.userId)

  useEffect(() => {
    if (userId) {
      fetchGroups()
      fetchAllStudents()
    }
  }, [userId])

  useEffect(() => {
    if (selectedGroupId && allStudents.length > 0) {
      fetchStudents(selectedGroupId)
      fetchClasses(selectedGroupId)
      setSelectedClassId(null)
      setClassBooks([])
    }
  }, [selectedGroupId, allStudents])

  useEffect(() => {
    if (selectedClassId) {
      fetchClassBooks(selectedClassId)
    }
  }, [selectedClassId])

  const fetchGroups = async () => {
    try {
      const response = await listedCreatedBy(userId)
      // Filtrar solo grupos activos
      const activeGroups = (response.data || []).filter(group => group.isactive === 1)
      setGroups(activeGroups)
      if (activeGroups.length > 0) {
        setSelectedGroupId(activeGroups[0].id)
      } else {
        setSelectedGroupId(null)
      }
    } catch (error) {
      console.error("Error fetching groups:", error)
      setGroups([])
      setSelectedGroupId(null)
    }
  }

  const fetchStudents = async (groupId) => {
    try {
      const response = await studentGroupSearch(groupId)
      const studentsInGroup = response.data
      const enrichedStudents = studentsInGroup.map(studentInGroup => {
        const studentDetails = allStudents.find(s => s.userid === studentInGroup.userid);
        return {
          ...studentInGroup,
          ...studentDetails
        };
      });
      setStudents(enrichedStudents)
    } catch (error) {
      console.error("Error fetching students:", error)
      setStudents([])
    }
  }

  const fetchAllStudents = async () => {
    try {
      const response = await listedStudents();
      setAllStudents(response.data);
    } catch (error) {
      console.error("Error fetching all students:", error);
      toast.error("Error fetching students.");
    }
  };
  

  // Obtener libros asignados a una clase (simulado)
  const fetchClassBooks = async (classId) => {
    try {
      const response = await listedBooksPerClassesById(classId)
      const booksPerClass = response.data
      // Buscar detalles completos de cada libro
      const booksWithDetails = await Promise.all(
        booksPerClass.map(async (item) => {
          const bookId = item.booksid
          let title = "Unknown Book"
          let author = "Unknown Author"
          if (bookId) {
            try {
              const bookDetailsResponse = await bookSearchById(bookId)
              if (bookDetailsResponse && bookDetailsResponse.data) {
                title = bookDetailsResponse.data.title || title
                author = bookDetailsResponse.data.author || author
              }
            } catch {}
          }
          return {
            ...item,
            title,
            author
          }
        })
      )
      setClassBooks(booksWithDetails)
    } catch (error) {
      setClassBooks([])
    }
  }

  const fetchClasses = async (groupId) => {
    try {
      const response = await listedClassesId(groupId)
      setClasses(response.data)
    } catch (error) {
      console.error("Error fetching classes:", error)
      setClasses([])
    }
  }

  const selectedGroup = groups.find((g) => g.id === selectedGroupId)

  const createGroup = async () => {
  if (newGroupName.trim()) {
    try {
      // Intenta crear el grupo
      const groupResponse = await newGroup(newGroupName.trim(), "", userId, 1);
      const newGroupData = groupResponse.data;
      
      // Valida que el grupo se haya creado correctamente y tenga un ID
      if (!newGroupData || !newGroupData.id) {
        throw new Error("Failed to get group ID from API response.");
      }
      const newGroupId = newGroupData.id;

      // Intenta crear la clase usando el ID del grupo
      await newClass(
        newGroupName.trim(),
        1, // Default grade
        userId,
        moment().format(),
        moment().add(1, 'years').format(),
        newGroupId,
        1
      );

      // Si ambas llamadas son exitosas, actualiza la UI
      fetchGroups();
      setNewGroupName("");
      setIsCreateGroupOpen(false);
      toast.success("Group and class created successfully!");

    } catch (error) {
      // Manejo de errores más detallado
      let errorMessage = "Error creating group. ";
      
      if (error.response && error.response.status === 400) {
        // Error de validación del backend
        const errorData = error.response.data;
        if (errorData.idimage && errorData.idimage.includes("does not exist")) {
          errorMessage = "Database initialization error: Default image not found. Please contact the administrator.";
        } else if (typeof errorData === 'object') {
          errorMessage += Object.entries(errorData)
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
            .join('. ');
        } else {
          errorMessage += errorData;
        }
      } else if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += "Please check the API response.";
      }
      
      toast.error(errorMessage);
      console.error("Error creating group:", error);
    }
  }
};

  const handleDeleteGroup = async (groupId) => {
    if (!groupId) {
      toast.warn("Please select a group first")
      return
    }
    try {
      await deleteGroup(groupId)
      await fetchGroups()
      toast.success("Group deleted successfully!")
    } catch (error) {
      toast.error("Error deleting group. Please try again.")
      console.error("Error deleting group:", error)
    }
  }

  const addStudentToGroup = async (studentId) => {
    if (students.some(student => student.userid === studentId)) {
      toast.warn("This student is already in the group.");
      return;
    }
    try {
      await newStudentGroup(studentId, 0, userId, selectedGroupId);
      fetchStudents(selectedGroupId);
      toast.success("Student added successfully!");
      setIsAddStudentOpen(false);
    } catch (error) {
      toast.error("Error adding student. Please try again.");
      console.error("Error adding student to group:", error);
    }
  };

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


  // Crear clase para el grupo seleccionado
  const createClass = async () => {
    if (newClassName.trim() && selectedGroupId) {
      try {
        await newClass(
          newClassName.trim(),
          1, // Default grade
          userId,
          moment().format(),
          moment().add(1, 'years').format(),
          selectedGroupId,
          1
        )
        fetchClasses(selectedGroupId)
        setNewClassName("")
        setIsAddClassOpen(false)
        toast.success("Class created successfully!")
      } catch (error) {
        toast.error("Error creating class.")
      }
    }
  }

  // Abrir modal para asignar libro
  const openAssignBookModal = async () => {
    if (selectedClassId === null || selectedClassId === undefined) {
      toast.warn("Select a class before assigning a book.")
      return
    }
    try {
      const response = await listed()
      setAvailableBooks(response.data)
      setIsAssignBookOpen(true)
    } catch (error) {
      toast.error("Error fetching available books.")
    }
  }

  // Asignar libro seleccionado a la clase
  const addBookToClass = async () => {
    if (!selectedBookId || selectedClassId === null || selectedClassId === undefined) {
      toast.warn("Select a book and a valid class first.")
      return
    }
    try {
      // Validar y loguear el ID de la clase
      const bookIdNum = Number(selectedBookId)
      const classIdNum = Number(selectedClassId)
      if (!classIdNum || isNaN(classIdNum)) {
        toast.error("Class ID is invalid. Cannot assign book.")
        console.error("Class ID invalid:", selectedClassId)
        return
      }
      console.log("Assigning book", bookIdNum, "to class", classIdNum)
      await newBookPerClass(bookIdNum, classIdNum, 1, true)
      toast.success("Book assigned to class!")
      setIsAssignBookOpen(false)
      setSelectedBookId("")
      fetchClassBooks(classIdNum)
    } catch (error) {
      toast.error("Error assigning book.")
      console.error("Error assigning book to class:", error)
    }
  }

  // Quitar libro de clase (simulado)
  const removeBookFromClass = (bookPerClassId) => {
    // Aquí podrías implementar la lógica real si tienes el endpoint
    toast.warn("Removing books from class is not yet implemented.")
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
          <Dropdown onSelect={(eventKey) => setSelectedGroupId(parseInt(eventKey, 10))}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {selectedGroup ? selectedGroup.name : "Choose a group"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {groups.map((group) => (
                <Dropdown.Item key={group.id} eventKey={group.id}>
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
        {groups.length === 0 ? (
  <div style={{textAlign:'center', marginTop:'40px', fontSize:'1.2em', color:'#888'}}>
    No groups created yet.
  </div>
) : selectedGroup && (
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
          <Card.Title>Classes</Card.Title>
          <Card.Text>{classes.length} classes created</Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Average Books</Card.Title>
          <Card.Text>
            {classes.length > 0
              ? `${classBooks.length} books assigned`
              : 'No books assigned yet.'}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>

    <div className="details-cards">
      {/* Students Card */}
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

      {/* Classes Card */}
      <Card>
        <Card.Header>
          <div className="card-header-content">
            <Card.Title>
              <FontAwesomeIcon icon={faChalkboardTeacher} /> Classes
            </Card.Title>
            <Button size="sm" onClick={() => setIsAddClassOpen(true)}>
              <FontAwesomeIcon icon={faPlus} /> Create Class
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          {classes.length > 0 ? (
            classes.map((cls, idx) => {
              const isSelected = Number(selectedClassId) === Number(cls.classesid)
              return (
                <div
                  key={cls.classesid || idx}
                  className={`class-item${isSelected ? ' selected-class' : ''}`}
                  style={{
                    cursor: 'pointer',
                    fontWeight: isSelected ? 'bold' : 'normal',
                    background: isSelected ? '#e6f7ff' : 'transparent',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    marginBottom: '4px',
                    border: isSelected ? '2px solid #1890ff' : '1px solid #eee'
                  }}
                  onClick={() => setSelectedClassId(Number(cls.classesid))}
                >
                  {cls.name ? cls.name : `Class ${cls.classesid}`}
                </div>
              )
            })
          ) : (
            <p>No classes created yet.</p>
          )}
        </Card.Body>
      </Card>

      {/* Books assigned to selected class */}
      {/* Mostrar la tarjeta de libros si hay una clase seleccionada */}
      {selectedClassId !== null && (
        <Card>
          <Card.Header>
            <div className="card-header-content">
              <Card.Title>
                <FontAwesomeIcon icon={faBook} /> Books in {(() => {
                  const cls = classes.find(c => Number(c.classesid) === Number(selectedClassId));
                  return cls && cls.name ? cls.name : 'Class';
                })()}
              </Card.Title>
              <Button
                size="sm"
                onClick={openAssignBookModal}
                disabled={selectedClassId === null || selectedClassId === undefined}
              >
                <FontAwesomeIcon icon={faBook} /> Assign Book
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            {classBooks && classBooks.length > 0 ? (
              classBooks.map((book, idx) => (
                <div key={book.booksperclassesid || book.bookid || idx} className="book-item">
                  <span>{book.title}</span>
                  <Button size="sm" variant="outline-danger" onClick={() => removeBookFromClass(book.booksperclassesid)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              ))
            ) : (
              <p>No books assigned to this class yet.</p>
            )}
          </Card.Body>
        </Card>
      )}
      {/* Modal para asignar libro a clase */}
      <Modal show={isAssignBookOpen} onHide={() => setIsAssignBookOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Book to Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Select a book</Form.Label>
            <Form.Select value={selectedBookId} onChange={e => setSelectedBookId(e.target.value)}>
              <option value="">Choose a book...</option>
              {availableBooks.map(book => (
                <option key={book.bookid} value={book.bookid}>{book.title}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsAssignBookOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addBookToClass}>
            Assign Book
          </Button>
        </Modal.Footer>
      </Modal>
            </div>
          </>
        )}
      </main>

      {/* ...existing modals for group and student... */}

      {/* Modal for creating group */}
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

      {/* Modal for creating class */}
      <Modal show={isAddClassOpen} onHide={() => setIsAddClassOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Class name"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsAddClassOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={createClass}>
            Create Class
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Group

