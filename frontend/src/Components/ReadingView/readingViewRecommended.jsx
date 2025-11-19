// Este es un archivo temporal para ver el código completo actualizado
import React, { useEffect, useState, useCallback } from "react";
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
import Loader from "../Shared/Loader/Loader";
import { getMediaUrl } from "../../mediaUrl";
import { addPointsToUser } from "../../api/userPoints";
import { markBookAsCompleted, markPointsAwarded } from "../../api/userBookProgress";
import { store } from "../../redux/store";

function ReadingView() {
  const navigate = useNavigate();
  const handle = useFullScreenHandle();
  const user = useSelector((state) => state.user);

  // Pages Info
  const [pagesCount, setPagesCount] = useState(0);
  const [gridDirection, setGridDirection] = useState(null);
  const [gridNumRows, setGridNumRows] = useState(null);
  const [pageNumer, setPageNumer] = useState(0);
  const [widgets, setWidgets] = useState(null);

  // State for managing accumulated quiz points
  const [quizTotalPoints, setQuizTotalPoints] = useState(0);
  const [quizResponses, setQuizResponses] = useState({});

  // Book Info
  const location = useLocation();
  const bookid = useParams().id;
  const [contentBook, setContentBook] = useState();

  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [totalImagesToLoad, setTotalImagesToLoad] = useState(0);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  const [error, setError] = useState(null);

  const [currentPageIndex, setCurrentPageIndex] = useState(0); // State for current page
  const state = store.getState(); // Get the Redux state
  const userId = state.user.userId; // Get the user ID from Redux state

  // Load saved responses from localStorage on startup
  useEffect(() => {
    const storedQuizResponses = localStorage.getItem(
      `quiz_responses_${userId}`
    );
    if (storedQuizResponses) {
      try {
        const parsedResponses = JSON.parse(storedQuizResponses);
        setQuizResponses(parsedResponses.responses || {});
        setQuizTotalPoints(parsedResponses.totalPoints || 0);
      } catch (e) {
        console.error("Error loading saved responses:", e);
      }
    }
  }, [user, userId]);

  // Function to send points to the user and mark the book as completed
  const submitResponses = useCallback(async () => {
    try {
      if (!userId) {
        console.error("Could not get user ID");
        return;
      }


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
        return;
      }

      // Add points if there are quiz responses and not already awarded
      if (!alreadyAwarded) {

        localStorage.setItem('book_completed_trigger', JSON.stringify({
          userId: userId,
          bookId: bookid,
          timestamp: Date.now()
        }));

        if (quizTotalPoints > 0) {
          try {
            await addPointsToUser(userId, quizTotalPoints);
            
            try {
              await markPointsAwarded(userId, bookid);
            } catch (markPointsError) {
              console.error("Warning: Could not mark points as awarded:", markPointsError);
            }
            
            localStorage.removeItem(`quiz_responses_${userId}`);
            
            alert(`Quiz completed! You've earned ${quizTotalPoints} points.`);
          } catch (pointsError) {
            console.error("Error adding points:", pointsError);
            alert(`Error adding points: ${pointsError.message || 'Unknown error'}`);
          }
        } else {
          localStorage.removeItem(`quiz_responses_${userId}`);
          alert("Book completed! No points earned. Please answer quiz questions correctly to earn points.");
        }
      }

    } catch (error) {
      console.error("Error in submitResponses:", error);
    }
  }, [userId, quizResponses, quizTotalPoints, bookid]);

  // Badge awarding function
  const awardBadges = useCallback(async (book_id) => {
    try {
      const badges = await getBadgesPerBook(book_id);

      if (badges?.length === 0) {
        return null;
      }

      const awarded = [];
      for (const badge of badges) {
        const response = await award_badge_to_user(badge.id);
        if (response?.created) {
          awarded.push(badge);
        }
      }

      // Filtrar nulls después de resolver las promesas
      const validBadges = awarded.filter(Boolean);
      if (validBadges.length === 0) {
        return null;
      } else {
        return validBadges;
      }
    } catch (error) {
      console.error("Error awarding badges:", error);
      return [];
    }
  }, []);

  // Función para salir de la lectura
  const ExitReading = useCallback(async () => {
    try {
      // Primero enviar las respuestas del quiz y marcar el libro como completado
      await submitResponses();

      if (user.roles[0].role === "profesor") {
        navigate("/library");
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
        
        setAwardedBadges(allBadges.length > 0 ? allBadges : null);

        if (allBadges.length === 0) {
          navigate("/myclasses");
        }
      }
    } catch (error) {
      console.error("Error during ExitReading:", error);
    }
  }, [bookid, user.roles, submitResponses, awardBadges, navigate]);

  const loadPage = useCallback(
    (currentContent, pageNumber) => {

      let currentPageContent = currentContent[pageNumber];
      setContentBook(currentContent);
      setGridDirection(currentPageContent.page.gridDirection);
      setGridNumRows(currentPageContent.page.gridNumRows);
      setPagesCount(currentContent.length);
      setWidgets(currentPageContent.widgetitems);
      setIsLoading(false);
    },
    [pageNumer, contentBook]
  );

  useEffect(() => {
    getBookContent();
  }, []);

  const getBookContent = useCallback(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        await fullBook(bookid).then((data) => {
          let currentContent = data.data.book_content;

          setContentBook(currentContent);
          loadPage(currentContent, pageNumer);
        });
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [bookid, pageNumer, loadPage, contentBook]);

  useEffect(() => {
    if (contentBook) {
      preloadAllImages();
    }
  }, [contentBook]);

  // Manejador para las respuestas del quiz
  const handleQuizResponse = useCallback(
    (questionId, answer, isCorrect, pointsAwarded) => {

      // Asegurarnos que pointsAwarded sea un número
      const points = Number(pointsAwarded) || 0;

      // Comprobar si ya se ha respondido esta pregunta anteriormente
      const previousResponse = quizResponses[questionId];
      let pointsDelta = 0;

      // Calcular el cambio de puntos
      if (isCorrect) {
        // Si la respuesta es correcta, sumar los puntos
        pointsDelta = points;
        console.log(`Correct answer: Adding ${pointsDelta} points`);
      } else if (previousResponse && previousResponse.isCorrect) {
        // Si la respuesta ahora es incorrecta pero antes era correcta, restar los puntos
        pointsDelta = -Number(previousResponse.pointsAwarded || 0);
        console.log(
          `Changed from correct to incorrect: Subtracting ${-pointsDelta} points`
        );
      }

      // Actualizar las respuestas
      const newResponses = {
        ...quizResponses,
        [questionId]: {
          answerId: answer, // Almacenar como answerId para compatibilidad
          isCorrect,
          pointsAwarded: points,
        },
      };

      // Para depuración, mostrar todas las respuestas actuales y sus puntos
      Object.entries(newResponses).forEach(([id, resp]) => {
        if (resp.isCorrect) {
        }
      });

      setQuizResponses(newResponses);

      // Calcular el total de puntos de todas las respuestas correctas
      let totalCorrectPoints = 0;
      Object.values(newResponses).forEach((resp) => {
        if (resp.isCorrect) {
          totalCorrectPoints += Number(resp.pointsAwarded || 0);
        }
      });

      // Actualizar el total de puntos directamente con el valor calculado
      setQuizTotalPoints(totalCorrectPoints);

      // Guardar las respuestas en localStorage para que persistan entre páginas
      try {
        localStorage.setItem(
          `quiz_responses_${userId}`,
          JSON.stringify({
            responses: newResponses,
            totalPoints: totalCorrectPoints,
          })
        );
      } catch (e) {
        console.error("Error saving responses to localStorage:", e);
      }
    },
    [quizResponses, userId]
  );

  // Función para precargar todas las imágenes del libro
  const preloadAllImages = useCallback(() => {
    if (!contentBook || contentBook.length === 0) return;

    setImagesLoaded(false);

    // Recopilar todas las widgets con imágenes de todas las páginas
    const imageWidgets = [];
    contentBook.forEach((pageContent) => {
      if (pageContent.widgetitems) {
        const pageWidgets = pageContent.widgetitems.filter(
          (widget) =>
            widget.type === "2" || // Tipo imagen
            (widget.value && widget.value.src) // Cualquier widget con una propiedad src en value
        );
        imageWidgets.push(...pageWidgets);
      }
    });

    if (imageWidgets.length === 0) {
      // No hay imágenes para cargar
      setImagesLoaded(true);
      return;
    }

    setTotalImagesToLoad(imageWidgets.length);
    setLoadedImagesCount(0);

    // Cargar cada imagen
    imageWidgets.forEach((widget) => {
      const imgSrc =
        widget.value && widget.value.src ? getMediaUrl(widget.value.src) : null;
      if (!imgSrc) {
        // Si no tiene URL de imagen, incrementamos el contador
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
  }, [contentBook]);

  // Efecto para verificar cuando todas las imágenes estén cargadas
  useEffect(() => {
    if (totalImagesToLoad > 0 && loadedImagesCount >= totalImagesToLoad) {
      setImagesLoaded(true);
    }
  }, [loadedImagesCount, totalImagesToLoad]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      let currentPage = pageNumer; // Use current pageNumer to calculate the new page

      if (event.key === "ArrowRight") {
        if (pageNumer < pagesCount - 1) {
          currentPage = pageNumer + 1;
        }
        if (pageNumer === pagesCount - 1) {
          // Exit the reading view, which will submit responses and mark the book as completed
          ExitReading();
        }
      } else if (event.key === "ArrowLeft") {
        if (pageNumer > 0) {
          currentPage = pageNumer - 1;
        }
      }

      setPageNumer(currentPage);
      loadPage(contentBook, currentPage);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    contentBook,
    pageNumer,
    pagesCount,
    quizResponses,
    ExitReading,
    loadPage,
  ]);

  const exitPresentation = useCallback(() => {
    handle.exit(); // Exit fullscreen mode
  }, [handle]);

  const handlePreviousPage = useCallback(() => {
    if (pageNumer > 0) {
      const currentPage = pageNumer - 1;
      setPageNumer(currentPage);
      loadPage(contentBook, currentPage);
    }
  }, [pageNumer, contentBook, loadPage]);

  const handleNextPage = useCallback(() => {
    const currentPage = pageNumer + 1;
    setPageNumer(currentPage);
    loadPage(contentBook, currentPage);
  }, [pageNumer, contentBook, loadPage]);

  const [awardedBadges, setAwardedBadges] = useState([]); // Badges logrados por el usuario
  const [currentBadge, setCurrentBadge] = useState(null); // Badge actual a mostrar

  // Mostrar badges uno por uno
  useEffect(() => {
    if (!awardedBadges.length) return;

    let index = 0;
    setCurrentBadge(awardedBadges[index]);

    if (awardedBadges.length === 1) {
      const timeout = setTimeout(() => {
        navigate("/myclasses");
      }, 4500);
      return () => clearTimeout(timeout);
    }

    const interval = setInterval(() => {
      index++;
      if (index < awardedBadges.length) {
        setCurrentBadge(awardedBadges[index]);
      } else {
        clearInterval(interval);
        navigate("/myclasses");
      }
    }, 8500);

    return () => clearInterval(interval);
  }, [awardedBadges, navigate]);

  // Determina si debemos mostrar la pantalla de carga
  const showLoader = isLoading || !imagesLoaded;
  const loadingMessage = isLoading
    ? "Cargando libro..."
    : "Preparando imágenes...";

  return (
    <FullScreen handle={handle}>
      <div className="presentation-container">
        {/* Componente Loader para mostrar durante la carga */}
        <Loader loading={showLoader} text={loadingMessage} />

        {/* Floating points indicator - always visible */}
        {quizTotalPoints > 0 && (
          <div className="quiz-points-display">Points: {quizTotalPoints}</div>
        )}

        {error ? (
          <div>
            <ErrorPage />
          </div>
        ) : (
          <div className={`reading-view-layout ${showLoader ? "hidden" : ""}`}>
            <div className="content-wrapper">
              <div className="page-content">
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
            <div className="navigation-footer">
              <button
                onClick={handlePreviousPage}
                disabled={pageNumer === 0}
                className="nav-button"
              >
                ←
              </button>
              <span className="page-number">
                Page {pageNumer + 1} of {pagesCount}
              </span>
              <button
                onClick={handleNextPage}
                disabled={pageNumer === pagesCount - 1}
                className="nav-button"
              >
                →
              </button>

              {pageNumer === pagesCount - 1 && (
                <button onClick={ExitReading} className="exit-button">
                  Exit
                </button>
              )}

              {currentBadge && <PopUpAchieve Badge={currentBadge} />}
            </div>
          </div>
        )}
      </div>
    </FullScreen>
  );
}

export default ReadingView;
