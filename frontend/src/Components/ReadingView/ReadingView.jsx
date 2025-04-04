import React, { useEffect, useState } from 'react'
import './ReadingView.sass'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import ErrorPage from '../ErrorHandler/ErrorPage'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { fullBook } from '../../api/books'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import PageSelector from './PageSelector'

function ReadingView() {

  const navigate = useNavigate()
  const handle = useFullScreenHandle();
  const user = useSelector((state) => state.user)

  // Pages Info
  const [pagesCount, setPagesCount] = useState(0);
  const [gridDirection, setGridDirection] = useState(null);
  const [gridNumRows, setGridNumRows] = useState(null);
  const [pageNumer, setPageNumer] = useState(0);
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
    getBookContent();
    console.log('contentBook---------------')
    console.log(contentBook)
  }, []);

  useEffect(() => {
    console.log('El estado contentBook ha sido actualizado:', contentBook);
  }, [contentBook]); // Este useEffect se ejecutará cada vez que 'contentBook' cambie.


  const getBookContent = () => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const fullBookResponse = await fullBook(bookid).then(data => {

          let currentContent = data.data.book_content
          console.log('asd asd currentContent')
          console.log(currentContent)

          setContentBook(currentContent)
          loadPage(currentContent, pageNumer)
          console.log('BcurrentContent')
          console.log(contentBook)
        });

      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

  };

  useEffect(() => {
    console.log("tiliza pageNumer actual " + contentBook)
    const handleKeyDown = (event) => {
      let currentPage = pageNumer; // Utiliza pageNumer actual para calcular la nueva página

      if (event.key === 'ArrowRight') {
        console.log('ArrowRight');
        if (pageNumer < pagesCount - 1) {
          currentPage = pageNumer + 1;
        }
        if (pageNumer === pagesCount - 1) {
          user.roles.forEach((userRole) => {
            if (userRole.role === "profesor") {
              navigate("/library")
            }
            else if (userRole.role === "estudiante") {
              navigate("/myclasses")
            }
          })


        }
      } else if (event.key === 'ArrowLeft') {
        console.log('ArrowLeft');
        if (pageNumer > 0) {
          currentPage = pageNumer - 1;
        }
      }

      setPageNumer(currentPage);
      console.log("tiliza pageNumer actual " + pageNumer)
      loadPage(contentBook, currentPage);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [contentBook, pageNumer, pagesCount]);


  const loadPage = (currentContent, pageNumber) => {
    console.log('pageNumer')
    console.log(pageNumer)
    console.log('--contentBook---')
    console.log(contentBook)
    console.log('-----')
    console.log('-----')

    let currentPageContent = currentContent[pageNumber]
    setContentBook(currentContent)
    setGridDirection(currentPageContent.page.gridDirection);
    setGridNumRows(currentPageContent.page.gridNumRows);
    setPagesCount(currentContent.length)
    setWidgets(currentPageContent.widgetitems);
    setIsLoading(false);

  };

  const exitPresentation = () => {
    handle.exit() // Sale del modo pantalla completa
  }

  const handlePreviousPage = () => {
    if (pageNumer > 0) {
      const currentPage = pageNumer - 1;
      setPageNumer(currentPage);
      loadPage(contentBook, currentPage);
    }
  };

  const handleNextPage = () => {
    if (pageNumer < pagesCount - 1) {
      const currentPage = pageNumer + 1;
      setPageNumer(currentPage);
      loadPage(contentBook, currentPage);
    } else {
      user.roles.forEach((userRole) => {
        if (userRole.role === "profesor") {
          navigate("/library")
        }
        else if (userRole.role === "estudiante") {
          navigate("/myclasses")
        }
      });
    }
  };

  return (
    <FullScreen handle={handle}>
      <div className='presentation-container'>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div><ErrorPage /></div>
        ) : (
          <div className='reading-view-layout'>
            <div className='top-menu'>
              {/* Botones y otros elementos de UI aquí... */}
            </div>
            <div className='content-wrapper'>
              <div className='page-content'>
                <PageSelector
                  pageType={contentBook?.[pageNumer]?.page?.type || 1}
                  gridDirection={gridDirection}
                  gridNumRows={gridNumRows}
                  pageNumer={pageNumer}
                  widgets={widgets}
                  pageData={contentBook?.[pageNumer]?.page?.data}
                />
              </div>
            </div>
            <div className='navigation-footer'>
              <button
                onClick={handlePreviousPage}
                disabled={pageNumer === 0}
                className='nav-button'
              >
                ←
              </button>
              <span className='page-number'>
                Página {pageNumer + 1} de {pagesCount}
              </span>
              <button
                onClick={handleNextPage}
                disabled={pageNumer === pagesCount - 1}
                className='nav-button'
              >
                →
              </button>

              {pageNumer === pagesCount - 1 && (
                <button
                  onClick={() => {
                    if (user.roles[0].role === "profesor") {
                      navigate("/library");
                    } else if (user.roles[0].role === "estudiante") {
                      navigate("/myclasses");
                    }
                  }}
                className='exit-button'>
                  Salir
                </button>
              )}


            </div>
          </div>
        )}
      </div>
    </FullScreen>
  );
}

export default ReadingView