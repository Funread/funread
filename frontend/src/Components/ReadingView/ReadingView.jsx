import React, { useEffect, useState } from "react";
import "./ReadingView.sass";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ErrorPage from "../ErrorHandler/ErrorPage";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { fullBook } from "../../api/books";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import PageSelector from "./PageSelector";
import { award_badge_to_user } from "../../api/userBadges";
import { getBadgesPerBook } from "../../api/Badges";
import PopUpAchieve from "../Badges/PopUpAchieve";
import { getMediaUrl } from "../../Components/Utils/mediaUrl";
import { addPointsToUser } from "../../api/userPoints";
import { store } from "../../redux/store";
import { markBookAsCompleted, markPointsAwarded } from "../../api/userBookProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ChevronLeft, ChevronRight, BookOpen, Star } from "lucide-react";

function ReadingView() {
  const navigate = useNavigate();
  const handle = useFullScreenHandle();
  const user = useSelector((state) => state.user);

  const [pagesCount, setPagesCount] = useState(0);
  const [gridDirection, setGridDirection] = useState(null);
  const [gridNumRows, setGridNumRows] = useState(null);
  const [pageNumer, setPageNumer] = useState(0);
  const [widgets, setWidgets] = useState(null);

  const [quizTotalPoints, setQuizTotalPoints] = useState(0);
  const [quizResponses, setQuizResponses] = useState({});

  const location = useLocation();
  const bookid = useParams().id;
  const [contentBook, setContentBook] = useState();

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [totalImagesToLoad, setTotalImagesToLoad] = useState(0);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  const [error, setError] = useState(null);

  const [currentPageIndex, setCurrentPageIndex] = useState(0); 
  const state = store.getState(); 
  const userId = state.user.userId; 

  useEffect(() => {
    const raw = localStorage.getItem(`quiz_responses_${userId}`);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      setQuizResponses(parsed.responses || {}); 
      setQuizTotalPoints(parsed.totalPoints || 0);
    } catch (e) {
      console.error(e);
    }
  }, [userId]);

  useEffect(() => {
    getBookContent();
  }, []);

  useEffect(() => {
    if (contentBook) {
      preloadAllImages();
    }
  }, [contentBook]);

  const handleQuizResponse = (pageIndex, questionId, answer, isCorrect, pointsAwarded) => {
    const points = Number(pointsAwarded) || 0;

    const prevPageResponses = quizResponses[pageIndex] || {};
    const updatedPageResponses = {
      ...prevPageResponses,
      [questionId]: { answerId: answer, isCorrect, pointsAwarded: points },
    };

    const newResponses = {
      ...quizResponses,
      [pageIndex]: updatedPageResponses,
    };

    setQuizResponses(newResponses);

    let totalCorrectPoints = 0;
    Object.values(newResponses).forEach(pageObj => {
      Object.values(pageObj || {}).forEach(resp => {
        if (resp.isCorrect) totalCorrectPoints += Number(resp.pointsAwarded || 0);
      });
    });
    setQuizTotalPoints(totalCorrectPoints);

    try {
      localStorage.setItem(
        `quiz_responses_${userId}`,
        JSON.stringify({ responses: newResponses, totalPoints: totalCorrectPoints })
      );
    } catch (e) {
      console.error("Error saving responses to localStorage:", e);
    }
  };

  const preloadAllImages = () => {
    if (!contentBook || contentBook.length === 0) return;

    setImagesLoaded(false);

    const imageWidgets = [];
    contentBook.forEach((pageContent) => {
      if (pageContent.widgetitems) {
        const pageWidgets = pageContent.widgetitems.filter(
          (widget) =>
            widget.type === "2" || 
            (widget.value && widget.value.src) 
        );
        imageWidgets.push(...pageWidgets);
      }
    });

    if (imageWidgets.length === 0) {
      setImagesLoaded(true);
      return;
    }

    setTotalImagesToLoad(imageWidgets.length);
    setLoadedImagesCount(0);

    imageWidgets.forEach((widget) => {
      const imgSrc =
        widget.value && widget.value.src ? getMediaUrl(widget.value.src) : null;
      if (!imgSrc) {
        setLoadedImagesCount((prev) => prev + 1);
        return;
      }

      const img = new Image();
      img.onload = () => {
        setLoadedImagesCount((prev) => prev + 1);
      };
      img.onerror = () => {
        console.error(`Error loading image: ${imgSrc}`);
        setLoadedImagesCount((prev) => prev + 1);
      };
      img.src = imgSrc;
    });
  };

  useEffect(() => {
    if (totalImagesToLoad > 0 && loadedImagesCount >= totalImagesToLoad) {
      setImagesLoaded(true);
    }
  }, [loadedImagesCount, totalImagesToLoad]);

  const getBookContent = () => {
    async function fetchData() {
      setError(null);

      try {
        const fullBookResponse = await fullBook(bookid).then((data) => {
          let currentContent = data.data.book_content;

          if (currentContent && Array.isArray(currentContent) && currentContent.length > 0) {
            setContentBook(currentContent);
            loadPage(currentContent, pageNumer);
          } else {
            console.warn('getBookContent: received empty or invalid content for book', bookid);
            setContentBook([]);
          }
        });
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      let currentPage = pageNumer; 

      if (event.key === "ArrowRight") {
        if (pageNumer < pagesCount - 1) {
          currentPage = pageNumer + 1;
          setDirection("right");
        }
        if (pageNumer === pagesCount - 1) {
          submitResponses();
          navigate("/dashboard");
        }
      } else if (event.key === "ArrowLeft") {
        if (pageNumer > 0) {
          currentPage = pageNumer - 1;
          setDirection("left");
        }
      }

      setPageNumer(currentPage);
      loadPage(contentBook, currentPage);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [contentBook, pageNumer, pagesCount, quizResponses]);

  const loadPage = (currentContent, pageNumber) => {
    if (!currentContent || !Array.isArray(currentContent) || currentContent.length === 0) {
      console.warn('loadPage: currentContent is empty or invalid');
      return;
    }

    if (pageNumber == null || pageNumber < 0 || pageNumber >= currentContent.length) {
      console.warn('loadPage: pageNumber out of range', pageNumber);
      return;
    }

    const currentPageContent = currentContent[pageNumber];
    if (!currentPageContent) {
      console.warn('loadPage: currentPageContent is undefined for page', pageNumber);
      return;
    }

    setContentBook(currentContent);
    setGridDirection(currentPageContent.page?.gridDirection || null);
    setGridNumRows(currentPageContent.page?.gridNumRows || null);
    setPagesCount(currentContent.length);
    setWidgets(currentPageContent.widgetitems || []);
  };

  const exitPresentation = () => {
    handle.exit();
  };

  const handlePreviousPage = () => {
    if (pageNumer > 0) {
      const currentPage = pageNumer - 1;
      setDirection("left");
      setPageNumer(currentPage);
      loadPage(contentBook, currentPage);
    }
  };
  const submitResponses = async () => {
    try {

      if (Object.keys(quizResponses).length === 0) {
        alert("This book does not have quizzes or you haven't answered any quiz questions. The book will not be marked as completed.");
        return;
      }

      let alreadyAwarded = false;
      let automaticBadges = []; // Badges asignados automáticamente por el backend
      
      try {
        const markResponse = await markBookAsCompleted(userId, bookid);
        
        alreadyAwarded = markResponse.data?.already_awarded || false;
        
        // Capturar badges automáticos asignados por el backend
        if (markResponse.data?.badges_assigned && markResponse.data.badges_assigned.length > 0) {
          automaticBadges = markResponse.data.badges_assigned;
          
          // Guardar badges automáticos en localStorage para mostrarlos después
          localStorage.setItem('automatic_badges', JSON.stringify(automaticBadges));
        }
        
        if (alreadyAwarded) {
          alert("You have already completed this book and received the points.");
          localStorage.removeItem(`quiz_responses_${userId}`);
          return;
        }
      } catch (markError) {
        console.error("Error marking book as completed:", markError);
        alert(`Error marking book as completed: ${markError.message || markError}`);
        return;
      }

      if (!userId) {
        console.error("Could not get user ID");
        alert("Error: User ID not found. Please log in again.");
        return;
      }

      localStorage.setItem('book_completed_trigger', JSON.stringify({
        userId: userId,
        bookId: bookid,
        timestamp: Date.now()
      }));

      if (quizTotalPoints > 0) {
        try {
          const pointsResponse = await addPointsToUser(userId, quizTotalPoints);
          
          try {
            await markPointsAwarded(userId, bookid);
          } catch (markPointsError) {
            console.error("Warning: Could not mark points as awarded:", markPointsError);
          }
          
          localStorage.removeItem(`quiz_responses_${userId}`);
          
          alert(`Quiz completed! You've earned ${quizTotalPoints} points.`);
        } catch (pointsError) {
          console.error("Error adding points:", pointsError);
          console.error("Error details:", pointsError.response?.data || pointsError.message);
          
          if (pointsError.response?.status === 404) {
            alert(`Error: Your user points record was not found. Please contact an administrator to initialize your account.`);
          } else {
            alert(`Error adding points: ${pointsError.response?.data?.error || pointsError.message || 'Unknown error'}`);
          }
        }
      } else {
        localStorage.removeItem(`quiz_responses_${userId}`);
        alert("Book completed! No points earned. Please answer quiz questions correctly to earn points.");
      }

    } catch (error) {
      console.error("Unexpected error in submitResponses:", error);
      alert(`Unexpected error: ${error.message || error}`);
    }
  };

  const handleNextPage = () => {
    const currentPage = pageNumer + 1;
    setDirection("right");
    setPageNumer(currentPage);
    loadPage(contentBook, currentPage);
  };
  const ExitReading = async () => {
    try {
      await submitResponses();

      if (user.roles[0].role === "profesor") {
        navigate("/dashboard/library");
      } else {
        // Obtener badges del libro específico
        const bookBadges = await awardBadges(bookid);
        
        // Obtener badges automáticos del localStorage
        const automaticBadgesStr = localStorage.getItem('automatic_badges');
        const automaticBadges = automaticBadgesStr ? JSON.parse(automaticBadgesStr) : [];
        
        // Combinar ambos tipos de badges
        const allBadges = [...(Array.isArray(bookBadges) ? bookBadges : [])];
        
        // Agregar badges automáticos formateados para el popup
        if (automaticBadges.length > 0) {
          console.log("🎯 Combining automatic badges with book badges");
          automaticBadges.forEach(badge => {
            allBadges.push({
              id: badge.id,
              name: badge.title,  // PopUp usa 'name'
              title: badge.title,
              description: badge.description,
              points: badge.points,
              icon: badge.icon || null,
              rare: false  // Badges automáticos como normales
            });
          });
          
          // Limpiar localStorage después de usar los badges
          localStorage.removeItem('automatic_badges');
        }
        
        console.log("🏆 All badges to display (book + automatic):", allBadges);
        
        // Asegurar que awardedBadges siempre sea un array
        setAwardedBadges(allBadges);

        if (allBadges.length === 0) {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Error during ExitReading:", error);
    }
  };

  const awardBadges = async (book_id) => {
    try {
      const badges = await getBadgesPerBook(book_id);

      if (badges?.length === 0) {
        console.log("No badges to award for this book.");
        return null;
      }

      const awarded = [];
      for (const badge of badges) {
        const response = await award_badge_to_user(badge.id);
        if (response?.created) {
          awarded.push(badge);
        }
      }

      const validBadges = awarded.filter(Boolean);
      console.log("Awarded badges:", validBadges);
      if (validBadges.length === 0) {
        return null;
      } else {
        return validBadges;
      }
    } catch (error) {
      console.error("Error awarding badges:", error);
      return [];
    }
  };

  const ForceExitReading = async () => {
    try {
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during ExitReading:", error);
    }
  };

  const [awardedBadges, setAwardedBadges] = useState([]); 
  const [currentBadge, setCurrentBadge] = useState(null); 
  const [direction, setDirection] = useState("right");

  useEffect(() => {
    if (!awardedBadges || !Array.isArray(awardedBadges) || !awardedBadges.length) return;

    let index = 0;
    setCurrentBadge(awardedBadges[index]);

    if (awardedBadges.length === 1) {
      const timeout = setTimeout(() => {
        navigate("/dashboard");
      }, 8500);
      return () => clearTimeout(timeout);
    }

    const interval = setInterval(() => {
      index++;
      if (index < awardedBadges.length) {
        setCurrentBadge(awardedBadges[index]);
      } else {
        clearInterval(interval);
        navigate("/dashboard");
      }
    }, 8500);

    return () => clearInterval(interval);
  }, [awardedBadges]);

  return (
    <FullScreen handle={handle}>
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100 flex flex-col relative overflow-hidden">
        <button
          onClick={ForceExitReading}
          className="fixed top-4 left-4 z-50 bg-red-500 hover:bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
          aria-label="Cerrar libro"
        >
          <FontAwesomeIcon icon={faTimes} className="text-xl" />
        </button>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/20 rounded-full blur-xl animate-bounce"
            style={{ animationDelay: "0s", animationDuration: "3s" }}
          />
          <div
            className="absolute top-40 right-20 w-32 h-32 bg-pink-300/20 rounded-full blur-xl animate-bounce"
            style={{ animationDelay: "1s", animationDuration: "4s" }}
          />
          <div
            className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-300/20 rounded-full blur-xl animate-bounce"
            style={{ animationDelay: "2s", animationDuration: "3.5s" }}
          />
          <div
            className="absolute top-1/3 right-1/3 w-16 h-16 bg-purple-300/20 rounded-full blur-xl animate-bounce"
            style={{ animationDelay: "0.5s", animationDuration: "4.5s" }}
          />
        </div>

        <header className="relative z-10 px-4 py-3 flex justify-end">
          {quizTotalPoints > 0 && (
            <div className="flex items-center gap-2 bg-yellow-400 rounded-full px-4 md:px-6 py-2 shadow-lg border-4 border-yellow-300">
              <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-700 fill-yellow-700" />
              <span className="text-base md:text-xl font-black text-yellow-900">{quizTotalPoints}</span>
            </div>
          )}
        </header>

        {error ? (
          <div>
            <ErrorPage />
          </div>
        ) : (
          <>
            <main className="flex-1 flex items-center justify-center px-2 md:px-4 py-4 relative z-10">
              <div className="relative w-full h-full max-w-[95vw] max-h-[85vh]" style={{ aspectRatio: '1400/690' }}>
                <div className="absolute inset-0 bg-gradient-to-b from-purple-400 to-pink-400 rounded-[2rem] md:rounded-[3rem] blur-2xl opacity-40 transform translate-y-6" />

                <div className="relative bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden border-8 border-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 w-full h-full">
                  <div className="absolute left-0 top-0 bottom-0 w-3 md:w-6 bg-gradient-to-b from-yellow-400 via-pink-400 to-purple-400 shadow-inner" />
                  <div className="absolute right-0 top-0 bottom-0 w-3 md:w-6 bg-gradient-to-b from-purple-400 via-pink-400 to-yellow-400 shadow-inner" />
                  <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
                    }}
                  />

                  <div className="relative bg-gradient-to-br from-amber-50 via-white to-rose-50 flex items-center justify-center" style={{ width: '100%', height: '100%', padding: '0' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div
                        key={pageNumer}
                        className={`${direction === "right" ? "animate-slide-in-right" : "animate-slide-in-left"}`}
                        style={{ width: '100%', height: '100%' }}
                      >
                        <PageSelector
                          key={`page-${pageNumer}`}
                          pageType={contentBook?.[pageNumer]?.page?.type || 1}
                          gridDirection={gridDirection}
                          gridNumRows={gridNumRows}
                          pageNumer={pageNumer}
                          widgets={widgets}
                          pageData={contentBook?.[pageNumer]?.page?.data}
                          onQuizResponse={(questionId, answer, isCorrect, points) =>
                            handleQuizResponse(pageNumer, questionId, answer, isCorrect, points)
                          }
                          savedResponsesForPage={quizResponses[pageNumer] || {}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>

            <nav className="relative z-10 bg-gradient-to-r from-yellow-400/30 via-pink-400/30 to-purple-400/30 backdrop-blur-md px-4 py-1 md:py-1.5 border-t-4 border-white/50 rounded-t-3xl">
              <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 md:gap-6">
                <button
                  onClick={handlePreviousPage}
                  disabled={pageNumer === 0}
                  className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-full px-5 md:px-8 py-2 md:py-2.5 text-lg md:text-xl font-black shadow-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95 border-4 border-white/70 flex items-center"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 mr-1 md:mr-2" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-2 md:gap-3 bg-white rounded-full px-4 md:px-6 py-1.5 md:py-2 shadow-lg border-4 border-purple-300">
                  <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
                  <span className="text-base md:text-xl font-black text-gray-800">
                    {pageNumer + 1} / {pagesCount}
                  </span>
                </div>

                {pageNumer === pagesCount - 1 ? (
                  <button
                    onClick={ExitReading}
                    className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white rounded-full px-5 md:px-8 py-2 md:py-2.5 text-lg md:text-xl font-black shadow-xl transition-all hover:scale-110 active:scale-95 border-4 border-white/70 flex items-center"
                  >
                    <span>Finish</span>
                    <Star className="w-6 h-6 md:w-8 md:h-8 ml-1 md:ml-2 fill-white" />
                  </button>
                ) : (
                  <button
                    onClick={handleNextPage}
                    disabled={pageNumer === pagesCount - 1}
                    className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white rounded-full px-5 md:px-8 py-2 md:py-2.5 text-lg md:text-xl font-black shadow-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95 border-4 border-white/70 flex items-center"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-7 h-7 md:w-10 md:h-10 ml-1 md:ml-2" />
                  </button>
                )}
              </div>
            </nav>
          </>
        )}

        {currentBadge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <PopUpAchieve Badge={currentBadge} />
          </div>
        )}
      </div>
    </FullScreen>
  );
}

export default ReadingView;
