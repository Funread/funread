import React, { useEffect, useState } from 'react';
import SidebarBook from '../Shared/SidebarBook/SidebarBook';
import BadgeGrid from './BadgeGrid';
import CollectionSidebar from './CollectionSidebar';
import './Badges.css';
import {listBadgePerUser} from  '../../api/Badges';
const BadgesPage = () => {
  const [filter, setFilter] = useState("all");
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar los badges
  useEffect(() => {
    async function fetchBadges() {
      try {
        const data = await listBadgePerUser(
          4
         
        )
        setBadges(data);
      } catch (err) {
        setError(err.message); // Manejar errores
      } finally {
        setLoading(false); // Cambiar el estado de carga
      }
    }

    fetchBadges();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // Cambiar el filtro de colección
  const onSelectCollection = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  if (loading) return <p>Loading badges...</p>; // Mensaje de carga
  if (error) return <p>Error loading badges: {error}</p>; // Mensaje de error

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
              <BadgeGrid filter={filter} badgesData={badges} /> {/* Pasar los datos de los badges a BadgeGrid */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgesPage;