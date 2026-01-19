import React, { useState, useEffect, useRef } from "react";
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
import { userListById } from "../../api/users";
import imgLogo from "../../logoFunread.png";
import { getMediaUrl } from "../Utils/mediaUrl";
import { getUserPoints } from "../../api/userPoints";
import { getCurrentRank } from "../../api/userPoints";
import { getBooksCompleted, calculateClassProgress } from "../../api/userBookProgress";
import MyBookClasses from "./MyBookClasses";
import MyClassesStatCard from "./MyClassesStatCard";

// Helper to validate that a name is meaningful (not empty or placeholders like "unknown")
const isValidName = (name) => {
  if (!name || typeof name !== "string") return false;
  const trimmed = name.trim();
  if (!trimmed) return false;
  const lowered = trimmed.toLowerCase();
  const invalids = new Set([
    "unknown",
    "unknow", 
    "desconocido",
    "n/a",
    "na",
    "-",
    "null",
    "undefined",
    "unassigned teacher",
  ]);
  return !invalids.has(lowered);
};

// Function to get teacher name from ID
const getTeacherName = async (teacherId) => {
  try {
    const response = await userListById(teacherId);
    

    if (response && response.data) {
      const teacherData = response.data;
      const fullName = `${teacherData.name} ${teacherData.lastname}`.trim();
      return isValidName(fullName) ? fullName : null;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching teacher details for ID ${teacherId}:`, error);
    return null;
  }
};

const MyClasses = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [classes, setClasses] = useState([]);
  const classesRef = useRef([]); // Ref para mantener referencia actualizada
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

  // Mantener classesRef sincronizado con classes
  useEffect(() => {
    classesRef.current = classes;
  }, [classes]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Get user points and ranking from API
        try {
          const pointsResponse = await getUserPoints(user.userId);

          const rankResponse = await getCurrentRank(user.userId);

          const booksCompletedResponse = await getBooksCompleted(user.userId);

          const completedBooksCount =
            booksCompletedResponse?.data?.completed_books || 0;

          if (pointsResponse) {
            const userPoints = parseInt(pointsResponse.total_points || 0);
            const level = Math.max(1, Math.floor(userPoints / 500) + 1);

            setUserStats((prev) => ({
              ...prev,
              points: userPoints,
              level: level,
              ranking: rankResponse ? rankResponse.position : 0,
              pointsToNextLevel: level * 500 - userPoints,
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

        const studentGroups = studentsGroups.data.filter(
          (student) => student.userid === user.userId
        );
        

        const formattedClasses = [];

        for (const group of studentGroups) {
            try {
            const classResponse = await listedClassesId(group.groupscreateid);

            if (
              classResponse &&
              classResponse.data &&
              classResponse.data.length > 0
            ) {
              // Iterate through ALL classes returned for this group
              for (const classData of classResponse.data) {
                let teacherName = null;

                // Try to get teacher name from group data first
                if (group.teachername && isValidName(group.teachername)) {
                  teacherName = group.teachername;
                } else if (classData.teacherassigned) {
                  // If group doesn't have a valid teacher name, fetch from teacher ID
                  teacherName = await getTeacherName(classData.teacherassigned);
                }

                let realProgress = 0;
                try {
                  const classBooks = await listedBooksPerClassesById(classData.classesid);
                  if (classBooks?.data && classBooks.data.length > 0) {
                    const bookIds = classBooks.data.map(book => book.booksid || book.id);
                    realProgress = await calculateClassProgress(user.userId, bookIds);
                  }
                } catch (progressError) {
                  realProgress = 0;
                }

                const formattedGroup = {
                  id: `${group.groupscreateid}-${classData.classesid}`,
                  groupId: group.groupscreateid,
                  classId: classData.classesid,
                  name: classData.name || "Unnamed Class",
                  grade: classData.grade,
                  progress: realProgress,
                  teacherId: classData.teacherassigned,
                  teacher: teacherName, // This will be null if no valid name found
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

                
                formattedClasses.push(formattedGroup);
              }
              } else {
              const teacherName = (group.teachername && isValidName(group.teachername)) 
                ? group.teachername 
                : null;
              
              const formattedGroup = {
                id: group.groupscreateid,
                groupId: group.groupscreateid,
                name: group.groupname || "Unnamed Class",
                progress: group.progress || 0,
                teacher: teacherName,
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
            const teacherName = (group.teachername && isValidName(group.teachername)) 
              ? group.teachername 
              : null;
            
            const formattedGroup = {
              id: group.groupscreateid,
              groupId: group.groupscreateid,
              name: group.groupname || "Unnamed Class",
              progress: group.progress || 0,
              teacher: teacherName,
              nextClass: "No scheduled classes",
              image: group.image || "/Media/media/default-class.jpg",
              bookId: group.bookid || 3,
            };
            formattedClasses.push(formattedGroup);
          }
        }

        
        setClasses(formattedClasses);
      } catch (error) {
        console.error("Error loading classes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user.userId]);

  useEffect(() => {
    if (isLoading || classes.length === 0) {
      return;
    }

    let isProcessing = false;

    const updateClassProgress = async () => {
      if (isProcessing) {
        return;
      }

      try {
        const trigger = localStorage.getItem('book_completed_trigger');
        
        if (!trigger) return;

        isProcessing = true;
        const { userId, bookId, timestamp } = JSON.parse(trigger);
        
        if (userId !== user.userId) {
          localStorage.removeItem('book_completed_trigger');
          isProcessing = false;
          return;
        }

        if (Date.now() - timestamp > 10000) {
          localStorage.removeItem('book_completed_trigger');
          isProcessing = false;
          return;
        }
        
        let targetClassId = null;
        let found = false;
        
        for (const classItem of classesRef.current) {
          
          if (classItem.classId) {
            try {
              const booksResponse = await listedBooksPerClassesById(classItem.classId);
              
              
              if (booksResponse?.data) {
                const hasBook = booksResponse.data.some(
                  book => {
                    const bookIdToCheck = book.booksid || book.id;
                    // Comparar asegurando que ambos sean del mismo tipo
                    const match = Number(bookIdToCheck) === Number(bookId);
                    
                    return match;
                  }
                );
                
                if (hasBook) {
                  targetClassId = classItem.classId;
                  found = true;
                  
                  const classBookIds = booksResponse.data.map(
                    book => book.booksid || book.id
                  );
                  
                  const newProgress = await calculateClassProgress(userId, classBookIds);
                  
                  setClasses(prevClasses => {
                    const updatedClasses = prevClasses.map(cls => 
                      cls.classId === targetClassId 
                        ? { ...cls, progress: newProgress }
                        : cls
                    );
                    return updatedClasses;
                  });
                  
                  break;
                }
              }
            } catch (error) {
              console.error(`Error checking books for class ${classItem.classId}:`, error);
            }
          }
        }

        localStorage.removeItem('book_completed_trigger');
        
      } catch (error) {
        console.error("Error updating class progress:", error);
        localStorage.removeItem('book_completed_trigger');
      } finally {
        isProcessing = false;
      }
    };

    const interval = setInterval(updateClassProgress, 1000);
    
    updateClassProgress();
    
    return () => {
      clearInterval(interval);
    };
  }, [user.userId, isLoading, classes.length]);

  // Function to fetch books for a specific class
  const fetchClassBooks = async (classId) => {
    setLoadingBooks(true);
    try {
      const response = await listedBooksPerClassesById(classId);

      if (response && response.data && response.data.length > 0) {
        const booksWithDetails = [];

        for (const bookItem of response.data) {
          try {
            const bookId = bookItem.booksid || bookItem.id;

            if (bookId) {
              const bookDetailsResponse = await bookSearchById(bookId);

              if (bookDetailsResponse && bookDetailsResponse.data) {
                const bookDetails = bookDetailsResponse.data;

                const bookWithDetails = {
                  id: bookId,
                  title: bookDetails.title || "Untitled Book",
                  author: bookDetails.author || "Unknown Author",
                  category: bookDetails.category,
                  description: bookDetails.description || "",
                  cover:
                    bookDetails.portrait || "/Media/media/default-book.jpg",
                  progress: bookItem.progress || 0,
                  ...bookItem,
                };

                booksWithDetails.push(bookWithDetails);
              } else {
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
      <div className="dashboard-content" style={{ padding: "0px" }}>
        {/* Sidebar with statistics - Only show when no class is selected */}
        {!selectedClass && <MyClassesStatCard userStats={userStats} />}
        
        <main className={`main-content bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 ${selectedClass ? 'full-width' : ''}`}> 
          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="tab-content">
              {/* Show classes grid when no class is selected */}
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
                              <p className="text-sm font-semibold text-gray-600">
                                {classItem.teacher || "Teacher not assigned"}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2 mb-3">
                              <FontAwesomeIcon icon={faCalendarAlt} className="h-3.5 w-3.5 text-green-600" />
                              <p className="text-xs font-bold text-green-700">{classItem.nextClass}</p>
                            </div>

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
                <>
                  {loadingBooks ? (
                    <div className="loading-spinner">
                      <div className="spinner"></div>
                    </div>
                  ) : (
                    <MyBookClasses 
                      books={classBooks} 
                      onBookClick={handleBookClick} 
                      getMediaUrl={getMediaUrl} 
                      teacherName={selectedClass.teacher}
                      headerTitle={`Books from ${selectedClass.name}`}
                      headerSubtitle="Explore your book collection and begin your learning adventure"
                      onBackToClasses={handleBackToClasses}
                      backButtonText=" Return to Classes"
                      showBackButton={true}
                      showStyleTools={true}
                    />
                  )}
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyClasses;