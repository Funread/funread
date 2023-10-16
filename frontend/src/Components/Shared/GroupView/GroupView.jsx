import './GroupView.css'
import jwt_decode from 'jwt-decode'
import { Select } from 'antd'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useLogin } from '../../../hooks/useLogin'
import { useEffect } from 'react'

const initialState = {
  userid: null,
  isTeacher: 0,
  createdby: null,
  groupscreateid: null,
}

const getImage = 'http://localhost:8000/Media/'
const { Option } = Select
const students = [
  { id: 1, studentName: 'Gabriela Mendez' },
  { id: 2, studentName: 'Raul Arias' },
  { id: 3, studentName: 'Mauricio Solis' },
  { id: 4, studentName: 'Sofia Soto' },
  { id: 5, studentName: 'Gabriela Mendez' },
  { id: 6, studentName: 'Raul Arias' },
  { id: 7, studentName: 'Mauricio Solis' },
  { id: 8, studentName: 'Sofia Soto' },
  { id: 9, studentName: 'Brenda Carvajal' },
  { id: 10, studentName: 'Brenda Carvajal' },
]

const GroupView = ({ id, name, idimage }) => {
  const [selectedStudents, setSelectedStudents] = useState([])
  const [student, setStudent] = useState(initialState)
  const [image, setImage] = useState(null)
  const token = sessionStorage.getItem('jwt')
  const { axiosAuth } = useLogin()

  useEffect(() => {
    // Decodifica el JWT cuando el componente se monta
    if (token) {
      const decodedToken = jwt_decode(token)

      // Actualiza el estado del grupo con la información del JWT
      setStudent((prevData) => ({
        ...prevData,
        createdby: decodedToken.user_id,
      }))
    }
  }, [token])

  useEffect(() => {
    async function fetchData() {
      if (idimage) {
        try {
          if (axiosAuth() !== null) {
            const imageRoute = await axiosAuth().post('Media/upload/', {
              name: idimage,
            })
            setImage(`${getImage}${imageRoute.data.image_route}`)
          }
        } catch (error) {
          console.log('error', error)
        }
      }
    }

    fetchData()
  }, [axiosAuth, idimage])

  useEffect(() => {
    async function fetchData() {
      if (idimage) {
        try {
          if (axiosAuth() !== null) {
            const imageRoute = await axiosAuth().post('Media/upload/', {
              name: idimage,
            })
            setImage(`${getImage}${imageRoute.data.image_route}`)
          }
        } catch (error) {
          console.log('error', error)
        }
      }
    }

    fetchData()
  }, [axiosAuth, idimage])

  const handleSelect = async (value) => {
    const selectedOption = students.find((student) => student.id === value)

    if (!selectedStudents.some((student) => student.id === selectedOption.id)) {
      setSelectedStudents([...selectedStudents, selectedOption])

      const updatedStudent = {
        ...student,
        userid: selectedOption.id,
        groupscreateid: id,
      }

      setStudent(updatedStudent)

      try {
        if (axiosAuth() !== null) {
          const response = await axiosAuth().post(
            'studentsgroups/studentsgroups/insertnewStudentsGroups/',
            updatedStudent
          )
          console.log(response.data)
          //   toast.success(`${response.data.name} was created successfully`)
        }
      } catch (error) {
        console.log('Error', error)
        // toast.error(
        //   'Request Error: An error occurred while processing your request'
        // )
      }
    }
  }

  const handleDeleteStudent = (studentId) => {
    const updatedStudents = selectedStudents.filter(
      (student) => student.id !== studentId
    )
    setSelectedStudents(updatedStudents)

    // Falta endpoint para eliminar estudiantes del grupo
  }

  return (
    <div className='mx-auto pt-5 text-white justify-content-center'>
      <div className='book-header'>
        <div className='book-title'>{name}</div>
      </div>

      <div className='book-image'>
        <img src={image} width={170} height={250} alt='group' />
      </div>

      <Select
        className='custom-group-view-select mt-3 mb-3'
        placeholder='Select a student'
        onSelect={handleSelect}
      >
        {_.map(students, (student) => (
          <Option key={student.id} value={student.id}>
            {student.studentName}
          </Option>
        ))}
      </Select>

      {_.map(selectedStudents, (student) => (
        <div className='d-flex' key={student.id}>
          <div className='student-group-view'>
            <span className='custom-span-group-view-student-name '>
              {student.studentName}
            </span>
          </div>
          <button
            className='custom-group-view-delete-button'
            onClick={() => handleDeleteStudent(student.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default GroupView
