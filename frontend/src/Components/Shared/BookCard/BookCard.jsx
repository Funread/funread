import React, { useState, useEffect } from 'react';
import './BookCard.sass';
import { searchCategory } from '../../../api/bookDilemma';
import { getMediaUrl } from '../../Utils/mediaUrl';
import { useTranslation } from 'react-i18next';

const BookCard = ({
  id,
  portrait,
  title,
  author,
  category,
  description,
  color,
  toggleSidebar,
}) => {
  const { t } = useTranslation();
  const [categoryName, setCategoryName] = useState('')
  const imageCard = portrait
    ? getMediaUrl(portrait)
    : '/imagenes/no-image.png'

  useEffect(() => {
    async function fetchData() {
      try {
        if (category) {
          const response = await searchCategory(category)
          setCategoryName(response.data.name)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [category])

  return (
    <div
      className='Book-card'
      style={{
        backgroundColor: color,
      }}
      onClick={() =>
        toggleSidebar({
          id,
          portrait,
          title,
          author,
          category,
          description,
          color,
        })
      }
    >
      <div className='d-flex align-items-center'>
        <div style={{ padding: '20px 0 20px 20px' }}>
          <img
            className='card-img'
            src={imageCard}
            alt={t('Portrait')}
          />
        </div>
        <div className='card-body d-flex flex-column justify-content-between'>
          <h5 className='card-title clamp-text custom-title'>{title}</h5>
          <div>
            <span className='card-text clamp-text custom-text' >{author}</span>
            <span className='card-text clamp-text custom-text'>
              {categoryName}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard;
