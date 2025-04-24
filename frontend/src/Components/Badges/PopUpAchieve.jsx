import React, { useState, useEffect } from 'react';
import './PopUpAchieveCSS.css'; // CSS separado
import IconPopUp from '../../assets/images/BadgePopUpIcon.svg'
import trophy_full from '../../assets/images/trophy_full.svg'
import trophy_no_handles from '../../assets/images/trophy_no_handles.svg'
import puntuation from '../../assets/images/puntuation.svg'
import BadgeAudio from '../../assets/audio/Badge.wav'


const PopUpAchieve = ({ Badge }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [audio] = useState({
    regular: new Audio(BadgeAudio),
    rare: new Audio(BadgeAudio)
  });

  useEffect(() => {
    // Limpieza al desmontar el componente
    return () => {
      audio.regular.pause();
      audio.rare.pause();
    };
  }, [audio]);

  const triggerAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Reproducir sonido adecuado
    if (Badge?.rare) {
      audio.rare.play();
    } else {
      audio.regular.play();
    }

    // Reiniciar animación después de 12 segundos
    setTimeout(() => {
      setIsAnimating(false);
    }, 8000);
  };

  // Disparar animación automáticamente cuando cambia el Badge
  useEffect(() => {
    if (Badge) {
      triggerAnimation();
    }
  }, [Badge]);

  const animationClasses = {
    circle: isAnimating ? 'circle circle_animate' : 'circle',
    banner: isAnimating ? 'banner banner-animate' : 'banner',
    badgeDisp: isAnimating ? 'badge_disp badge_disp_animate' : 'badge_disp',
    achievement: Badge?.rare ? 'achievement rare' : 'achievement'
  };

  return (
    <div className={animationClasses.achievement}>
      <div className="animation">
        <div className={animationClasses.circle}>
          <div className="img trophy_animate trophy_img">
            <img className="trophy_1" src={trophy_full} alt="Trofeo"/>
            <img className="trophy_2" src={trophy_no_handles} alt="Base del trofeo"/>
          </div>
          <div className="img book_img">
            <img src={IconPopUp} alt="Book Icon"/>
          </div>
          <div className="brilliant-wrap">
            <div className="brilliant"></div>
          </div>
        </div>
        <div className="banner-outer">
          <div className={animationClasses.banner}>
            <div className={animationClasses.badgeDisp}>
              <span className="unlocked">
                {Badge?.rare ? 'Rare Badge Unlocked' : 'Badge Unlocked'}
              </span>
              <div className="score_disp">
                <div className="gamerscore">
                  <img width="20px" src={puntuation} alt="Puntuation"/>
                  <span className="badge_score">{Badge?.points}</span>
                </div>
                <span className="hyphen_sep">-</span>
                <span className="badg_name">{Badge?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpAchieve;