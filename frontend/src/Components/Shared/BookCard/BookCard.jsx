

import React, { useState, useEffect } from 'react';
import './BookCard.sass';
import { searchCategory } from '../../../api/bookDilemma';
import { getMediaUrl } from '../../Utils/mediaUrl';

const badgeColors = [
  'bg-emerald-50 text-emerald-800 border-emerald-200',
  'bg-amber-50 text-amber-800 border-amber-200',
  'bg-blue-50 text-blue-800 border-blue-200',
  'bg-slate-100 text-slate-700 border-slate-200',
  'bg-stone-100 text-stone-700 border-stone-200',
  'bg-neutral-100 text-neutral-700 border-neutral-200',
];

const BookCard = ({
  id,
  portrait,
  title,
  author,
  category, // categoryName (string)
  description,
  color,
  toggleSidebar,
  dimensionNames, // array
  dilemmaNames, // array
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

  // Badges de dimensiones
  const dimensionBadges = Array.isArray(dimensionNames) && dimensionNames.length > 0
    ? dimensionNames.map((d, i) => (
        <span key={i} className="dimension-badge">{d}</span>
      ))
    : null;

  // Badges de dilemas
  const dilemmaBadges = Array.isArray(dilemmaNames) && dilemmaNames.length > 0
    ? dilemmaNames.map((d, i) => (
        <span key={i} className="dilemma-badge">{d}</span>
      ))
    : null;

  // Detectar si es vista lista (prop: listView) o grilla (por defecto)
  // Permitir prop explícita para vista lista
  const isListView = !!(typeof window !== 'undefined' && document?.body?.classList?.contains('book-list-view')) || (typeof listView !== 'undefined' && listView);

  return (
    <div
      className={`Book-card${isListView ? ' bookcard-list-view' : ''}`}
      style={{ backgroundColor: '#fff', maxWidth: isListView ? '100%' : 260, margin: isListView ? '0 0 4px 0' : '0 auto', border: '1.1px solid #e5e7eb', boxShadow: 'none' }}
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
        <div style={{ width: 56, height: 56, minWidth: 56, minHeight: 56, background: '#f8fafc', borderRadius: 10, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 18 }}>
          <img
            className="book-cover-img"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
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
        <h5 className="card-title clamp-text custom-title" style={{ fontSize: '1.01rem', fontWeight: 700, margin: '0 0 2px 0', color: '#1e293b', lineHeight: 1.18 }}>{title}</h5>
        {author && <div className="custom-text" style={{ fontSize: '0.93rem', color: '#64748b', margin: '0 0 2px 0' }}>{author}</div>}
        <div className="badges-row" style={isListView ? { marginTop: 0, marginBottom: 0 } : {}}>
          {categoryBadge}
          {dimensionBadges}
          {dilemmaBadges}
        </div>
      </div>
    </div>
  );
};

export default BookCard;


