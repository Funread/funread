import './Group.css'
import React, { useState, useEffect } from 'react'
import { Button, Card, Modal, Form, Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faUserPlus, faBook, faUsers, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import { listedCreatedBy, newGroup, deleteGroup } from '../../api/group'
import { studentGroupSearch, newStudentGroup, deleteStudentGroup } from '../../api/studentGroups'
import { newClass, listedClassesId, classesChange, deleteclasses } from '../../api/classes'
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
  const [classStartDate, setClassStartDate] = useState("")
  const [classEndDate, setClassEndDate] = useState("")
  const [selectedClassId, setSelectedClassId] = useState(null)
  const [classBooks, setClassBooks] = useState([])
  const [isAssignBookOpen, setIsAssignBookOpen] = useState(false)
  const [availableBooks, setAvailableBooks] = useState([])
  const [selectedBookId, setSelectedBookId] = useState("")
  const [isEditClassOpen, setIsEditClassOpen] = useState(false)
  const [editingClassId, setEditingClassId] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [classToDelete, setClassToDelete] = useState(null)
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
      // Crear el grupo
      const groupResponse = await newGroup(newGroupName.trim(), "", userId, 1);
      const newGroupData = groupResponse.data;
      
      // Validar que el grupo se haya creado correctamente
      if (!newGroupData || !newGroupData.id) {
        throw new Error("Failed to get group ID from API response.");
      }

      // Si la llamada es exitosa, actualizar la UI
      fetchGroups();
      setNewGroupName("");
      setIsCreateGroupOpen(false);
      toast.success("Group created successfully!");

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
    if (newClassName.trim() && selectedGroupId && classStartDate && classEndDate) {
      // Validar que la fecha de finalización sea posterior a la de inicio
      if (new Date(classEndDate) <= new Date(classStartDate)) {
        toast.error("End date must be after start date.");
        return;
      }
      
      try {
        await newClass(
          newClassName.trim(),
          1, // Default grade
          userId,
          moment(classStartDate).format(),
          moment(classEndDate).format(),
          selectedGroupId,
          1
        )
        fetchClasses(selectedGroupId)
        setNewClassName("")
        setClassStartDate("")
        setClassEndDate("")
        setIsAddClassOpen(false)
        toast.success("Class created successfully!")
      } catch (error) {
        toast.error("Error creating class.")
        console.error("Error creating class:", error)
      }
    } else {
      toast.warn("Please fill in all required fields.")
    }
  }

  // Función para editar clase
  const handleEditClass = (classToEdit) => {
    setEditingClassId(classToEdit.classesid)
    setNewClassName(classToEdit.name || "")
    setClassStartDate(moment(classToEdit.startdate).format('YYYY-MM-DD'))
    setClassEndDate(moment(classToEdit.finishdate).format('YYYY-MM-DD'))
    setIsEditClassOpen(true)
  }

  // Función para actualizar clase
  const updateClass = async () => {
    if (newClassName.trim() && classStartDate && classEndDate) {
      if (new Date(classEndDate) <= new Date(classStartDate)) {
        toast.error("End date must be after start date.");
        return;
      }

      try {
        await classesChange(
          editingClassId,
          newClassName.trim(),
          1, // Default grade
          userId,
          moment().format(),
          moment().format(),
          moment(classStartDate).format(),
          moment(classEndDate).format(),
          selectedGroupId,
          1
        )
        fetchClasses(selectedGroupId)
        setNewClassName("")
        setClassStartDate("")
        setClassEndDate("")
        setEditingClassId(null)
        setIsEditClassOpen(false)
        toast.success("Class updated successfully!")
      } catch (error) {
        toast.error("Error updating class.")
        console.error("Error updating class:", error)
      }
    } else {
      toast.warn("Please fill in all required fields.")
    }
  }

  // Función para eliminar clase
  const handleDeleteClass = async (classId) => {
    setClassToDelete(classId)
    setShowDeleteConfirm(true)
  }

  // Función para confirmar eliminación
  const confirmDeleteClass = async () => {
    try {
      await deleteclasses(classToDelete)
      if (selectedClassId === classToDelete) {
        setSelectedClassId(null)
        setClassBooks([])
      }
      await fetchClasses(selectedGroupId)
      toast.success("Class deleted successfully!")
      setShowDeleteConfirm(false)
      setClassToDelete(null)
    } catch (error) {
      toast.error("Error deleting class.")
      console.error("Error deleting class:", error)
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
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontWeight: isSelected ? 'bold' : 'normal',
                    background: isSelected ? '#e6f7ff' : 'transparent',
                    borderRadius: '6px',
                    padding: '10px',
                    marginBottom: '8px',
                    border: isSelected ? '2px solid #1890ff' : '1px solid #eee'
                  }}
                >
                  <span
                    onClick={() => setSelectedClassId(Number(cls.classesid))}
                    style={{flex: 1}}
                  >
                    {cls.name ? cls.name : `Class ${cls.classesid}`}
                  </span>
                  <div style={{display: 'flex', gap: '5px'}}>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditClass(cls)
                      }}
                      title="Edit class"
                    >
                      ✎
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteClass(cls.classesid)
                      }}
                      title="Delete class"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
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
    </div>
    </>
  )}
</main>

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

      {/* Modal for adding student */}
      <Modal show={isAddStudentOpen} onHide={() => setIsAddStudentOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student to Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Search student..."
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
          />
          <div style={{maxHeight: '300px', overflowY: 'auto', marginTop: '10px'}}>
            {filteredStudents.map((student) => (
              <div
                key={student.userid}
                style={{
                  padding: '8px',
                  borderBottom: '1px solid #eee',
                  cursor: 'pointer'
                }}
                onClick={() => addStudentToGroup(student.userid)}
              >
                {student.name} {student.lastname}
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>

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
          <Form.Group className="mb-3">
            <Form.Label>Class name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter class name"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={classStartDate}
              onChange={(e) => setClassStartDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={classEndDate}
              onChange={(e) => setClassEndDate(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setIsAddClassOpen(false)
            setNewClassName("")
            setClassStartDate("")
            setClassEndDate("")
          }}>
            Cancel
          </Button>
          <Button variant="primary" onClick={createClass}>
            Create Class
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for editing class */}
      <Modal show={isEditClassOpen} onHide={() => {
        setIsEditClassOpen(false)
        setEditingClassId(null)
        setNewClassName("")
        setClassStartDate("")
        setClassEndDate("")
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Class name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter class name"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={classStartDate}
              onChange={(e) => setClassStartDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={classEndDate}
              onChange={(e) => setClassEndDate(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setIsEditClassOpen(false)
            setEditingClassId(null)
            setNewClassName("")
            setClassStartDate("")
            setClassEndDate("")
          }}>
            Cancel
          </Button>
          <Button variant="primary" onClick={updateClass}>
            Update Class
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for confirming class deletion */}
      <Modal show={showDeleteConfirm} onHide={() => {
        setShowDeleteConfirm(false)
        setClassToDelete(null)
      }} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this class?</p>
          <p style={{fontSize: '0.9em', color: '#666', marginTop: '10px'}}>
            This action cannot be undone. All associated books and data will be removed.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowDeleteConfirm(false)
            setClassToDelete(null)
          }}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteClass}>
            Delete Class
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Group

