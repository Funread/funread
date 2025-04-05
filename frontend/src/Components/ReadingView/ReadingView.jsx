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
import { submit_quiz_responses } from '../../api/options'

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
  
  // State for managing accumulated quiz points
  const [quizTotalPoints, setQuizTotalPoints] = useState(0);
  const [quizResponses, setQuizResponses] = useState({});

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

  const [currentPageIndex, setCurrentPageIndex] = useState(0); // State for current page
  
  // Load saved responses from localStorage on startup
  useEffect(() => {
    const storedQuizResponses = localStorage.getItem(`quiz_responses_${bookid}_${user?.userid}`);
    if (storedQuizResponses) {
      try {
        const parsedResponses = JSON.parse(storedQuizResponses);
        setQuizResponses(parsedResponses.responses || {});
        setQuizTotalPoints(parsedResponses.totalPoints || 0);
        console.log('Loading saved responses:', parsedResponses);
      } catch (e) {
        console.error('Error loading saved responses:', e);
      }
    }
  }, [bookid, user]);

  useEffect(() => {
    getBookContent();
    console.log('contentBook---------------')
    console.log(contentBook)
  }, []);

  useEffect(() => {
    console.log('The contentBook state has been updated:', contentBook);
  }, [contentBook]); // This useEffect will run each time 'contentBook' changes.

  // Function to save responses to localStorage
  const saveQuizResponsesToLocalStorage = (responses, points) => {
    try {
      const dataToStore = {
        responses,
        totalPoints: points,
        bookId: bookid,
        userId: user?.userid,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem(
        `quiz_responses_${bookid}_${user?.userid}`, 
        JSON.stringify(dataToStore)
      );
      
      console.log('Responses saved to localStorage:', dataToStore);
    } catch (e) {
      console.error('Error saving responses to localStorage:', e);
    }
  };
  
  // Function to update total points
  const updateQuizPoints = (newResponses) => {
    // Calculate total points
    let totalPoints = 0;
    
    Object.values(newResponses).forEach(response => {
      if (response && response.points) {
        totalPoints += response.points;
      }
    });
    
    console.log('Total points updated:', totalPoints);
    setQuizTotalPoints(totalPoints);
    
    // Save to localStorage
    saveQuizResponsesToLocalStorage(newResponses, totalPoints);
    
    return totalPoints;
  };
  
  // Function to save quiz responses
  const handleQuizResponse = (widgetId, responseData) => {
    console.log('Quiz response received:', widgetId, responseData);
    
    // Update local state
    const updatedResponses = {
      ...quizResponses,
      [widgetId]: responseData
    };
    
    setQuizResponses(updatedResponses);
    
    // Update total points
    updateQuizPoints(updatedResponses);
  };

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
    console.log("using current pageNumer " + contentBook)
    const handleKeyDown = (event) => {
      let currentPage = pageNumer; // Use current pageNumer to calculate the new page

      if (event.key === 'ArrowRight') {
        console.log('ArrowRight');
        if (pageNumer < pagesCount - 1) {
          currentPage = pageNumer + 1;
        }
        if (pageNumer === pagesCount - 1) {
          // Submit responses before exiting
          submitResponses();
          
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
      console.log("using current pageNumer " + pageNumer)
      loadPage(contentBook, currentPage);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [contentBook, pageNumer, pagesCount, quizResponses]);


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
    handle.exit() // Exit fullscreen mode
  }

  const handlePreviousPage = () => {
    if (pageNumer > 0) {
      const currentPage = pageNumer - 1;
      setPageNumer(currentPage);
      loadPage(contentBook, currentPage);
    }
  };

  // Function to send all accumulated responses to the API
  const submitResponses = async () => {
    try {
      if (Object.keys(quizResponses).length === 0) {
        console.log('No responses to send');
        return;
      }
      
      console.log('Sending accumulated responses to API:', quizResponses);
      console.log('Total points:', quizTotalPoints);
      
      const userId = user?.userid;
      if (!userId || !bookid) {
        console.error('Could not get user ID or book ID');
        return;
      }
      
      // Send responses to API
      await submit_quiz_responses(quizResponses, bookid, userId);
      
      // Clear localStorage after sending
      localStorage.removeItem(`quiz_responses_${bookid}_${user?.userid}`);
      
      console.log('Responses sent successfully');
      alert(`Quiz completed! You've earned ${quizTotalPoints} points.`);
    } catch (error) {
      console.error('Error sending responses:', error);
    }
  };

  const handleNextPage = () => {
    if (pageNumer < pagesCount - 1) {
      const currentPage = pageNumer + 1;
      setPageNumer(currentPage);
      loadPage(contentBook, currentPage);
    } else {
      // Send accumulated responses to API
      submitResponses();
      
      user.roles.forEach((userRole) => {
        if (userRole.role === "profesor") {
          navigate("/library");
        } else if (userRole.role === "estudiante") {
          navigate("/myclasses");
        }
      });
    }
  };

  return (
    <FullScreen handle={handle}>
      <div className='presentation-container'>
        {/* Floating points indicator - always visible */}
        {quizTotalPoints > 0 && (
          <div className="quiz-points-display">
            Points: {quizTotalPoints}
          </div>
        )}
        
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div><ErrorPage /></div>
        ) : (
          <div className='reading-view-layout'>
            <div className='top-menu'>
              {/* Buttons and other UI elements here... */}
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
                  onQuizResponse={handleQuizResponse}
                  savedResponses={quizResponses}
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
                Page {pageNumer + 1} of {pagesCount}
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
                    // Submit responses before exiting
                    submitResponses();
                    
                    if (user.roles[0].role === "profesor") {
                      navigate("/library");
                    } else if (user.roles[0].role === "estudiante") {
                      navigate("/myclasses");
                    }
                  }}
                className='exit-button'>
                  Exit
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