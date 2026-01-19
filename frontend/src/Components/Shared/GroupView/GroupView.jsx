import './GroupView.css'
import { useState, useEffect } from 'react'
import { upload } from '../../../api/media'
import { getMediaUrl } from '../../Utils/mediaUrl'

const GroupView = ({ name, idimage }) => {
  const [image, setImage] = useState(null)

  //Obtener image del grupo
  useEffect(() => {
    async function fetchData() {
      if (idimage) {
        try {
          const imageRoute = await upload(idimage)

          setImage(getMediaUrl(imageRoute.data.file_route))
        } catch (error) {
          
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
