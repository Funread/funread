import TemplateImage from '../../../POC-FR-312/TemplateImage';
import ContentImage from '../ContentImage/ContentImage'
import './PageContainer.css'



const PageContainer = ({ title, image, width, height, imageAlt, text ,templateSelected}) => {
let template=null
  if(templateSelected===1){
    template= <TemplateImage/>;
  }
  if(templateSelected===2){
    template=<ContentImage/>
  }

 

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <div className='card shadow mb-4 content_page'>
            <div className='card-header py-3 d-flex flex-row align-items-center justify-content-between'>
              <h6 className='m-0 font-weight-bold' style={{color: '#93B1A6'}}>{title}</h6>
            </div>

            <div className='card-body'>
              <div className='card shadow mb-4 centro' >
                <div className='card-body' style={{backgroundColor: '#5C8374'}}>
                  <div className='d-flex flex-column align-items-center justify-content-center ' >
                   
                    {template}
                      {/* <TemplateImage></TemplateImage> */}
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageContainer
