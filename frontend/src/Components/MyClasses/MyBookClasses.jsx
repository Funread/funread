'use client'

import { useState } from "react"
import { Sparkles, Star, X, ArrowLeft, Palette, Scissors, Image } from "lucide-react"
import './MyBookClasses.css'

const BookCard = ({ book, onClick, getMediaUrl, displayStyle = "overlay", teacherName }) => {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const defaultGetMediaUrl = (path) => {
    if (!path) return null
    return path
  }

  const getMedia = getMediaUrl || defaultGetMediaUrl
  const coverUrl = book.cover || getMedia(book.cover)

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
        className="book-card-wrapper"
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="book-glow-wrapper">
          <div className={`book-glow bg-gradient-to-br ${bookColor}`}></div>

          <div className="book-card-container">
            <div className={`book-spine bg-gradient-to-r ${bookColor}`}></div>

            <div className={`book-cover-3d style-${displayStyle}`}>
              <div className={`book-background bg-gradient-to-br ${bookColor}`}>
                <div className="background-pattern"></div>
              </div>

              <div className={`book-image-container ${hasImage ? "has-image" : ""}`}>
                {hasImage && (
                  <img
                    src={coverUrl || "/placeholder.svg"}
                    alt={book.title || "Libro"}
                    onError={() => setImageError(true)}
                    className="book-cover-img"
                  />
                )}
              </div>

              {!hasImage && (
                <div className="no-image-icon">
                  <Sparkles size={48} color="white" strokeWidth={2} />
                </div>
              )}

              <div className="book-shine"></div>
              <div className="book-corner-fold"></div>

              {isHovered && (
                <div className="book-sparkles">
                  <Star className="sparkle sparkle-1" size={16} fill="gold" color="gold" />
                  <Star className="sparkle sparkle-2" size={12} fill="yellow" color="yellow" />
                  <Star className="sparkle sparkle-3" size={14} fill="gold" color="gold" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="book-title-container">
          <div className="title-badge">
            <h3 className="book-title">{book.title || book.name || "Libro sin título"}</h3>
          </div>
          {(book.author || book.authorname || teacherName) && <p className="book-author">📝 {book.author || book.authorname || teacherName}</p>}
        </div>
      </div>

      {isOpen && (
        <div className="book-modal-overlay" onClick={handleClose}>
          <div className="book-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleClose}>
              <X size={32} />
            </button>

            <div className="modal-book-container">
              <div className="opened-book">
                <div className="book-page left-page">
                  <div className="page-content">
                    <h2 className="modal-book-title">{book.title || book.name || "Libro sin título"}</h2>
                    {(book.author || book.authorname) && <p className="modal-book-author">Por: {book.author || book.authorname}</p>}
                    <div className="book-details">
                      <p>📚 Ready to read!</p>
                      <p>✨ Click the button to start the adventure.</p>
                    </div>
                    <button onClick={handleReadBook} className="read-book-button">Start Reading</button>
                    <div className="decorative-stars">
                      <Star size={20} fill="gold" color="gold" />
                      <Star size={16} fill="gold" color="gold" />
                      <Star size={18} fill="gold" color="gold" />
                    </div>
                  </div>
                </div>

                <div className="book-page right-page">
                  <div className="page-cover">
                    {hasImage ? (
                      <img
                        src={coverUrl || "/placeholder.svg"}
                        alt={book.title || "Libro"}
                        className="modal-cover-img"
                      />
                    ) : (
                      <div className={`modal-placeholder bg-gradient-to-br ${bookColor}`}>
                        <Sparkles size={80} color="white" strokeWidth={2} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="floating-sparkles">
              <Sparkles className="float-sparkle float-1" size={24} color="gold" />
              <Sparkles className="float-sparkle float-2" size={20} color="yellow" />
              <Sparkles className="float-sparkle float-3" size={22} color="gold" />
              <Sparkles className="float-sparkle float-4" size={18} color="yellow" />
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
    { id: "overlay", name: "Superposición", icon: Palette, desc: "Imagen con transparencia" },
    { id: "cropped", name: "Recorte Central", icon: Scissors, desc: "Imagen recortada en el centro" },
    { id: "framed", name: "Marco Decorativo", icon: Image, desc: "Imagen dentro de un marco" },
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
                <span className="text-xs font-medium text-white/90 hidden sm:inline">Herramientas:</span>
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
              teacherName={book.authorname || teacherName}
            />
          ))}
        </div>

        {books.length === 0 && (
          <div className="text-center py-20">
            <Sparkles size={64} className="mx-auto text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold text-slate-700 mb-2">No hay libros disponibles</h3>
            <p className="text-slate-600">Agrega libros para comenzar tu biblioteca</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default MyBookClasses