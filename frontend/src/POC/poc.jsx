import React from 'react'
import './poc.css'
import NavbarButtons from '../Components/Shared/NavbarButtons/NavbarButtons'
import SideNavBar from '../Components/Shared/SideNavBar/SideNavBar'
import Carousel from '../Components/Shared/NavBarCarrousel/NavBarCarrousel'
import PageContainer from '../Components/Shared/PageContainer/PageContainer'


const Poc = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          <div className="col p-0 sidenav">
            <SideNavBar />
          </div>
          
          <div className="col p-0">
            <NavbarButtons style={{maxWidth: '70%'}}/>
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

      {/* <div id='wrapper'>
        <div id='layoutSidenav'>
        <SideNavBar></SideNavBar>

          <div id='layoutSidenav_content'>
            <div id='content-wrapper' classNameName='d-flex flex-column'>
              <div id='content'>
                <div >
                  <NavbarButtons />
                  <Carousel />
                </div>
                
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
      </div> */}
    </>
  )
}

export default Poc