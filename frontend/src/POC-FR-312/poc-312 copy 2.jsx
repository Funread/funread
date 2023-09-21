import React from 'react'
import './poc-312.css'
import NavbarButtons from '../Components/Shared/NavbarButtons/NavbarButtons'
import Sidebar312 from './Sidebar312'
import Carousel from '../Components/Shared/NavBarCarrousel/NavBarCarrousel'
import PageContainer from '../Components/Shared/PageContainer/PageContainer'

const Poc312 = () => {
  return (
    <>
      <div className='container-fluid p-0'>
        <div className='row flex-nowrap'>
          <Sidebar312 />
          <div className='col-md-10 p-0' style={{ width: '100%' }}>
            <div className='p-0'>
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
      </div>
    </>
  )
}

export default Poc312