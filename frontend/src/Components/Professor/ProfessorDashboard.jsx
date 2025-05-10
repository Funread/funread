import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUserGraduate, faUsersRectangle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { bookSearch } from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import StatCard from '../StatCard/StatCard';
import TapLibrary from '../Shared/TapLibrary/TapLibrary';
import BookBuilder from '../Shared/BookBuilder/BookBuilder';
import BookPreview from '../Shared/BookPreview/BookPreview';
import BookView from '../Shared/BookView/BookView';
import RecentBook from '../RecentBook/RecentBook';
import imgLogo from '../../logoFunread.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './ProfessorDashboard.css';
import 'react-toastify/dist/ReactToastify.css';
import Groups from '../Group/Group'

const ProfessorDashboard = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('library');
  const [showBookBuilder, setShowBookBuilder] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewBookId, setPreviewBookId] = useState(null);
  const [stats, setStats] = useState({ books: 10, students: 50, groups: 2 });

  const handleBookSearch = async (event) => {
    event.preventDefault();
    if (!title.trim()) {
      toast.warning('Por favor ingresa un título para buscar');
      return;
    }

    setIsLoading(true);
    try {
      const response = await bookSearch(title);
      if (response?.data) {
        toggleSidebar(response.data);
        setTitle('');
        toast.success('Libro encontrado correctamente');
      } else {
        toast.error('No se encontraron libros con ese título');
      }
    } catch (error) {
      toast.error('Error al buscar el libro');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSidebar = (book) => {
    setSelectedBook(book);
    setShowBookBuilder(false);
  };

  const toggleBookBuilder = () => {
    setSelectedBook(null);
    setShowBookBuilder(true);
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

  const tabs = [
    { id: 'library', label: 'Library', icon: faBook },
    { id: 'groups', label: 'Groups', icon: faUsersRectangle }
  ];

  const statistics = [
    { id: 'books', title: 'Books', icon: faBook, value: stats.books },
    { id: 'students', title: 'Students', icon: faUserGraduate, value: stats.students },
    { id: 'groups', title: 'Groups', icon: faUsersRectangle, value: stats.groups }
  ];

  return (
    <div className="professor-dashboard">
      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <div className="user-stats">
            <StatCard className="header">
              <header className="dashboard-header">
                <img src={imgLogo} alt="Funread Logo" className="logo-image" />
              </header>
            </StatCard>

            {statistics.map(stat => (
              <StatCard
                key={stat.id}
                title={stat.title}
                className={`${stat.id}-info`}
                iconClassName={stat.id}
                icon={<FontAwesomeIcon icon={stat.icon} />}
              >
                <p>{stat.value}</p>
              </StatCard>
            ))}
          </div>
        </aside>

        <main className="main-content">
          <div className="tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={activeTab === tab.id ? 'active' : ''}
                onClick={() => setActiveTab(tab.id)}
              >
                <FontAwesomeIcon icon={tab.icon} /> {tab.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading data...</p>
            </div>
          ) : (
            <div className="tab-content">
              {activeTab === 'library' && (
                <>
                  <TapLibrary toggleSidebar={toggleSidebar} newBooks={books} />
                </>
              )}

              {activeTab === 'groups' && (
                <div className="groups-content">
                  <Groups/>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {selectedBook && (
        <div className="book-view-container open">
          <div className="book-view-content">
            <Button className="close-button" onClick={() => setSelectedBook(null)}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
            <BookView book={selectedBook} onPreview={handlePreview} />
          </div>
        </div>
      )}

      {showBookBuilder && (
        <div className="book-builder-container open">
          <div className="book-builder-content">
            <Button className="close-button" onClick={() => setShowBookBuilder(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
            <BookBuilder toggleSidebar={toggleSidebar} updateBook={handleUpdateBooks} />
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
