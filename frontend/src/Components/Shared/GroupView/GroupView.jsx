import './GroupView.css'
import { useState, useEffect } from 'react'
import { upload } from '../../../api/media'
import { REACT_APP_API_URL } from '../../../env'

const getImage = REACT_APP_API_URL

const GroupView = ({ name, idimage }) => {
  const [image, setImage] = useState(null)

  //Obtener image del grupo
  useEffect(() => {
    async function fetchData() {
      if (idimage) {
        try {
          const imageRoute = await upload(idimage)

          setImage(`${getImage}${imageRoute.data.file_route}`)
        } catch (error) {
          console.log('error', error)
        }
      }
    }

    fetchData()
  }, [idimage])

  return (
    <div className='mx-auto pt-5 text-white justify-content-center'>
      <div className='book-header'>
        <div className='book-title'>{name}</div>
      </div>

      <div className='book-image'>
        <img src={image} width={170} height={250} alt='group' />
      </div>
    </div>
  )
}

export default GroupView
