import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './MyClasses.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faTrophy, faChartLine, faCalendarAlt, faBell, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { listedStudentGroups } from '../../api';
import BadgesPage from '../Badges/BadgesPage'
import imgLogo from '../../logoFunread.png'; // Importar la imagen del logo

const MyClasses = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [classes, setClasses] = useState([]);
  const [userStats, setUserStats] = useState({
    level: 1,
    points: 0,
    ranking: 0,
    completedQuizzes: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('classes');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Get student groups from API
        const studentsGroups = await listedStudentGroups();
        console.log('Groups obtained:', studentsGroups);

        // Filter groups belonging to current user
        const studentGroups = studentsGroups.data.filter(
          (student) => student.userid === user.userId
        );

        // Transform data to match required format
        const formattedClasses = studentGroups.map(group => ({
          id: group.groupscreateid,
          name: group.groupname || 'Class 1',
          progress: group.progress || Math.floor(Math.random() * 100), // Random progress if none exists
          teacher: group.teachername || 'Unassigned Teacher',
          nextClass: group.nextClass || 'No scheduled classes',
          image: group.image || '/Media/media/default-class.jpg',
          bookId: group.bookid || 3 // Book ID for ReadingView navigation
        }));

        setClasses(formattedClasses);

        // Get user statistics (could come from another API)
        // Using example data for now
        setUserStats({
          level: user.level || 5,
          points: user.points || 1250,
          ranking: 8,
          completedQuizzes: 24
        });
      } catch (error) {
        console.error('Error loading classes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user.userId]);

  // Function to navigate to reading view when clicking a class
  const handleClassClick = (classItem) => {
    navigate(`/readingview/${classItem.bookId}`);
  };

  return (
    <div className="student-dashboard">
      {/* Main content */}
      <div className="dashboard-content">
        {/* Main content area */}
        {/* Sidebar with statistics */}

        <aside className="dashboard-sidebar">
          <div className="user-stats">

            <div className="stat-card header">

              <header className="dashboard-header">
                <div className="logo">
                  <img src={imgLogo} alt="Logo" className="logo-image" />
                </div>
                {/*<div className="search-bar">
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" placeholder="Search classes, books..." />
        </div>
         <div className="user-profile" onClick={() => navigate('/profile')}>
          <div className="user-avatar">
            <img src={user.profilePicture || '/Media/media/1.jpg'} alt="Profile" />
          </div>
          <div className="user-info">
            <span className="user-name">{user.username}</span>
            <span className="user-level">Level {userStats.level}</span>
          </div>
        </div>*/}
              </header>

            </div>

            <div className="stat-card">

              <div className="stat-icon level">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="stat-info">
                <h3>Level</h3>
                <p>{userStats.level}</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${(userStats.points % 500) / 5}%` }}></div>
                </div>
                <span className="progress-text">{userStats.points} / 500 points to next level</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon ranking">
                <FontAwesomeIcon icon={faTrophy} />
              </div>
              <div className="stat-info">
                <h3>Ranking</h3>
                <p>#{userStats.ranking} in your class</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon quizzes">
                <FontAwesomeIcon icon={faChartLine} />
              </div>
              <div className="stat-info">
                <h3>Quizzes</h3>
                <p>{userStats.completedQuizzes} completed</p>
              </div>
            </div>
          </div>

          {/* <div className="upcoming-events">
            <h3><FontAwesomeIcon icon={faCalendarAlt} /> Upcoming Events</h3>
            <ul>
              <li>
                <span className="event-date">Today, 3:00 PM</span>
                <span className="event-title">Literature Quiz</span>
              </li>1
              <li>
                <span className="event-date">Tomorrow, 10:00 AM</span>
                <span className="event-title">Math Class</span>
              </li>
              <li>
                <span className="event-date">Friday, 2:30 PM</span>
                <span className="event-title">Project Submission</span>
              </li>
            </ul>
          </div> */}
        </aside>

        <main className="main-content">
          <div className="tabs">
            <button 
              className={activeTab === 'classes' ? 'active' : ''}
              onClick={() => setActiveTab('classes')}
            >
              <FontAwesomeIcon icon={faBook} /> My Classes
            </button>
            <button
              className={activeTab === 'achievements' ? 'active' : ''}
              onClick={() => setActiveTab('achievements')}
            >
              <FontAwesomeIcon icon={faTrophy} /> Achievements
            </button>
            <button
              className={activeTab === 'notifications' ? 'active' : ''}
              onClick={() => setActiveTab('notifications')}
            >
              <FontAwesomeIcon icon={faBell} /> Notifications
            </button>
          </div>

          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading your classes...</p>
            </div>
          ) : (
            <div className="tab-content">
              {activeTab === 'classes' && (
                <div className="classes-grid">
                  {classes.length === 0 ? (
                    <div className="no-classes-message">
                      <FontAwesomeIcon icon={faBook} size="3x" />
                      <h3>No assigned classes</h3>
                      <p>When your teacher assigns you to a class, it will appear here.</p>
                    </div>
                  ) : (
                    classes.map((classItem) => (
                      <div
                        key={classItem.id}
                        className="class-card"
                        onClick={() => handleClassClick(classItem)}
                      >
                        <div className="class-image" style={{ backgroundImage: `url(${classItem.image})` }}>
                          <div className="class-progress">
                            <div className="progress-circle">
                              <svg viewBox="0 0 36 36">
                                <path
                                  className="circle-bg"
                                  d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                  className="circle"
                                  strokeDasharray={`${classItem.progress}, 100`}
                                  d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <text x="18" y="20.35" className="percentage">{classItem.progress}%</text>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="class-info">
                          <h3>{classItem.name}</h3>
                          <p className="teacher">{classItem.teacher}</p>
                          <p className="next-class">
                            <FontAwesomeIcon icon={faCalendarAlt} /> {classItem.nextClass}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'achievements' && (
                <BadgesPage />
                
              )}

              {activeTab === 'notifications' && (
                <div className="notifications-container">
                  <h2>Notifications</h2>
                  <div className="notifications-list">
                    <div className="notification-item unread">
                      <div className="notification-icon">
                        <FontAwesomeIcon icon={faBook} />
                      </div>
                      <div className="notification-content">
                        <h3>New book available</h3>
                        <p>Your teacher has added a new book to Literature class</p>
                        <span className="notification-time">2 hours ago</span>
                      </div>
                    </div>
                    <div className="notification-item unread">
                      <div className="notification-icon">
                        <FontAwesomeIcon icon={faTrophy} />
                      </div>
                      <div className="notification-content">
                        <h3>New achievement unlocked!</h3>
                        <p>You've unlocked the "Avid Reader" achievement</p>
                        <span className="notification-time">Yesterday</span>
                      </div>
                    </div>
                    <div className="notification-item">
                      <div className="notification-icon">
                        <FontAwesomeIcon icon={faChartLine} />
                      </div>
                      <div className="notification-content">
                        <h3>Quiz reminder</h3>
                        <p>Don't forget to complete the Literature quiz before Friday</p>
                        <span className="notification-time">2 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyClasses;
