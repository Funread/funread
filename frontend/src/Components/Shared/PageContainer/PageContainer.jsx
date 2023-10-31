import React, { useState, useEffect } from 'react';
import UniqueSelection from '../../Widgets/Quiz/UniqueSalection/UniqueSelection';
import './PageContainer.sass';
import { useDrop } from 'react-dnd';
import Grids from '../Grids/Grids';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';

const widgetType = 'widgetType';

const widgetTypeToComponent = {
  UniqueSelection: UniqueSelection,
  Grids: Grids,
};


const PageContainer = ({ title }) => {
  const [buttonVisible, setButtonVisible] = useState(true);
  const [droppedComponent, setDroppedComponent] = useState(null);
  const [saveData, setSaveData] = useState(null);
  const [isEditingEnabled, setIsEditingEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const save = (data) => {
    console.log(data);
    setSaveData(true);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: widgetType,
    drop: (item) => {
      const droppedComponentInfo = {
        type: item.type,
        direction: item.direction,
        rows: item.numRows,
      };
      setDroppedComponent(droppedComponentInfo);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const remove = () => {
    setDroppedComponent(null);
  };



  const handle = useFullScreenHandle();

  const toggleButtonVisibility = (isVisible) => {
    setButtonVisible(isVisible);
  };


 

  const handleEnterFullScreen = () => {
    toggleButtonVisibility(false);
    handle.enter();
    setIsFullscreen(true);
    setIsEditingEnabled(false);
  };

  const toggleFullScreen = () => {
    if (isFullscreen) {
      handleExitFullScreen();
    } else {
      handleEnterFullScreen();
    }
  };

  const handleExitFullScreen = () => {
    toggleButtonVisibility(true);
    handle.exit();
  };
  
  // Agregar un manejador de eventos para habilitar ediciones al salir del modo de pantalla completa
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        // Detectar que hemos salido del modo pantalla completa
        setIsFullscreen(false);
        setIsEditingEnabled(true); // Habilitar la edición al salir del modo pantalla completa
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isFullscreen]);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <FullScreen handle={handle}>
            <div className='card shadow mb-4 content_page'>
              <div className='card-header py-3 d-flex flex-row align-items-center justify-content-between'>
                <h6 className='m-0 font-weight-bold text-primary'>{title}</h6>
                <div className='d-flex'>
                  <button onClick={remove}>
                    <img src='/escoba.png' alt='Clear' />
                  </button>
                  <button onClick={save}>
                    <img src='/expediente.png' alt='Save' />
                  </button>
                  {isFullscreen ? (
                    <button id='buttonExitFullscreen' onClick={handleExitFullScreen}>
                      <img src='/hide.png' alt='hide' />
                    </button>
                  ) : (
                    <button id='buttonExpand' onClick={handleEnterFullScreen}>
                      <img src='/view.png' alt='view' />
                    </button>
                  )}
                </div>
              </div>

              <div className={`card-body custom-card-body-page-container p-0 ${isFullscreen ? 'fullscreen' : ''}`} ref={drop}>
                {droppedComponent &&
                  widgetTypeToComponent[droppedComponent.type] &&
                  React.createElement(
                    widgetTypeToComponent[droppedComponent.type],
                    {
                      saveData,
                      direction: droppedComponent.direction,
                      numRows: droppedComponent.rows,
                      isEditingEnabled,
                    }
                  )}
              </div>
            </div>
          </FullScreen>
        </div>
      </div>
    </div>
  );
};

export default PageContainer;
