import React, { useState, useEffect } from 'react';
import './PopUpAchieveCSS.css'; // CSS separado

const PopUpAchieve = ({ Badge }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [audio] = useState({
    regular: new Audio('https://dl.dropboxusercontent.com/s/8qvrpd69ua7wio8/XboxAchievement.mp3'),
    rare: new Audio('https://dl.dropboxusercontent.com/s/po1udpov43am81i/XboxOneRareAchievement.mp3')
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
            <img className="trophy_1" src="https://dl.dropboxusercontent.com/s/k0n14tzcl4q61le/trophy_full.svg" alt="Trofeo"/>
            <img className="trophy_2" src="https://dl.dropboxusercontent.com/s/cd4k1h6w1c8an9j/trophy_no_handles.svg" alt="Base del trofeo"/>
          </div>
          <div className="img xbox_img">
            <img src="https://dl.dropboxusercontent.com/s/uopiulb5yeo1twm/xbox.svg?dl=0" alt="Logo Xbox"/>
          </div>
          <div className="brilliant-wrap">
            <div className="brilliant"></div>
          </div>
        </div>
        <div className="banner-outer">
          <div className={animationClasses.banner}>
            <div className={animationClasses.badgeDisp}>
              <span className="unlocked">
                {Badge?.rare ? 'Logro raro desbloqueado' : 'Logro desbloqueado'}
              </span>
              <div className="score_disp">
                <div className="gamerscore">
                  <img width="20px" src="https://dl.dropboxusercontent.com/s/gdqf5amvjkx9rfb/G.svg?dl=0" alt="Puntuación"/>
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