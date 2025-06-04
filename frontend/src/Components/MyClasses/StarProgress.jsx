import React from 'react';

const Star = ({ fill, size }) => {
  const clipPath = `inset(0 ${100 - fill * 100}% 0 0)`;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>

      {/* Estrella de fondo */}
      <svg viewBox="0 0 100 100" width={size} height={size} style={{ position: 'absolute' }}>
        <polygon
          points="50,5 61,39 98,39 68,61 79,95 50,75 21,95 32,61 2,39 39,39"
          fill="#c2ccff" // gris claro
        />
      </svg>

      {/* Estrella rellena */}
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={{
          position: 'absolute',
          clipPath,
          overflow: 'hidden',
        }}
      >
        <polygon
          points="50,5 61,39 98,39 68,61 79,95 50,75 21,95 32,61 2,39 39,39"
          fill="#facc15" // dorado
        />
      </svg>
    </div>
  );
};

const StarProgress = ({ value, max, totalStars = 5, size = 30 }) => {
  const progressRatio = value / max;
  const filledStars = totalStars * progressRatio;

  return (
    <div style={{ display: 'flex', width: 'fit-content', justifyContent: 'center', alignItems: 'center' }}>
      {Array.from({ length: totalStars }).map((_, i) => {
        const fillLevel = Math.min(Math.max(filledStars - i, 0), 1);
        return <Star key={i} fill={fillLevel} size={size} />;
      })}
    </div>
  );
};

export default StarProgress;
