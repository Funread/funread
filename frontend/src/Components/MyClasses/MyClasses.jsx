import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "./MyClasses.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faTrophy,
  faChartLine,
  faCalendarAlt,
  faUser,
  faSearch,
  faArrowLeft,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { listedStudentGroups } from "../../api";
import { listedBooksPerClassesById } from "../../api/booksPerClasses";
import { bookSearchById } from "../../api/books";
import { listedClassesId } from "../../api/classes";
import { userListById } from "../../api/users"; // Import the function to get user details by ID
import BadgesPage from "../Badges/BadgesPage";
import imgLogo from "../../logoFunread.png"; // Import logo image
import { getMediaUrl } from "../../mediaUrl"; // Import the function to get media URL
import { getUserPoints } from "../../api/userPoints"; // Import the function to get user points
import { getCurrentRank } from "../../api/userPoints"; // Import the function to get current rank
import { getBooksCompleted } from "../../api/userBookProgress"; // Import the function to get completed books count

// Function to get teacher name from ID
const getTeacherName = async (teacherId) => {
  try {
    const response = await userListById(teacherId);
    console.log(`Teacher details for ID ${teacherId}:`, response);

    if (response && response.data) {
      const teacherData = response.data;
      // Create a formatted name with both first and last name
      return `${teacherData.name} ${teacherData.lastname}`;
    }
    return `Teacher ID: ${teacherId}`;
  } catch (error) {
    console.error(`Error fetching teacher details for ID ${teacherId}:`, error);
    return `Teacher ID: ${teacherId}`;
  }
};

