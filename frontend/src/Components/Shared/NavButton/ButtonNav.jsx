import './ButtonNav.sass'

const ButtonNav = ({ title, onClickHandler }) => {
  return (
    <button onClick={onClickHandler} className='section-btn-navbar'>
      {title}
    </button>
  )
}

export default ButtonNav
