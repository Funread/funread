import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import Star from "../MyClasses/StarProgress.jsx";

const LevelCard = ({ level, points }) => {
  const maxPoints = level * 500;

  return (
    <div className="flex-1 relative bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl p-4 border-2 border-white shadow-md transform hover:scale-[1.02] transition-transform duration-300 min-h-[140px] flex items-center justify-center">
      {/* Badge superior */}
      <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 border-4 border-white shadow-sm">
        <FontAwesomeIcon icon={faStar} className="h-3 w-6 text-yellow-600" />
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-full p-2 mb-2 shadow-md">
          <FontAwesomeIcon icon={faUser} className="h-6 w-6 text-blue-500" />
        </div>
        <h2 className="text-2xl font-black text-white mb-1 drop-shadow-md">
          {`Level ${level}`}
        </h2>
        <div className="flex gap-1 mb-1">
          <Star value={points} max={maxPoints} size={16} />
        </div>
        <div className="bg-white/25 backdrop-blur-sm rounded-full px-3 py-1 border border-white/30">
          <p className="text-[10px] text-white font-bold drop-shadow">
            {`${points} / ${maxPoints} pts`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LevelCard;
