import React from 'react'
import './BookCreator.css'
import NavbarButtons from '../Shared/NavbarButtons/NavbarButtons'
import SidebarLeftTopTop from '../Shared/SidebarLeftTopTop/SidebarLeftTopTop'
import Carousel from '../Shared/NavBarCarrousel/NavBarCarrousel'
import PageContainer from '../Shared/PageContainer/PageContainer'

const BookCreator = () => {
  return (
    <>
      <div className='container-fluid bookCreator'>
        <div className='row flex-nowrap contentBookCreator'>
          <SidebarLeftTopTop />
          <div className='col-ms-10 p-0 mx-auto'>
            <NavbarButtons />
            <Carousel />
            <PageContainer
              title={'Activity 3'}
              image={
                'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg'
              }
              width={'300'}
              height={'300'}
              imageAlt={'landscape'}
              text={'Text'}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default BookCreator
