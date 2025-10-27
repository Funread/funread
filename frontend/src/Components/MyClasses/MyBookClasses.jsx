'use client'

import { useState, useEffect } from "react"
import { Sparkles, Star, X, ArrowLeft, Palette, Scissors, Image, BookOpen, Lightbulb, Book, Wand2 } from "lucide-react"
import './MyBookClasses.css'
import { getBookCategoryDimensionDilemmas } from '../../api/bookDilemma'

const BookCard = ({ book, onClick, getMediaUrl, displayStyle = "overlay", teacherName }) => {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [bookDimensions, setBookDimensions] = useState(null)
  const [loadingDimensions, setLoadingDimensions] = useState(false)

  const defaultGetMediaUrl = (path) => {
    if (!path) return null
    return path
  }

  const getMedia = getMediaUrl || defaultGetMediaUrl
  const coverUrl = book.cover || getMedia(book.cover)

  // Helper to validate that a name is meaningful (not empty or placeholders like "unknown")
  const isValidName = (name) => {
    if (!name || typeof name !== "string") return false
    const trimmed = name.trim()
    if (!trimmed) return false
    const lowered = trimmed.toLowerCase()
    const invalids = new Set([
      "unknown",
      "unknow", 
      "desconocido",
      "unknown author",
      "autor desconocido",
      "n/a",
      "na",
      "-",
      "null",
      "undefined",
    ])
    return !invalids.has(lowered)
  }

  // Find first valid author name from book data or use teacher name as fallback
  const displayAuthorName = [book.author, book.authorname, teacherName].find(isValidName)

  const colors = [
    "from-pink-400 via-purple-400 to-indigo-500",
    "from-yellow-400 via-orange-400 to-red-500",
    "from-green-400 via-teal-400 to-blue-500",
    "from-purple-400 via-pink-400 to-rose-500",
  ]

  const bookColor = colors[(book.id || book.booksid || 0) % colors.length]
  const hasImage = coverUrl && !imageError

  const handleCardClick = (e) => {
    e.stopPropagation()
    setIsOpen(true)
    loadBookDimensions()
  }

  const loadBookDimensions = async () => {
    const bookId = book.id || book.booksid
    if (!bookId) return
    
    setLoadingDimensions(true)
    try {
      const response = await getBookCategoryDimensionDilemmas(bookId)
      if (response.data) {
        setBookDimensions(response.data)
      }
    } catch (error) {
      console.error('Error loading book dimensions:', error)
    } finally {
      setLoadingDimensions(false)
    }
  }

  const handleClose = (e) => {
    e.stopPropagation()
    setIsOpen(false)
  }

  const handleReadBook = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick(book.id || book.booksid);
    }
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="mybook-classes-card-wrapper"
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="mybook-classes-glow-wrapper">
          <div className={`mybook-classes-glow bg-gradient-to-br ${bookColor}`}></div>

          <div className="mybook-classes-card-container">
            <div className={`mybook-classes-spine bg-gradient-to-r ${bookColor}`}></div>

            <div className={`mybook-classes-cover-3d mybook-classes-style-${displayStyle}`}>
              <div className={`mybook-classes-background bg-gradient-to-br ${bookColor}`}>
                <div className="mybook-classes-background-pattern"></div>
              </div>

              <div className={`mybook-classes-image-container ${hasImage ? "has-image" : ""}`}>
                {hasImage && (
                  <img
                    src={coverUrl || "/placeholder.svg"}
                    alt={book.title || "Libro"}
                    onError={() => setImageError(true)}
                    className="mybook-classes-cover-img"
                  />
                )}
              </div>

              {!hasImage && (
                <div className="mybook-classes-no-image-icon">
                  <Sparkles size={48} color="white" strokeWidth={2} />
                </div>
              )}

              <div className="mybook-classes-shine"></div>
              <div className="mybook-classes-corner-fold"></div>

              {isHovered && (
                <div className="mybook-classes-sparkles">
                  <Star className="sparkle sparkle-1" size={16} fill="gold" color="gold" />
                  <Star className="sparkle sparkle-2" size={12} fill="yellow" color="yellow" />
                  <Star className="sparkle sparkle-3" size={14} fill="gold" color="gold" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mybook-classes-title-container">
          <div className="mybook-classes-title-badge">
            <h3 className="mybook-classes-book-title">{book.title || book.name || "Libro sin título"}</h3>
          </div>
          {displayAuthorName && <p className="mybook-classes-book-author"> {displayAuthorName}</p>}
        </div>
      </div>

      {isOpen && (
        <div className="mybook-classes-modal-overlay" onClick={handleClose}>
          <div className="mybook-classes-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="mybook-classes-close-button" onClick={handleClose}>
              <X size={32} />
            </button>

            <div className="mybook-classes-modal-book-container">
              <div className="mybook-classes-opened-book">
                <div className="mybook-classes-book-page mybook-classes-left-page">
                  <div className="mybook-classes-page-content">
                    <h2 className="mybook-classes-modal-book-title">{book.title || book.name || "Libro sin título"}</h2>
                    {displayAuthorName && <p className="mybook-classes-modal-book-author">By: {displayAuthorName}</p>}
                    
                    {/* Información de categoría y dimensiones */}
                    {loadingDimensions ? (
                      <div className="mybook-classes-book-dimensions-loading">
                        <Sparkles size={32} className="mybook-classes-loading-spinner" />
                      </div>
                    ) : bookDimensions && (
                      <div className="mybook-classes-book-dimensions-info">
                        {bookDimensions.category && (
                          <div className="mybook-classes-dimension-item mybook-classes-category-item">
                            <div className="mybook-classes-dimension-icon">
                              <BookOpen size={18} />
                            </div>
                            <div className="mybook-classes-dimension-content">
                              <span className="mybook-classes-dimension-label">Category:</span>
                              <span className="mybook-classes-dimension-value">{bookDimensions.category}</span>
                            </div>
                          </div>
                        )}
                        
                        {bookDimensions.dimensions && bookDimensions.dimensions.length > 0 && (
                          <div className="mybook-classes-dimensions-list">
                            <div className="mybook-classes-dimensions-header">
                              <Lightbulb size={16} className="mybook-classes-lightbulb-icon" />
                              <span className="mybook-classes-dimensions-title">Learning Dimensions:</span>
                            </div>
                            {bookDimensions.dimensions.map((dimension, index) => (
                              <div key={index} className="mybook-classes-dimension-item">
                                <div className="mybook-classes-dimension-badge">{index + 1}</div>
                                <div className="mybook-classes-dimension-content">
                                  <span className="mybook-classes-dimension-name">{dimension.name || dimension.dimension}</span>
                                  {dimension.description && (
                                    <p className="mybook-classes-dimension-description">{dimension.description}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="mybook-classes-book-details">
                      <div className="mybook-classes-detail-item">
                        <Book size={20} className="mybook-classes-detail-icon" />
                        <p>Ready to read!</p>
                      </div>
                      <div className="mybook-classes-detail-item">
                        <Wand2 size={20} className="mybook-classes-detail-icon" />
                        <p>Click the button to start the adventure.</p>
                      </div>
                    </div>
                    <button onClick={handleReadBook} className="mybook-classes-read-book-button">Start Reading</button>
                    <div className="mybook-classes-decorative-stars">
                      <Star size={20} fill="gold" color="gold" />
                      <Star size={16} fill="gold" color="gold" />
                      <Star size={18} fill="gold" color="gold" />
                    </div>
                  </div>
                </div>

                <div className="mybook-classes-book-page mybook-classes-right-page">
                  <div className="mybook-classes-page-cover">
                    {hasImage ? (
                      <img
                        src={coverUrl || "/placeholder.svg"}
                        alt={book.title || "Libro"}
                        className="mybook-classes-modal-cover-img"
                      />
                    ) : (
                      <div className={`mybook-classes-modal-placeholder bg-gradient-to-br ${bookColor}`}>
                        <Sparkles size={80} color="white" strokeWidth={2} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mybook-classes-floating-sparkles">
              <Sparkles className="mybook-classes-float-sparkle mybook-classes-float-1" size={24} color="gold" />
              <Sparkles className="mybook-classes-float-sparkle mybook-classes-float-2" size={20} color="yellow" />
              <Sparkles className="mybook-classes-float-sparkle mybook-classes-float-3" size={22} color="gold" />
              <Sparkles className="mybook-classes-float-sparkle mybook-classes-float-4" size={18} color="yellow" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const MyBookClasses = ({ 
  books = [], 
  onBookClick, 
  getMediaUrl, 
  teacherName, 
  className = "Matematica elemental", 
  onBackToClasses,
  // Props para personalizar el header
  headerTitle,
  headerSubtitle = "Explora tu colección de libros y comienza tu aventura de aprendizaje",
  showBackButton = true,
  backButtonText = "Regresar a Clases",
  showStyleTools = true
}) => {
  const [displayStyle, setDisplayStyle] = useState("cropped")

  const styles = [
    { id: "overlay", name: "Superposición", icon: Palette, desc: "Image with transparency" },
    { id: "cropped", name: "Recorte Central", icon: Scissors, desc: "Image cropped in the center" },
    { id: "framed", name: "Marco Decorativo", icon: Image, desc: "Image inside a frame"},
  ]

  const handleBackClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onBackToClasses) {
      onBackToClasses()
    }
  }

  // Usar headerTitle si está definido, sino usar className
  const displayTitle = headerTitle || `Books from ${className}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50" style={{ margin: 0, padding: 0 }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4 md:py-6">
          <div className="flex items-center justify-between mb-3">
            {showBackButton && (
              <button
                onClick={handleBackClick}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium hover:bg-white/20 border-white/30 border rounded-lg transition-all bg-white/10"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {backButtonText}
              </button>
            )}

            {showStyleTools && (
              <div className="flex items-center gap-3 ml-auto">
                <span className="text-xs font-medium text-white/90 hidden sm:inline">Tools:</span>
                <div className="flex items-center gap-1.5">
                  {styles.map((style) => {
                    const IconComponent = style.icon;
                    return (
                      <button
                        key={style.id}
                        onClick={() => setDisplayStyle(style.id)}
                        className={`p-2 rounded-lg transition-all group border ${
                          displayStyle === style.id
                            ? "bg-white/30 border-white/50"
                            : "border-white/20 hover:border-white/40 hover:bg-white/20"
                        }`}
                        title={style.name}
                      >
                        <IconComponent 
                          size={18}
                          className={`${
                            displayStyle === style.id
                              ? "text-white"
                              : "text-white/70 group-hover:text-white"
                          } transition-colors`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {displayTitle}
            </h1>
            <p className="text-sm md:text-base text-purple-100 max-w-2xl mx-auto">
              {headerSubtitle}
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {books.map((book) => (
            <BookCard 
              key={book.id || book.booksid} 
              book={book} 
              onClick={onBookClick} 
              getMediaUrl={getMediaUrl}
              displayStyle={displayStyle} 
              teacherName={teacherName}
            />
          ))}
        </div>

        {books.length === 0 && (
          <div className="text-center py-20">
            <Sparkles size={64} className="mx-auto text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold text-slate-700 mb-2">There are no books available.</h3>
            <p className="text-slate-600">Soon, a teacher will add a book.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default MyBookClasses