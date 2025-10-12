import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { faBook, faUsersRectangle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import StatCard from '../StatCard/StatCard';
import TapLibrary from '../Shared/TapLibrary/TapLibrary';
import BookBuilderStepper from '../Shared/BookBuilder/BookBuilderStepper';
import BookPreview from '../Shared/BookPreview/BookPreview';
import BookView from '../Shared/BookView/BookView';
import Button from 'react-bootstrap/Button';
import './Library.css';
import 'react-toastify/dist/ReactToastify.css';
import Leaderboard from '../Leaderboard/Leaderboard';

const ProfessorDashboard = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showBookBuilder, setShowBookBuilder] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewBookId, setPreviewBookId] = useState(null);
  const [stats, setStats] = useState({ books: 10, students: 50, groups: 2 });
  const [showLeaderboard, setShowLeaderboard] = useState(false);



  const toggleSidebar = (book) => {
    setSelectedBook(book);
    setShowBookBuilder(false);
  };


  const handleUpdateBooks = (newBook) => {
    setBooks(prevBooks => [...prevBooks, newBook]);
    setStats(prev => ({ ...prev, books: prev.books + 1 }));
  };

  const handlePreview = (bookId) => {
    setPreviewBookId(bookId);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
    setPreviewBookId(null);
  };

  const handleShowLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
  };


  const statistics = [
    { id: 'books', title: 'Books', icon: faBook, value: stats.books },
    { id: 'groups', title: 'Groups', icon: faUsersRectangle, value: stats.groups }
  ];

  return (
    <div className="professor-dashboard">
      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <div className="user-stats">

            {showLeaderboard && (
              <div className="leaderboard-container" onClick={handleShowLeaderboard}>
                <Leaderboard />
              </div>
            )}

            {/* StatCards eliminados para que solo se muestren los botones pequeños en TapLibrary */}
          </div>
        </aside>

        <main className="main-content">

          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading data...</p>
            </div>
          ) : (
            <div className="tab-content">
                <>
                  <TapLibrary toggleSidebar={toggleSidebar} newBooks={books} />
                </>
            </div>
          )}
        </main>
      </div>

      {selectedBook && (
        <>
          <div className="bookview-overlay" onClick={() => setSelectedBook(null)} />
          <div className="bookview-drawer open">
            <Button className="close-button" onClick={() => setSelectedBook(null)}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
            <BookView book={selectedBook} onPreview={handlePreview} />
          </div>
        </>
      )}

      {showBookBuilder && (
        <div className="book-builder-container open">
          <div className="book-builder-content">
            <Button className="close-button" onClick={() => setShowBookBuilder(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
            <BookBuilderStepper toggleSidebar={toggleSidebar} updateBook={handleUpdateBooks} />
          </div>
        </div>
      )}

      {showPreview && (
        <div className="preview-modal">
          <div className="preview-content">
            <Button className="close-preview" onClick={closePreview}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
            <BookPreview bookid={previewBookId} onClose={closePreview} />
          </div>
        </div>
      )}

      <ToastContainer position="top-right" />
    </div>
  );
};

export default ProfessorDashboard;
