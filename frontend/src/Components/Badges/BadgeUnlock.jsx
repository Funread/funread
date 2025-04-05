import React, { useEffect, useState, useRef } from "react";
import "./BadgeUnlock.css";
import JSConfetti from 'js-confetti';

const CelebrationDiv = ( badge ) => {
  const { contenido } = badge;
  const [show, setShow] = useState(true);
  const confettiRef = useRef(null); // Ref para el contenedor del confeti
  const jsConfetti = new JSConfetti();

  useEffect(() => {
    // Agregar confeti
    jsConfetti.addConfetti({
      emojis: ["🎉", "✨", "💫", "🌟", "🏆", "🥳"],
      emojiSize: 75,
      confettiNumber: 100,
      duration: 2500,
      element: confettiRef.current, 
    });

    // Cerrar automáticamente después de 5 segundos
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="badgeunlock-container" ref={confettiRef}>
      <div className="badgeunlock-content">
        <div className="badgeunlock-icon-wrapper">
          <img
            src={contenido.icon}
            alt={`Icono de logro: ${contenido.title}`}
            className="badgeunlock-icon"
          />
        </div>
        <div className="badgeunlock-text">
          <h1>{contenido.title}</h1>
          <h2>¡Congratulations!</h2>
        </div>
      </div>
    </div>
  );
};

export default CelebrationDiv;