const MyClasses = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [classes, setClasses] = useState([]);
  const [userStats, setUserStats] = useState({
    level: 1,
    points: 0,
    ranking: 0,
    completedQuizzes: 0,
    completedBooks: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("classes");
  const [selectedClass, setSelectedClass] = useState(null);
  const [classBooks, setClassBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Get user points and ranking from API
        try {
          const pointsResponse = await getUserPoints(user.userId);
          console.log("User points response:", pointsResponse);

          // Get current rank position
          const rankResponse = await getCurrentRank(user.userId);
          console.log("User rank response:", rankResponse);

          // Get completed books count
          const booksCompletedResponse = await getBooksCompleted(user.userId);
          console.log("Books completed response:", booksCompletedResponse);

          // Extract the completed books count from the response
          const completedBooksCount =
            booksCompletedResponse?.data?.completed_books || 0;

          if (pointsResponse) {
            // Access total_points from the correct structure in the response
            const userPoints = parseInt(pointsResponse.total_points || 0);
            // Calculate level based on points (1 level for each 500 points)
            const level = Math.max(1, Math.floor(userPoints / 500) + 1);

            // Update user stats with real data
            setUserStats((prev) => ({
              ...prev,
              points: userPoints,
              level: level,
              // Add rank position from rankResponse
              ranking: rankResponse ? rankResponse.position : 0,
              // Points needed for next level
              pointsToNextLevel: level * 500 - userPoints,
              // Update completed quizzes with books completed count
              completedQuizzes: completedBooksCount,
            }));
          }
        } catch (pointsError) {
          console.error(
            "Error fetching user points, rank, or books completed:",
            pointsError
          );
        }

        // Get student groups from API
        const studentsGroups = await listedStudentGroups();
        console.log("Groups obtained:", studentsGroups);

        // Filter groups belonging to current user
        const studentGroups = studentsGroups.data.filter(
          (student) => student.userid === user.userId
        );
        console.log("Current user groups:", studentGroups);

        // Array to store classes with complete data
        const formattedClasses = [];

        // For each group, get the complete class details
        for (const group of studentGroups) {
          try {
            // Get class details using group ID
            const classResponse = await listedClassesId(group.groupscreateid);
            console.log(
              `Class details for group ${group.groupscreateid}:`,
              classResponse
            );

            if (
              classResponse &&
              classResponse.data &&
              classResponse.data.length > 0
            ) {
              const classData = classResponse.data[0]; // Take the first result

              let teacherName = group.teachername || "Unassigned Teacher";

              // If teacher ID is available but no name, fetch the teacher's details
              if (classData.teacherassigned && !group.teachername) {
                teacherName = await getTeacherName(classData.teacherassigned);
              }

              // Create object with class data
              const formattedGroup = {
                id: group.groupscreateid,
                classId: classData.classesid,
                name: classData.name || "Unnamed Class",
                grade: classData.grade,
                progress: group.progress || Math.floor(Math.random() * 100),
                teacherId: classData.teacherassigned,
                // Use the fetched teacher name instead of just the ID
                teacher: teacherName,
                startDate: classData.startdate,
                finishDate: classData.finishdate,
                nextClass: classData.finishdate
                  ? `Ends: ${new Date(
                      classData.finishdate
                    ).toLocaleDateString()}`
                  : "No scheduled classes",
                image: group.image || "/Media/media/default-class.jpg",
                bookId: group.bookid || 3,
                isActive: classData.isactive,
              };

              console.log(
                "Formatted class with complete data:",
                formattedGroup
              );
              formattedClasses.push(formattedGroup);
            } else {
              // If class details couldn't be obtained, use basic data
              console.log("No class data found, using basic group data");
              const formattedGroup = {
                id: group.groupscreateid,
                name: group.groupname || "Unnamed Class",
                progress: group.progress || Math.floor(Math.random() * 100),
                teacher: group.teachername || "Unassigned Teacher",
                nextClass: "No scheduled classes",
                image: group.image || "/Media/media/default-class.jpg",
                bookId: group.bookid || 3,
              };
              formattedClasses.push(formattedGroup);
            }
          } catch (classError) {
            console.error(
              `Error getting class details for group ${group.groupscreateid}:`,
              classError
            );
            // Add the group with limited data
            const formattedGroup = {
              id: group.groupscreateid,
              name: group.groupname || "Unnamed Class",
              progress: group.progress || Math.floor(Math.random() * 100),
              teacher: group.teachername || "Unassigned Teacher",
              nextClass: "No scheduled classes",
              image: group.image || "/Media/media/default-class.jpg",
              bookId: group.bookid || 3,
            };
            formattedClasses.push(formattedGroup);
          }
        }

        console.log("Formatted classes with complete data:", formattedClasses);
        setClasses(formattedClasses);

        // We already have user statistics from the API, no need to overwrite
      } catch (error) {
        console.error("Error loading classes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user.userId]);

  // Function to fetch books for a specific class
  const fetchClassBooks = async (classId) => {
    setLoadingBooks(true);
    try {
      // Get book IDs associated with the class
      const response = await listedBooksPerClassesById(classId);
      console.log("Books associated with class:", response);

      if (response && response.data && response.data.length > 0) {
        // Array to store books with complete details
        const booksWithDetails = [];

        // For each book, get its complete details
        for (const bookItem of response.data) {
          try {
            // Get book ID
            const bookId = bookItem.booksid || bookItem.id;

            if (bookId) {
              // Call API to get book details
              const bookDetailsResponse = await bookSearchById(bookId);
              console.log(`Book details for ${bookId}:`, bookDetailsResponse);

              if (bookDetailsResponse && bookDetailsResponse.data) {
                const bookDetails = bookDetailsResponse.data;

                // Create object with complete book details
                const bookWithDetails = {
                  id: bookId,
                  title: bookDetails.title || "Untitled Book",
                  author: bookDetails.author || "Unknown Author",
                  category: bookDetails.category,
                  description: bookDetails.description || "",
                  // Use portrait path as cover image
                  cover:
                    bookDetails.portrait || "/Media/media/default-book.jpg",
                  progress: bookItem.progress || 0,
                  // Keep other potentially useful data
                  ...bookItem,
                };

                booksWithDetails.push(bookWithDetails);
              } else {
                // If details couldn't be obtained, use basic data
                booksWithDetails.push({
                  ...bookItem,
                  id: bookId,
                  title: "Untitled Book",
                  author: "Unknown Author",
                  cover: "/Media/media/default-book.jpg",
                  progress: 0,
                });
              }
            }
          } catch (detailError) {
            console.error(`Error getting book details:`, detailError);
            // Add book with limited data
            booksWithDetails.push({
              ...bookItem,
              id: bookItem.booksid || bookItem.id,
              title: "Untitled Book",
              author: "Unknown Author",
              cover: "/Media/media/default-book.jpg",
              progress: 0,
            });
          }
        }

        console.log("Books with complete details:", booksWithDetails);
        setClassBooks(booksWithDetails);
      } else {
        setClassBooks([]);
      }
    } catch (error) {
      console.error("Error loading books for class:", error);
      setClassBooks([]);
    } finally {
      setLoadingBooks(false);
    }
  };

  // Function to handle class selection and show books
  const handleClassSelect = async (classItem) => {
    setSelectedClass(classItem);
    await fetchClassBooks(classItem.classId);
  };

  // Function to navigate to reading view for a specific book
  const handleBookClick = (bookId) => {
    navigate(`/readingview/${bookId}`);
  };

  // Function to go back to classes view
  const handleBackToClasses = () => {
    setSelectedClass(null);
    setClassBooks([]);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
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
                <img src={imgLogo} alt="Logo" className="logo-image" />

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
            <div className="stat-card user-info">
              <div className="stat-icon level">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="stat-info">
                <h3>
                  Level <span>{userStats.level}</span>
                </h3>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${(userStats.points % 500) / 5}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {userStats.points} / {userStats.level * 500} points to next
                  level
                </span>
              </div>
            </div>
            <div className="stat-card ranking-info">
              <div className="stat-icon ranking">
                <FontAwesomeIcon icon={faTrophy} />
              </div>
              <div className="stat-info">
                <h3>Ranking</h3>
                <p>#{userStats.ranking} in your class</p>
              </div>
            </div>{" "}
            <div className="stat-card quizzes-info">
              <div className="stat-icon quizzes">
                <FontAwesomeIcon icon={faBook} />
              </div>
              <div className="stat-info">
                <h3>Books</h3>
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
              className={activeTab === "classes" ? "active" : ""}
              onClick={() => setActiveTab("classes")}
            >
              <FontAwesomeIcon icon={faBook} /> My Classes
            </button>
            <button
              className={activeTab === "achievements" ? "active" : ""}
              onClick={() => setActiveTab("achievements")}
            >
              <FontAwesomeIcon icon={faTrophy} /> Achievements
            </button>
            <button
              className="logout-button"
              onClick={handleLogout}
              title="Logout"
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </div>

          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading your classes...</p>
            </div>
          ) : (
            <div className="tab-content">
              {activeTab === "classes" && !selectedClass && (
                <div className="classes-grid">
                  {classes.length === 0 ? (
                    <div className="no-classes-message">
                      <FontAwesomeIcon icon={faBook} size="3x" />
                      <h3>No assigned classes</h3>
                      <p>
                        When your teacher assigns you to a class, it will appear
                        here.
                      </p>
                    </div>
                  ) : (
                    classes.map((classItem) => (
                      <div
                        key={classItem.id}
                        className="class-card"
                        onClick={() => handleClassSelect(classItem)}
                      >
                        <div
                          className="class-image"
                          style={{ backgroundImage: `url(${classItem.image})` }}
                        >
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
                                <text x="18" y="20.35" className="percentage">
                                  {classItem.progress}%
                                </text>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="class-info">
                          <h3>{classItem.name}</h3>
                          <p className="teacher">{classItem.teacher}</p>
                          <p className="next-class">
                            <FontAwesomeIcon icon={faCalendarAlt} />{" "}
                            {classItem.nextClass}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Show books for selected class */}
              {activeTab === "classes" && selectedClass && (
                <div className="class-books-container">
                  <div className="class-books-header">
                    <button
                      onClick={handleBackToClasses}
                      className="back-button"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} /> Back to classes
                    </button>
                    <h2>Books from {selectedClass.name}</h2>
                  </div>

                  {loadingBooks ? (
                    <div className="loading-spinner">
                      <div className="spinner"></div>
                      <p>Loading books...</p>
                    </div>
                  ) : (
                    <div className="books-grid">
                      {classBooks.length === 0 ? (
                        <div className="no-books-message">
                          <FontAwesomeIcon icon={faBook} size="3x" />
                          <h3>No books available</h3>
                          <p>This class doesn't have any assigned books yet.</p>
                        </div>
                      ) : (
                        classBooks.map((book) => (
                          <div
                            key={book.id || book.booksid}
                            className="book-card"
                            onClick={() =>
                              handleBookClick(book.id || book.booksid)
                            }
                          >
                            <div
                              className="book-cover"
                              style={{
                                backgroundImage: `url(${getMediaUrl(
                                  book.cover || "/Media/media/default-book.jpg"
                                )})`,
                              }}
                            ></div>
                            <div className="book-info">
                              <h3>{book.title || "Untitled Book"}</h3>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "achievements" && <BadgesPage />}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyClasses;
