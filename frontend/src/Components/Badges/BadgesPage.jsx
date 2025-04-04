import React, { useEffect, useState } from 'react';
import SidebarBook from '../Shared/SidebarBook/SidebarBook'; // Anterior sidebar
import BadgeGrid from './BadgeGrid';
import CollectionSidebar from './CollectionSidebar'; // Old menu for filter badges
import './Badges.css';
import { listBadgePerUser } from '../../api/userBadges';

const BadgesPage = () => {
  const [filter, setFilter] = useState('all'); // Estado para el filtro de colección");
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar los badges
  useEffect(() => {
    async function fetchBadges() {
      try {
        const data = await listBadgePerUser();
        setBadges(data);
        console.log('Badges:', data); // Mostrar los badges en la consola
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
    <>
        <CollectionSidebar onSelectCollection={onSelectCollection} filter={filter} /> {/* Sidebar para filtrar badges */}
        <div className="achievements-container">
        <div className="achievements-grid">
        <BadgeGrid filter={filter} badgesData={badges} /> {/* Pasar los datos de los badges a BadgeGrid */}
        </div>
      </div>
    </>

  );
};

export default BadgesPage;