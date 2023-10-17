import './GroupView.css'
import { useState, useEffect } from 'react'
import { useLogin } from '../../../hooks/useLogin'

const getImage = 'http://localhost:8000/Media/'

const GroupView = ({ name, idimage }) => {
  const [image, setImage] = useState(null)
  const { axiosAuth } = useLogin()

  //Obtener image del grupo
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
