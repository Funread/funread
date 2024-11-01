import React, { useState } from 'react';
import SidebarBook from '../Shared/SidebarBook/SidebarBook';
import BadgeGrid from './BadgeGrid';
import CollectionSidebar from './CollectionSidebar';
import { badgesData } from './badgesData';
import './Badges.css';

const BadgesPage = () => {
  const [filter, setFilter] = useState("all");

  // Definir la función onSelectCollection
  const onSelectCollection = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <div className='container-fluid text-center group'>
      <div className='row' style={{ height: 'auto' }}>
        <div className='col-1 p-0'>
          <SidebarBook />
        </div>
        <div className='col-11 main-content'>
          <div className="badges-page-container">
            <div className="badges-page-body">
              <CollectionSidebar onSelectCollection={onSelectCollection} />
              <BadgeGrid filter={filter} badges={badgesData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgesPage;
