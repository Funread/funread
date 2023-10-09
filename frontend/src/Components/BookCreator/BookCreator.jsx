import React from 'react'
import './BookCreator.css'
import NavbarButtons from '../Shared/NavbarButtons/NavbarButtons'
import SidebarLeftTopTop from '../Shared/SidebarLeftTopTop/SidebarLeftTopTop'
import Carousel from '../Shared/NavBarCarrousel/NavBarCarrousel'
import PageContainer from '../Shared/PageContainer/PageContainer'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Grids from '../Shared/Grids/Grids'

const BookCreator = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='container-fluid bookCreator'>
        <div className='row flex-nowrap contentBookCreator'>
          <SidebarLeftTopTop />
          <div className='col-ms-10 p-0 mx-auto'>
            <NavbarButtons />
            <Carousel />
            <PageContainer title={'Activity 3'} />
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

export default BookCreator
