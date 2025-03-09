import React from 'react'
import GridPage from './Pages/GridPage'  // Antiguo componente Page renombrado
import KonvaPage from './Pages/KonvaPage'  // Nuevo componente para type 2

const PageSelector = ({ pageType, ...props }) => {
  switch (pageType) {
    case 1:
      return <GridPage {...props} />
    case 2:
      return <KonvaPage {...props} />
    default:
      return <GridPage {...props} />  // Fallback al tipo 1
  }
}

export default PageSelector 