import React, { useState } from 'react';
import './BookCreator.sass';
import NavbarButtons from '../Shared/NavbarButtons/NavbarButtons';
import SidebarLeftTopTop from '../Shared/SidebarLeftTopTop/SidebarLeftTopTop';
import Carousel from '../Shared/NavBarCarrousel/NavBarCarrousel';
import PageContainer from '../Shared/PageContainer/PageContainer';
import Grids from '../Shared/Grids/Grids';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt, faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';

const BookCreator = () => {
  const handle = useFullScreenHandle();
  const [buttonVisible, setButtonVisible] = useState(true);

  const toggleButtonVisibility = (isVisible) => {
    setButtonVisible(isVisible);
  };

  const handleEnterFullScreen = () => {
    toggleButtonVisibility(false);
    handle.enter();
  };

  const handleExitFullScreen = () => {
    toggleButtonVisibility(true);
    handle.exit();
  };

  return (
    <>
      <div className="container-fluid bookCreator">
        <div className="row flex-nowrap contentBookCreator">
          <SidebarLeftTopTop />
          <div className="col-ms-10 p-0 mx-auto">
            <NavbarButtons />
            <Carousel />

            <FullScreen handle={handle}>
              <div className="myactivity">
                {!handle.active && (
                  <div className="fullscreen-buttons">
                    <button id="buttonExpand" onClick={handleEnterFullScreen}>
                      <FontAwesomeIcon icon={faExpandArrowsAlt} />
                      <i className="fa fa-expand"></i>
                    </button>
                  </div>
                )}

         

                <PageContainer
                  title={'Activity 3'}
                  image={'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg'}
                  imageAlt={'landscape'}
                  text={'Text'}
                  
                />
              </div>
            </FullScreen>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookCreator;
