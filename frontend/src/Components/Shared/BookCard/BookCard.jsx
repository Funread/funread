import './BookCard.css'

const BookCard = ({
  id,
  image,
  title,
  author,
  category,
  description,
  color,
  toggleSidebar,
}) => {
  return (
    <div
      className='card'
      style={{ width: '235px', borderRadius: '5px', backgroundColor: color, border: 'none'}}
      onClick={() => toggleSidebar({id,
        image,
        title,
        author,
        category,
        description,
        color,})}
    >
      <div className='d-flex align-items-center'>
        <div style={{ padding: '20px 0 20px 20px' }}>
          <img
            className='card-img'
            src={image}
            alt='Portrait'
            style={{ width: '90px', height: '160px', borderRadius: '0px' }}
          />
        </div>
        <div className='card-body d-flex flex-column justify-content-between'>
          <h5 className='card-title clamp-text custom-title'>{title}</h5>
          <div>
            <span className='card-text clamp-text custom-text'>{author}</span>
            <span className='card-text clamp-text custom-text'>{category}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard
