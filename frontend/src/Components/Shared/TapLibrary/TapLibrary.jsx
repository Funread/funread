import React, { useState, useEffect } from "react";
import BookCard from "../BookCard/BookCard";
import "./TapLibrary.sass";
import { listed_PrivateBooks, listed_PublishedBooks } from "../../../api/books";
import { listDimensions, searchDimensionByCategory, searchDilemmaByDimension, getBookCategoryDimensionDilemmas } from "../../../api/bookDilemma";
import Message from "../CustomMessage/CustomMessage";
import { useSelector } from "react-redux";
import BookBuilderStepper from "../BookBuilder/BookBuilderStepper";
import { BookOpen, Grid3X3, List, Filter, ArrowDownAZ, ChevronDown } from "lucide-react";
import StatCard from "../../StatCard/StatCard";


function TapLibrary({ toggleSidebar, newBooks }) {
  const [tab, setTab] = useState("mylibrary");
  const user = useSelector((state) => state.user);
  const [publishedBooks, setPublishedBooks] = useState([]);
  const [privateBooks, setPrivateBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBookBuilder, setShowBookBuilder] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedDimension, setSelectedDimension] = useState("all");
  const [sortBy, setSortBy] = useState("dimension");
  const [allDimensions, setAllDimensions] = useState([]);
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setHideHeader(scrollY > 60 && scrollY > lastScroll);
      setLastScroll(scrollY);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScroll]);

  const fetchData = async () => {
    try {
      const [publishedResponse, privateResponse] = await Promise.all([
        listed_PublishedBooks(),
        listed_PrivateBooks(),
      ]);

      // Helper para enriquecer cada libro con detalles de categoría, dimensiones y dilemas
      const enrichBooks = async (books) => {
        return Promise.all(
          books.map(async (book) => {
            let categoryName = '';
            let dimensionNames = [];
            let dilemmaNames = [];
            try {
              const detailsRes = await getBookCategoryDimensionDilemmas(book.bookid);
              const details = detailsRes.data;
              if (details.categories && details.categories.length > 0) {
                categoryName = details.categories.map(c => c.name).join(', ');
              }
              if (details.dimensions && details.dimensions.length > 0) {
                dimensionNames = details.dimensions.map(d => d.name);
              }
              if (details.dilemmas && details.dilemmas.length > 0) {
                dilemmaNames = details.dilemmas.map(d => d.dilemma);
              }
            } catch (error) {
              // Si falla, dejar vacío
            }
            return {
              ...book,
              categoryName,
              dimensionNames,
              dilemmaNames,
            };
          })
        );
      };

      const filteredPrivateBooks = privateResponse.data.filter((book) => book.createdby === user.userId);

      const enrichedPublishedBooks = await enrichBooks(publishedResponse.data);
      const enrichedPrivateBooks = await enrichBooks(filteredPrivateBooks);

      setPublishedBooks(enrichedPublishedBooks);
      setPrivateBooks(enrichedPrivateBooks);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Obtener todas las dimensiones usando el nuevo método
    async function fetchAllDimensions() {
      try {
        const res = await listDimensions();
        setAllDimensions(res.data || []);
      } catch (err) {
        setAllDimensions([]);
      }
    }
    fetchAllDimensions();
  }, [newBooks]);

  // Filtros y ordenamiento
  const allBooks = tab === "mylibrary" ? privateBooks : publishedBooks;
  // Dimensiones dinámicas desde la base de datos
  const dimensions = [{ name: "All Dimensions", bookdimensionid: "all" }, ...allDimensions];
  const filteredBooks = selectedDimension === "all"
    ? allBooks
    : allBooks.filter(book => {
        // Filtrar por id de dimensión o por nombre de dimensión
        // 1. Si el libro tiene un array de dimensionNames, buscar si alguna coincide con el nombre de la dimensión seleccionada
        // 2. Si el libro tiene dimensionid o bookdimensionid, comparar por id
        const selectedDimObj = allDimensions.find(d => d.bookdimensionid?.toString() === selectedDimension);
        const selectedDimName = selectedDimObj ? selectedDimObj.name : null;
        return (
          (Array.isArray(book.dimensionNames) && selectedDimName && book.dimensionNames.includes(selectedDimName)) ||
          book.bookdimensionid?.toString() === selectedDimension ||
          book.dimensionid?.toString() === selectedDimension
        );
      });
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === "dimension") {
      return (a.dimensionName || "").localeCompare(b.dimensionName || "");
    } else if (sortBy === "title") {
      return (a.title || "").localeCompare(b.title || "");
    }
    return 0;
  });

  // Refresca la lista de libros privados y cambia la pestaña
  const handleBookCreated = () => {
    setTab("mylibrary");
    fetchData();
  };

  return (
<div className="w-full">

  {/* Header fijo: Tabs y stats */}
  <div className={`w-full flex items-center justify-between mb-6 sticky top-0 z-10 transition-transform duration-300 bg-white ${hideHeader ? ' -translate-y-[120%] opacity-0 pointer-events-none' : ' translate-y-0 opacity-100'}`} style={{paddingTop: 0, paddingBottom: 0}}>
        <div className="flex gap-2 pl-1">
          <button
            className={`px-4 py-1.5 rounded-lg font-semibold shadow-sm text-base ${tab === "mylibrary" ? "bg-white text-blue-700 border-2 border-blue-400" : "bg-gray-100 text-gray-500"}`}
            onClick={() => { setTab("mylibrary"); setShowBookBuilder(false); }}
          >
            My library
          </button>
          <button
            className={`px-4 py-1.5 rounded-lg font-semibold shadow-sm text-base ${tab === "publiclibrary" ? "bg-white text-blue-700 border-2 border-blue-400" : "bg-gray-100 text-gray-500"}`}
            onClick={() => { setTab("publiclibrary"); setShowBookBuilder(false); }}
          >
            Public Library
          </button>
          <button
            className={`px-4 py-1.5 rounded-lg font-semibold shadow-sm text-base ${tab === "newbook" ? "bg-white text-blue-700 border-2 border-blue-400" : "bg-gray-100 text-gray-500"}`}
            onClick={() => { setTab("newbook"); setShowBookBuilder(false); }}
          >
            New Book
          </button>
        </div>
        <div className="flex gap-2">
          <StatCard
            title={null}
            className="books-info flex-row items-center !min-w-0 !p-0 !h-auto border border-blue-100 bg-blue-50/60 shadow-none rounded-xl transition hover:border-blue-300 hover:bg-blue-100/80"
            iconClassName="!bg-white !rounded-full !p-2 !mr-2 border border-blue-100"
            icon={<BookOpen className="h-5 w-5 text-blue-500" />}
          >
            <span className="text-blue-800 text-base font-semibold tracking-tight px-2">{privateBooks.length + publishedBooks.length} <span className="font-normal">Books</span></span>
          </StatCard>
          <StatCard
            title={null}
            className="groups-info flex-row items-center !min-w-0 !p-0 !h-auto border border-cyan-100 bg-cyan-50/60 shadow-none rounded-xl transition hover:border-cyan-300 hover:bg-cyan-100/80"
            iconClassName="!bg-white !rounded-full !p-2 !mr-2 border border-cyan-100"
            icon={<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-cyan-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><rect x='3' y='7' width='18' height='13' rx='2' strokeWidth='2' /><path d='M16 3v4M8 3v4' strokeWidth='2' /><circle cx='12' cy='14' r='2' strokeWidth='2' /></svg>}
          >
            <span className="text-cyan-800 text-base font-semibold tracking-tight px-2">2 <span className="font-normal">Groups</span></span>
          </StatCard>
        </div>
      </div>
      {/* Contenido scrollable solo para libros */}
      <div style={{flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column'}}>
        {tab === "newbook" && (
          <div className="flex justify-center items-center min-h-[400px] bg-white rounded-xl shadow p-6">
            <BookBuilderStepper toggleSidebar={toggleSidebar} updateBook={handleBookCreated} />
          </div>
        )}
        {(tab === "mylibrary" || tab === "publiclibrary") && (
          <React.Fragment>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2 sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-100 py-2 px-[5px]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <BookOpen className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{tab === "mylibrary" ? "My Library" : "Public Library"}</h2>
                  <p className="text-sm text-slate-500">{sortedBooks.length} Available books</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* Filtro por dimensión */}
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Filter className="h-4 w-4 text-slate-400" />
                  </div>
                  <select
                    value={selectedDimension}
                    onChange={e => setSelectedDimension(e.target.value)}
                    className="block w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-8 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {dimensions.map(dimension => (
                      <option key={dimension.bookdimensionid} value={dimension.bookdimensionid}>
                        {dimension.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>

                {/* Ordenar */}
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <ArrowDownAZ className="h-4 w-4 text-slate-400" />
                  </div>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="block w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-8 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="dimension">Sort by Dimension</option>
                    <option value="title">Sort A-Z</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>

                {/* Vista grid/list */}
                <div className="flex border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    className={`view-toggle-btn${viewMode === "grid" ? " active" : ""}`}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    className={`view-toggle-btn${viewMode === "list" ? " active" : ""}`}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div style={{flex: 1, minHeight: 0, overflowY: 'auto'}}>
              {/* Dynamic dimension header */}
              {selectedDimension === "all" ? (
                <div className="text-base font-semibold text-slate-600 mb-2 pl-3">Explore dimensions</div>
              ) : (
                <div className="text-base font-semibold text-slate-600 mb-2 pl-3">
                  {(() => {
                    const dim = allDimensions.find(d => d.bookdimensionid?.toString() === selectedDimension);
                    return dim ? dim.name : '';
                  })()}
                </div>
              )}
              {/* Grid/List View */}
              {isLoading ? (
                <Message message={"Loading..."} />
              ) : sortedBooks.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No books found.</h3>
                  <p className="text-slate-500">Try changing the filters or adding new books to your library.</p>
                </div>
              ) : viewMode === "grid" ? (
                <div className="library-grid-container">
                  <div className="grid">
                    {sortedBooks.map((book, index) => (
                      <div key={index} className="section_item_Tap">
                        <BookCard
                          id={book.bookid}
                          portrait={book.portrait}
                          title={book.title}
                          category={book.categoryName || book.category}
                          author={book.author}
                          description={book.description}
                          dimensionNames={book.dimensionNames}
                          dilemmaNames={book.dilemmaNames}
                          color={"#D0F4DE"}
                          toggleSidebar={toggleSidebar}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="library-grid-container">
                  <div className="list-view-books">
                    {sortedBooks.map((book, index) => (
                      <div key={index} className="section_item_Tap">
                        <BookCard
                          id={book.bookid}
                          portrait={book.portrait}
                          title={book.title}
                          category={book.categoryName || book.category}
                          author={book.author}
                          description={book.description}
                          dimensionNames={book.dimensionNames}
                          dilemmaNames={book.dilemmaNames}
                          color={"#D0F4DE"}
                          toggleSidebar={toggleSidebar}
                          listView={true}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div> {/* Cierre del div de grid/list */}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default TapLibrary;

