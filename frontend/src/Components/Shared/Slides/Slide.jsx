import _ from 'lodash'
import './Slide.sass'
import PageContainer from '../PageContainer/PageContainer'

const Slide = ({ slides, onRemoveSlides }) => {
  return (
    <>
      {_.map(slides, (number) => (
        <PageContainer
          key={number}
          pageNumber={number}
          onRemoveSlides={onRemoveSlides}
        />
      ))}
    </>
  )
}

export default Slide
