import React from 'react'
import './poc.css'
import NavbarButtons from '../Components/FR-300/NavbarButtons/NavbarButtons'
import SideNavBar from '../Components/FR-300/SideNavBar/SideNavBar'
import Carousel from '../Components/FR-300/NavBarCarrousel/NavBarCarrousel'
import PageContainer from '../Components/FR-300/PageContainer/PageContainer'

const Poc = () => {
  return (
    <>
      <div id='wrapper'>
        <div id='layoutSidenav'>
        {/* <SideNavBar></SideNavBar> */}

          <div id='layoutSidenav_content'>
            <div id='content-wrapper' className='d-flex flex-column'>
              <div id='content'>
                <NavbarButtons></NavbarButtons>
                <Carousel />
                <PageContainer
                  title={'Activity 3'}
                  image={
                    'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg'
                  }
                  imageWidth={'5px'}
                  imageAlt={'landscape'}
                  text={'Text'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Poc