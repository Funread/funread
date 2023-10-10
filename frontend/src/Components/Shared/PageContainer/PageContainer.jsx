import { useState } from 'react'
import UniqueSelection from '../../Widgets/Quiz/UniqueSelection'
// import ContentImage from '../ContentImage/ContentImage'
// import Grids from '../Grids/Grids'
import './PageContainer.css'

const PageContainer = ({ title, image, width, height, imageAlt, text }) => {
  const [saveData, setSaveData] = useState(null)

  const save = (data) => {
    console.log(data)
    setSaveData(true)
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <div className='card shadow mb-4 content_page'>
            <div className='card-header py-3 d-flex flex-row align-items-center justify-content-between'>
              <h6 className='m-0 font-weight-bold text-primary'>{title}</h6>
              <button onClick={save}>save</button>
            </div>

            <div>{/* <Grids /> */}</div>
            <UniqueSelection saveData={save} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageContainer
