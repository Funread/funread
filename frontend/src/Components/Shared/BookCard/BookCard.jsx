

import React, { useState, useEffect } from 'react';
import './BookCard.sass';
import { searchCategory } from '../../../api/bookDilemma';
import { getMediaUrl } from '../../Utils/mediaUrl';

const BookCard = ({
  id,
  portrait,
  title,
  author,
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

  return (
    <div
      className={`Book-card${isListView ? ' bookcard-list-view' : ''}`}
  style={{ backgroundColor: '#fff', maxWidth: isListView ? '100%' : 340, border: '1.1px solid #e5e7eb', boxShadow: 'none' }}
      onClick={() =>
        toggleSidebar({
          id,
          portrait,
          title,
          author,
          category,
          description,
          color,
        })
      }
    >
      {isListView ? (
        <div style={{ width: 56, height: 56, minWidth: 56, minHeight: 56, background: '#f8fafc', borderRadius: 10, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 18 , marginLeft:10}}>
          <img
            className="book-cover-img"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
            src={imageCard}
            alt="Portrait"
          />
        </div>
      ) : (
        <div className="aspect-[3/4] w-full bg-slate-50 overflow-hidden">
          <img
            className="w-full h-full object-cover book-cover-img transition-transform duration-300 hover:scale-105"
            src={imageCard}
            alt="Portrait"
          />
        </div>
      )}
      <div className={isListView ? 'd-flex flex-column flex-1 min-w-0 justify-content-center' : 'flex flex-col items-center text-center w-full'} style={isListView ? { gap: 0, marginTop: 0, marginBottom: 0 } : {}}>
        <h5 className="card-title clamp-text custom-title" style={{ fontSize: '1.01rem', fontWeight: 700, margin: '10px  0 10px 0', color: '#1e293b', lineHeight: 1.18 }}>{title}</h5>
        {author && <div className="custom-text" style={{ fontSize: '0.93rem', color: '#64748b', margin: '0 0 2px 0' }}>{author}</div>}
        <div className="badges-row" style={isListView ? { marginTop: 0, marginBottom: 0 } : {display:'flex',justifyContent:"center"}}>
          {dimensionBadges}
          {dilemmaBadges}
        </div>
      </div>
    </div>
  );
};

export default BookCard;


