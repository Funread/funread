import _ from 'lodash'
import './Slide.sass'
import PageContainer from '../PageContainer/PageContainer'

const Slide = ({
  slides,
  onRemoveSlides,
  updateImage,
  addOrUpdatePage,
  widgetChange,
  pageInfo,
}) => {
  return (
    <>
      {_.map(slides, (slide) => (
        <PageContainer
          key={slide.id}
          pageNumber={slide.id}
          order={slide.order}
          onRemoveSlides={onRemoveSlides}
          updateImage={updateImage}
          addOrUpdatePage={addOrUpdatePage}
          widgetChange={widgetChange}
          pageInfo={pageInfo}
        />
      ))}
    </>
  )
}

export default Slide
