import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

const BookStatCard = ({ completedQuizzes }) => {
  return (
    <div className="flex-1 relative bg-gradient-to-br from-emerald-400 to-teal-400 rounded-xl p-4 border-2 border-white shadow-md transform hover:scale-[1.02] transition-transform duration-300 min-h-[140px] flex items-center justify-center">
      <div className="absolute -top-2 -right-2 bg-orange-400 rounded-full p-2 border-4 border-white shadow-sm">
        <FontAwesomeIcon icon={faBookOpen} className="h-3 w-6 text-orange-700" />
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-white rounded-full p-2 mb-2 shadow-md">
          <FontAwesomeIcon icon={faBookOpen} className="h-6 w-6 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-black text-white mb-1 drop-shadow-md">
          {completedQuizzes}
        </h2>
        <p className="text-base text-white font-bold drop-shadow">Books Completed</p>
      </div>
    </div>
  );
};

export default BookStatCard;
