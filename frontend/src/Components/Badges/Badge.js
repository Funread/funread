import React, { useState } from 'react';
import CollectionSidebar from './CollectionSidebar';
import BadgeGrid from './BadgeGrid';
import './Badges.css';

const BadgesPage = () => {
  const [filter, setFilter] = useState("all");

  // Función para manejar la selección de colección
  const onSelectCollection = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <div className="badges-page-container">
      <CollectionSidebar onSelectCollection={onSelectCollection} />
      <BadgeGrid filter={filter} booksRead={120} />
    </div>
  );
};

export default BadgesPage;
