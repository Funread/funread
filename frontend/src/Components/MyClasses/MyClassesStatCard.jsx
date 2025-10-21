import React from 'react';
import LevelCard from '../StatCard/LevelCard';
import BookStatCard from '../StatCard/BookStatCard';

const MyClassesStatCard = ({ userStats }) => {
  return (
    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-3">
      <div className="max-w-8xl px-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <LevelCard level={userStats.level} points={userStats.points} />
          <BookStatCard completedQuizzes={userStats.completedQuizzes} />
        </div>
      </div>
    </div>
  );
};

export default MyClassesStatCard;
