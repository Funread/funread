import './BookView.css'

const BookView = ({ title, description, image, author }) => {
  return (
    <div
      className='container mx-auto pt-5 text-white justify-content-center'
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <div className='book-header'>
        <div className='book-title'>{title}</div>
        <div className='book-author'>{author}</div>
      </div>

      <div className='book-image'>
        <img src={image} width={170} height={300} alt='portrait' />
      </div>

      <div className='book-description'>
        <p>{description}</p>
      </div>

      <div
        className='button-section'
        style={{ marginTop: 'auto', marginBottom: '30px' }}
      >
        <button className='button'>Botón 1</button>
        <button className='button'>Botón 2</button>
      </div>
    </div>
  )
}

export default BookView
