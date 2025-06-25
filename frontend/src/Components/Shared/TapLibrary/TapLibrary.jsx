import React, { useState, useEffect } from "react";
import BookCard from "../BookCard/BookCard";
import "./TapLibrary.sass";
import { Tabs, Tab } from "react-bootstrap";
import { listed_PrivateBooks, listed_PublishedBooks } from "../../../api/books";
import Message from "../CustomMessage/CustomMessage";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import BookBuilderStepper from "../BookBuilder/BookBuilderStepper";

function TapLibrary({ toggleSidebar, newBooks }) {
  const [key, setKey] = useState("mylibrary");
  const user = useSelector((state) => state.user);
  const [publishedBooks, setPublishedBooks] = useState([]);
  const [privateBooks, setPrivateBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBookBuilder, setShowBookBuilder] = useState(false);

  // Muevo fetchData aquí para que esté disponible en todo el componente
  const fetchData = async () => {
    try {
      const [publishedResponse, privateResponse] = await Promise.all([
        listed_PublishedBooks(),
        listed_PrivateBooks(),
      ]);

      const filteredBooks = privateResponse.data.filter((book) => {
        return book.createdby === user.userId;
      });

      setPublishedBooks(publishedResponse.data);
      setPrivateBooks(filteredBooks);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [newBooks]);

  const renderBooks = (books) => {
    if (isLoading) {
      return <Message message={"Loading..."} />;
    }

    if (books.length === 0) {
      return <Message message={"No books have been entered"} />;
    }

    return books.map(
      ({ bookid, portrait, title, category, author, description }, index) => (
        <div key={index} className="section_item_Tap">
          <BookCard
            key={index}
            id={bookid}
            portrait={portrait}
            title={title}
            category={category}
            author={author}
            description={description}
            color={"#D0F4DE"}
            toggleSidebar={toggleSidebar}
          />
        </div>
      )
    );
  };

  // Refresca la lista de libros privados y cambia la pestaña
  const handleBookCreated = () => {
    setKey("mylibrary");
    fetchData();
  };

  return (
    <>
      <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k) => {
          setKey(k);
          setShowBookBuilder(false); // Siempre ocultar modal, ya no se usa
        }}
      >
        <Tab eventKey="mylibrary" title="My library" className="tab">
          <div className="section_library_Tap shadow p-3 bg-body rounded">
            {renderBooks(privateBooks)}
          </div>
        </Tab>
        <Tab eventKey="publiclibrary" title="Public Library" className="tab">
          <div className="section_library_Tap shadow p-3 mb-5 bg-body rounded ">
            {renderBooks(publishedBooks)}
          </div>
        </Tab>
        <Tab eventKey="newbook" title="New Book" className="tab">
          <div
            className="section_library_Tap shadow p-3 bg-body rounded d-flex justify-content-center align-items-center"
            style={{ minHeight: 400 }}
          >
              <BookBuilderStepper
                toggleSidebar={toggleSidebar}
                updateBook={handleBookCreated}
              />
          </div>
        </Tab>
      </Tabs>
    </>
  );
}

export default TapLibrary;

