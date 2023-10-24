import _ from 'lodash'
import './Slide.sass'
import PageContainer from '../PageContainer/PageContainer'

const Slide = ({ slides, onRemoveSlides, onImageCaptured }) => {
  return (
    <>
      {_.map(slides, (slide) => (
        <PageContainer
          key={slide.id}
          pageNumber={slide.id}
          onRemoveSlides={onRemoveSlides}
          onImageCaptured={onImageCaptured}
        />
      ))}
    </>
  )
}

export default Slide
