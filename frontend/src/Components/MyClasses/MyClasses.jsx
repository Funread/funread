import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./MyClasses.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCalendarAlt,
  faUser,
  faArrowLeft,
  faStar,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { listedStudentGroups } from "../../api";
import { listedBooksPerClassesById } from "../../api/booksPerClasses";
import { bookSearchById } from "../../api/books";
import { listedClassesId } from "../../api/classes";
import { userListById } from "../../api/users"; // Import the function to get user details by ID
import imgLogo from "../../logoFunread.png"; // Import logo image
import { getMediaUrl } from "../Utils/mediaUrl"; // Import the function to get media URL
import { getUserPoints } from "../../api/userPoints"; // Import the function to get user points
import { getCurrentRank } from "../../api/userPoints"; // Import the function to get current rank
import { getBooksCompleted } from "../../api/userBookProgress"; // Import the function to get completed books count

import Star from './StarProgress.jsx';

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



      <div className="dashboard-content " style={{ padding: "0px" }}>
        {/* Main content area */}
        {/* Sidebar with statistics */}
        <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-3">
          <div className="max-w-8xl  px-4" >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl p-4 border-2 border-white shadow-md transform hover:scale-[1.02] transition-transform duration-300 min-h-[140px] flex items-center justify-center">
                <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 border-4 border-white shadow-sm">
                  <FontAwesomeIcon icon={faStar} className="h-3 w-6 text-yellow-600" />
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded-full p-2 mb-2 shadow-md">
                    <FontAwesomeIcon icon={faUser} className="h-6 w-6 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-black text-white mb-1 drop-shadow-md">{`Level ${userStats.level}`}</h2>
                  <div className="flex gap-1 mb-1">
                    <Star value={userStats.points} max={userStats.level * 500} size={16} />
                  </div>
                  <div className="bg-white/25 backdrop-blur-sm rounded-full px-3 py-1 border border-white/30">
                    <p className="text-[10px] text-white font-bold drop-shadow">{`${userStats.points} / ${userStats.level * 500} pts`}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 relative bg-gradient-to-br from-emerald-400 to-teal-400 rounded-xl p-4 border-2 border-white shadow-md transform hover:scale-[1.02] transition-transform duration-300 min-h-[140px] flex items-center justify-center">
                <div className="absolute -top-2 -right-2 bg-orange-400 rounded-full p-2 border-4 border-white shadow-sm">
                  <FontAwesomeIcon icon={faBookOpen} className="h-3 w-6 text-orange-700" />
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded-full p-2 mb-2 shadow-md">
                    <FontAwesomeIcon icon={faBookOpen} className="h-6 w-6 text-emerald-500" />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-1 drop-shadow-md">{userStats.completedQuizzes}</h2>
                  <p className="text-base text-white font-bold drop-shadow">Books Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className="main-content bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">

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


                    // revisar que actualice el progreso correctamente  
                    // 
                    classes.map((classItem) => (     
                      <div
                        key={classItem.id}
                        onClick={() => handleClassSelect(classItem)}
                        className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-purple-200 hover:border-purple-400 transform hover:scale-[1.02] cursor-pointer"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl p-3 shadow-md">
                            <FontAwesomeIcon icon={faBookOpen} className="h-6 w-6 text-white" />
                          </div>

                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{classItem.name}</h3>

                            <div className="flex items-center gap-2 mb-2">
                              <div className="bg-blue-100 rounded-full p-1.5">
                                <FontAwesomeIcon icon={faUser} className="h-3 w-3 text-blue-600" />
                              </div>
                              <p className="text-sm font-semibold text-gray-600">{classItem.teacher}</p>
                            </div>

                            <div className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2 mb-3">
                              <FontAwesomeIcon icon={faCalendarAlt} className="h-3.5 w-3.5 text-green-600" />
                              <p className="text-xs font-bold text-green-700"> {classItem.nextClass}</p>
                            </div>

                            {/* Barra de progreso */}
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-gray-600">Progress</span>
                                <span className="font-bold text-purple-600">{classItem.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-purple-400 to-pink-400 h-full rounded-full transition-all duration-500"
                                  style={{ width: `${classItem.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
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

            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyClasses;