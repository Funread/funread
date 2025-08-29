import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookView.sass';
import { getMediaUrl } from '../../Utils/mediaUrl';
import { useTranslation } from 'react-i18next';

const BookView = ({ book, onPreview }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const bookImage = book.portrait
    ? getMediaUrl(book.portrait)
    : '/imagenes/no-image.png';

  const handleEditBook = () => {
    let bookID = book.id;
    navigate(`/bookcreator/${bookID}`, {
      state: {
        data: book,
      },
    });
  };

  const handleReadBook = () => {
    let bookID = book.id;
    navigate(`/readingview/${bookID}`, {
      state: {
        data: book.id,
      },
    });
  };

  return (
    <div
      className='mx-auto pt-5 text-white justify-content-center'
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <div className='book-header'>
        <div className='book-title'>{book.title}</div>
        <div className='book-author'>{book.author}</div>
      </div>

      <div className='book-image'>
        <img src={bookImage} width={170} height={300} alt={t('portrait')} />
      </div>

      <div className='book-description'>
        <p>{book.description}</p>
      </div>

      <div
        className='button-section-book'
        style={{ marginTop: 'auto', marginBottom: '30px' }}
      >
        
        <button className='button-editBook' onClick={handleEditBook}>
          {t('Edit')}
        </button>

        <button className='button-editBook' onClick={handleReadBook}>
          {t('Read')}
        </button>
      </div>
    </div>
  );
};

export default BookView;
