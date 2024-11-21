import React, { useEffect, useState } from 'react';
import { listBadgePerUser } from '../../api/Badges'; // Ruta correcta hacia el archivo API

function BadgeGrid({ userId }) {
  const [badgesData, setBadgesData] = useState([]); // Estado para almacenar las insignias
  const [loading, setLoading] = useState(true); // Estado para el indicador de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        setLoading(true); // Activa el indicador de carga
        const data = await listBadgePerUser(userId); // Obtiene los datos usando la función API
        setBadgesData(data.badges || []); // Actualiza el estado con el array de insignias
      } catch (err) {
        console.error('Error fetching badges:', err);
        setError(err.message || 'Something went wrong'); // Maneja errores
      } finally {
        setLoading(false); // Desactiva el indicador de carga
      }
    };

    fetchBadges(); // Llama a la función al montar el componente
  }, [userId]);

  // Mostrar un indicador de carga mientras se obtienen los datos
  if (loading) {
    return <div>Loading badges...</div>;
  }

  // Mostrar un mensaje de error si ocurre un problema
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Renderizar las insignias
  return (
    <div className="badges-grid">
      {badgesData.map((badge, index) => (
        <div key={index} className="badge-card">
          <h4>{badge.title}</h4>
          <p>{badge.description}</p>
          <p>Points: {badge.points}</p>
          <p>Status: {badge.status}</p>
        </div>
      ))}
    </div>
  );
}

export default BadgeGrid;


