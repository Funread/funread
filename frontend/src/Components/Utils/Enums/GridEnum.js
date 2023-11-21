import Grids from '../../Shared/Grids/Grids'

export const GridEnum = (gridDirection, gridRows) => {
  const grid = `${gridDirection}_${gridRows}`

  switch (grid) {
    case 'horizontal_1':
      return <Grids direction={'horizontal'} numRows={1} modeStudent={true} />
    case 'vertical_2':
      return <Grids direction={'vertical'} numRows={2} modeStudent={true} />
    case 'horizontal_3':
      return <Grids direction={'horizontal'} numRows={3} modeStudent={true} />
    case 'quadruple_4':
      return <Grids direction={'quadruple'} numRows={4} modeStudent={true} />
    case 'horizontal_2':
      return <Grids direction={'horizontal'} numRows={2} modeStudent={true} />
    case 'collage_7':
      return <Grids direction={'collage'} numRows={7} modeStudent={true} />
    default:
      return null
  }
}
