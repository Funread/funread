

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
  className={`Book-card ${isListView ? 'bookcard-list-view' : ''} bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer ${isListView ? 'flex flex-row items-center w-full px-5 py-3 gap-6 mb-4' : 'flex flex-col items-center p-4'}`}
  style={{ backgroundColor: color, maxWidth: isListView ? '100%' : 260, margin: isListView ? '0 0 16px 0' : '0 auto' }}
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
        <div className="w-20 h-20 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0 shadow-sm flex items-center justify-center">
          <img
            className="w-full h-full object-cover book-cover-img"
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
  <div className={`flex flex-col ${isListView ? 'items-start text-left flex-1 min-w-0' : 'items-center text-center w-full'}`}>
        <h5 className="card-title clamp-text custom-title text-lg font-bold text-slate-900 mb-1">{title}</h5>
        {author && <div className="text-sm text-slate-500 mb-2">{author}</div>}
        <div className="badges-row">
          {categoryBadge}
          {dimensionBadges}
          {dilemmaBadges}
        </div>
      </div>
    </div>
  );
};

export default BookCard;


