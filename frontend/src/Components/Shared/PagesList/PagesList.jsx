import './PagesList.css'
import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const PagesList = () => {
  return (
    <Navbar bg='light' data-bs-theme='light'>
      <div className='container-sm m-0'>
        <div className='custom_section' style={{ width: '100%'}}>
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ].map((i) => (
            <div key={i} className='custom_section_item my-3'>
              <div className='page'>
                <img
                  src={
                    'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg'
                  }
                  alt='Imagen'
                  style={{ width: '30px', height: '30px', marginRight: '1px' }}
                />
                {i}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Navbar>
    
  )
}

export default PagesList;
