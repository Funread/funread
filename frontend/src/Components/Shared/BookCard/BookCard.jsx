

import React, { useState } from 'react';
import './BookCard.sass';
import { searchCategory } from '../../../api/bookDilemma';
import { getMediaUrl } from '../../Utils/mediaUrl';

const BookCard = ({
  id,
  portrait,
  title,
  author,
  username,
  createdby,
  category, 
  description,
  color,
  toggleSidebar,
  dimensionNames, 
  dilemmaNames, 
  listView = false,
}) => {
  const [categoryName, setCategoryName] = useState('');
  const imageCard = portrait
    ? getMediaUrl(portrait)
    : '/imagenes/no-image.png';



  // Badge de categoría
  const categoryBadge = category ? (
    <span className="category-badge">{category}</span>
  ) : null;

  // Utilidad para normalizar nombres a clases
  const toClass = (str) =>
    str
      .toLowerCase()
      .replace(/á/g, 'a')
      .replace(/é/g, 'e')
      .replace(/í/g, 'i')
      .replace(/ó/g, 'o')
      .replace(/ú/g, 'u')
      .replace(/ñ/g, 'n')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  // Badges de dimensiones
  const dimensionBadges = Array.isArray(dimensionNames) && dimensionNames.length > 0
    ? dimensionNames.map((d, i) => {
        const dimClass = `dimension-badge dimension-badge--${toClass(d)}`;
        return (
          <span key={i} className={dimClass}>{d}</span>
        );
      })
    : null;

  // Badges de dilemas
  const dilemmaBadges = Array.isArray(dilemmaNames) && dilemmaNames.length > 0
    ? dilemmaNames.map((d, i) => {
        const dilClass = `dilemma-badge dilemma-badge--${toClass(d)}`;
        return (
          <span key={i} className={dilClass}>{d}</span>
        );
      })
    : null;

  // Detectar si es vista lista (prop: listView) o grilla (por defecto)
  // Permitir prop explícita para vista lista
  const isListView = !!(typeof window !== 'undefined' && document?.body?.classList?.contains('book-list-view')) || (typeof listView !== 'undefined' && listView);

  // Fallback de autor: prioriza author -> username -> `User <createdby>`
  const displayAuthor = author || username || (createdby ? `User ${createdby}` : null);


  return (
    <div
      className={isListView ? 'Book-card bookcard-list-view' : 'Book-card Book-card--grid'}
      onClick={() =>
        toggleSidebar({
          id,
          portrait,
          title,
          author: displayAuthor,
          rawAuthor: author,
          username,
          createdby,
          category,
          description,
          color,
        })
      }
    >
      {isListView ? (
        <div className="book-cover-container-list">
          <img
            className="book-cover-img"
            src={imageCard}
            alt="Portrait"
          />
        </div>
      ) : (
        <>
          {/* Imagen */}
          <div className="Book-card__imageRatio">
            <img
              src={imageCard}
              alt={title}
              className="Book-card__image"
            />
          </div>
          {/* Separador */}
          <div className="Book-card__separator"></div>
          {/* Contenido */}
          <div className="Book-card__body">
            <h5 className="Book-card__title">{title}</h5>
            {/* {displayAuthor && <p className="Book-card__author">{displayAuthor}</p>} */}
            <div className="Book-card__badgesRow">
              {dimensionBadges}
              {dilemmaBadges}
            </div>
          </div>
        </>
      )}
      {isListView && (
        <div className="book-content-list">
          <h5 className="card-title">{title}</h5>
          {displayAuthor && <div className="card-author">{displayAuthor}</div>}
          <div className="badges-row">
            {dimensionBadges}
            {dilemmaBadges}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;


