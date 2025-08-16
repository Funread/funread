// Simulación de API para badges
export async function fetchBadges() {
  // Aquí deberías llamar a tu endpoint real
  return [
    { nombre: "Ejemplo", titulo: "Badge Ejemplo", repeticionesNecesarias: 10, imagen: "https://via.placeholder.com/64" }
  ];
}

export async function createBadge(badgeData) {
  // Aquí deberías hacer un POST a tu endpoint real
  return { ...badgeData };
}
