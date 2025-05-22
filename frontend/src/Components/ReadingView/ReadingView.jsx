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
// import Loader from "../Shared/Loader/Loader";
import { getMediaUrl } from "../../Components/Utils/mediaUrl";
import { addPointsToUser } from "../../api/userPoints";
import { store } from "../../redux/store";
import { markBookAsCompleted } from "../../api/userBookProgress";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
  // const [isLoading, setIsLoading] = useState(true);
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
        console.log("Loading saved responses:", parsedResponses);
      } catch (e) {
        console.error("Error loading saved responses:", e);
      }
    }
  }, [user]);

  useEffect(() => {
    getBookContent();
  }, []);

  useEffect(() => {
    if (contentBook) {
      console.log("The contentBook state has been updated:", contentBook);
      preloadAllImages();
    }
  }, [contentBook]);

  // Manejador para las respuestas del quiz
  const handleQuizResponse = (questionId, answer, isCorrect, pointsAwarded) => {
    console.log(
      `QuizResponse: Q${questionId}, Answer: ${answer}, Correct: ${isCorrect}, Points: ${pointsAwarded}`
    );

    // Asegurarnos que pointsAwarded sea un número
    const points = Number(pointsAwarded) || 0;
    console.log("Converted points:", points);

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
    console.log("Current responses with points:");
    Object.entries(newResponses).forEach(([id, resp]) => {
      if (resp.isCorrect) {
        console.log(`- Question ${id}: ${resp.pointsAwarded} points`);
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
    console.log(
      "Total de puntos por respuestas correctas:",
      totalCorrectPoints
    );

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
  };

  // Función para precargar todas las imágenes del libro
  const preloadAllImages = () => {
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
  };

  // Efecto para verificar cuando todas las imágenes estén cargadas
  useEffect(() => {
    if (totalImagesToLoad > 0 && loadedImagesCount >= totalImagesToLoad) {
      console.log("All images loaded:", loadedImagesCount);
      setImagesLoaded(true);
    }
  }, [loadedImagesCount, totalImagesToLoad]);

  const getBookContent = () => {
    async function fetchData() {
      // setIsLoading(true);
      setError(null);

      try {
        const fullBookResponse = await fullBook(bookid).then((data) => {
          let currentContent = data.data.book_content;
          console.log("asd asd currentContent");
          console.log(currentContent);

          setContentBook(currentContent);
          loadPage(currentContent, pageNumer);
          console.log("BcurrentContent");
          console.log(contentBook);
        });
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
        // setIsLoading(false);
      }
    }

    fetchData();
  };

  useEffect(() => {
    console.log("using current pageNumer " + contentBook);
    const handleKeyDown = (event) => {
      let currentPage = pageNumer; // Use current pageNumer to calculate the new page

      if (event.key === "ArrowRight") {
        console.log("ArrowRight");
        if (pageNumer < pagesCount - 1) {
          currentPage = pageNumer + 1;
        }
        if (pageNumer === pagesCount - 1) {
          // Submit responses before exiting
          submitResponses();

          user.roles.forEach((userRole) => {
            if (userRole.role === "profesor") {
              navigate("/library");
            } else if (userRole.role === "estudiante") {
              navigate("/myclasses");
            }
          });
        }
      } else if (event.key === "ArrowLeft") {
        console.log("ArrowLeft");
        if (pageNumer > 0) {
          currentPage = pageNumer - 1;
        }
      }

      setPageNumer(currentPage);
      console.log("using current pageNumer " + pageNumer);
      loadPage(contentBook, currentPage);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [contentBook, pageNumer, pagesCount, quizResponses]);

  const loadPage = (currentContent, pageNumber) => {
    console.log("pageNumer");
    console.log(pageNumer);
    console.log("--contentBook---");
    console.log(contentBook);
    console.log("-----");
    console.log("-----");

    let currentPageContent = currentContent[pageNumber];
    setContentBook(currentContent);
    setGridDirection(currentPageContent.page.gridDirection);
    setGridNumRows(currentPageContent.page.gridNumRows);
    setPagesCount(currentContent.length);
    setWidgets(currentPageContent.widgetitems);
    // setIsLoading(false);
  };

  const exitPresentation = () => {
    handle.exit(); // Exit fullscreen mode
  };

  const handlePreviousPage = () => {
    if (pageNumer > 0) {
      const currentPage = pageNumer - 1;
      setPageNumer(currentPage);
      loadPage(contentBook, currentPage);
    }
  };
  // Function to send points to the user without submitting quiz responses
  const submitResponses = async () => {
    try {
      // Marcar el libro como completado con calificación 100
      try {
        await markBookAsCompleted(userId, bookid);
        console.log("Book marked as completed successfully");
      } catch (markError) {
        console.error("Error marking book as completed:", markError);
      }

      if (Object.keys(quizResponses).length === 0) {
        console.log("No responses to send");
        return;
      }

      console.log("Sending points to user:", quizTotalPoints);
      if (!userId) {
        console.error("Could not get user ID");
        return;
      }

      // Only add the earned points to user using addPointsToUser
      if (quizTotalPoints > 0) {
        await addPointsToUser(userId, quizTotalPoints);
      }

      // Clear localStorage after sending
      localStorage.removeItem(`quiz_responses_${userId}`);

      console.log("Points added to user successfully");
      alert(`Quiz completed! You've earned ${quizTotalPoints} points.`);
    } catch (error) {
      console.error("Error adding points:", error);
    }
  };

  const handleNextPage = () => {
    const currentPage = pageNumer + 1;
    setPageNumer(currentPage);
    loadPage(contentBook, currentPage);
  };
  // Función para salir de la lectura
  const ExitReading = async () => {
    try {
      // Primero enviar las respuestas y marcar como completado
      await submitResponses();

      if (user.roles[0].role === "profesor") {
        navigate("/library");
      } else {
        const allBadges = await awardBadges(bookid);
        setAwardedBadges(allBadges);

        if (allBadges === null) {
          navigate("/myclasses");
        }
      }
    } catch (error) {
      console.error("Error during ExitReading:", error);
    }
  };

  // Otorgar badges al usuario

  // Badge awarding function
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

      // Filtrar nulls después de resolver las promesas
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
      if (user.roles[0].role === "profesor") {
        navigate("/library")
      } else {
        navigate("/myclasses");
      }
    }
    catch (error) {
      console.error('Error during ExitReading:', error);
    }
  };

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
      }, 8500);
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
  }, [awardedBadges]);

  // Determina si debemos mostrar la pantalla de carga
  // const showLoader = isLoading || !imagesLoaded;
  // const loadingMessage = isLoading
  //   ? "Cargando libro..."
  //   : "Preparando imágenes...";

  return (
    <FullScreen handle={handle}>
      <div className="presentation-container">
        {/* Componente Loader para mostrar durante la carga */}
        {/* <Loader loading={showLoader} text={loadingMessage} /> */}

        <Button className="close-button" onClick={ForceExitReading}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>

        {quizTotalPoints > 0 && (
          <div className="quiz-points-display">Points: {quizTotalPoints}</div>
        )}

        {error ? (
          <div>
            <ErrorPage />
          </div>
        ) : (
          <div className={`reading-view-layout`}>
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
              </button>{" "}
              {pageNumer === pagesCount - 1 && (
                <button onClick={ExitReading} className="exit-button">
                  Save & Finish
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
