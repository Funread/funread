import ContentImage from '../ContentImage/ContentImage'
import Grids from '../Grids/Grids'
import './PageContainer.sass'

const PageContainer = ({ title, image, width, height, imageAlt, text }) => {
  return (
    <div className='container-fluid'>
    <div className='row'>
        <div className='col'>
            <div className='card shadow mb-4 content_page'>
                <div className='card-header py-3 d-flex flex-row align-items-center justify-content-between'>
                    <h6 className='m-0 font-weight-bold text-primary'>{title}</h6>
                </div>

                <div className='card-body'>
                <Grids />
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default PageContainer
