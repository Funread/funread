import React, { useEffect, useState } from 'react'
import './ReadingView.sass'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Page from './Page'
import ErrorPage from '../ErrorHandler/ErrorPage'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { fullBook } from '../../api/books'
import { useParams } from 'react-router-dom';

function ReadingView() {
  const handle = useFullScreenHandle();
  // Pages Info
  const [pagesCount, setPagesCount] = useState(0);
  const [gridDirection, setGridDirection] = useState(null);
  const [gridNumRows, setGridNumRows] = useState(null);
  const [pageNumer, setPageNumer] = useState(null);
  const [widgets, setWidgets] = useState(null);
  
  // const [currentPage, setCurrentPage] = useState(null);
  //-----------------------------------------------------
   // Book Info
   const location = useLocation();
   const bookid = useParams().id;
   const [contentBook, setContentBook] = useState();
   //----------------------------------------------------
   const [isLoading, setIsLoading] = useState(false);

  // const currentPageData = getCurrentPageData();

  const [error, setError] = useState(null);

  const [currentPageIndex, setCurrentPageIndex] = useState(0); // Estado para la página actual



  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

   
      try {
        const fullBookResponse = await fullBook(bookid).then(data => {
   
          let currentPageContent = data.data.book_content[0]
          setGridDirection( currentPageContent.page.gridDirection);
          setGridDirection( currentPageContent.page.gridDirection);
          setGridNumRows( currentPageContent.page.gridNumRows);
          setPageNumer( currentPageContent.page.elementorder); 
          setWidgets( currentPageContent.widgetitems);        
          setIsLoading(false);
        });
        
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      }  
    }

    fetchData();
  }, [bookid]);

  const goToNextPage = () => {
    if (currentPageIndex < pagesCount - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const exitPresentation = () => {
    handle.exit() // Sale del modo pantalla completa
  }


  return (
    <FullScreen handle={handle}>
      <div className='presentation-container'>
        {/* Renderizado condicional basado en el estado de carga y error */}
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div><ErrorPage/></div>
        ) : (
          <>
            <div className='top-menu'>
              {/* Botones y otros elementos de UI aquí... */}
            </div>
            <Page  gridDirection={gridDirection} gridNumRows={gridNumRows} pageNumer={pageNumer}  widgets={widgets}/>
          </>
        )}
      </div>
    </FullScreen>
  );
}

export default ReadingView
