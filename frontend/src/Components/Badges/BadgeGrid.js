import React, { useState, useEffect } from "react";
import BadgeCard from "./BadgeCard";
import { badgesData } from "./badgesData";
import BookwormBadgeModal from "./ModalBadges/BookwormBadgeModal";

function BadgeGrid({ filter }) {
  const [openModalId, setOpenModalId] = useState(null); // Estado para el modal abierto

  const handleOpenModal = (id) => {
    setOpenModalId(id); // Abre el modal de la tarjeta seleccionada
  };

  const handleCloseModal = () => {
    setOpenModalId(null); // Cierra el modal
  };

  // Desactiva el scroll en el fondo cuando el modal está abierto
  useEffect(() => {
    if (openModalId !== null) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [openModalId]);

  const filteredBadges = badgesData.filter((badge) => {
    const isDone = badge.points >= badge.threshold;
    const inProgress = badge.points > 0 && badge.points < badge.threshold;

    if (filter === "achieved") return isDone;
    if (filter === "notAchieved") return badge.points === 0;
    if (filter === "inProgress") return inProgress;
    return true;
  });

  return (
    <div className="badges-grid">
      {filteredBadges.map((badge, index) => (
        <div key={index}>
          <BadgeCard
            title={badge.title}
            description={badge.description}
            points={badge.points}
            level={badge.level}
            iconName={badge.iconName}
            status={
              badge.points >= badge.threshold
                ? "Done"
                : badge.points > 0 && badge.points < badge.threshold
                ? "In Progress"
                : "Not Done"
            }
            onOpen={() => handleOpenModal(index)} // Pasamos la función para abrir el modal
          />
        </div>
      ))}
      {openModalId !== null && (
        <BookwormBadgeModal
          onClose={handleCloseModal}
          badge={badgesData[openModalId]}
        />
      )}
    </div>
  );
}

export default BadgeGrid;
