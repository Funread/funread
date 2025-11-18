import { getMediaByType } from './media';

// Hardcoded images - mantener compatibilidad con imágenes existentes
const HARDCODED_BACKGROUNDS = [
  { id: "arenal", src: "/imagenes/Background/Arenal.png", name: "Arenal" },
  { id: "aula", src: "/imagenes/Background/Aula.png", name: "Aula" },
  { id: "aula2", src: "/imagenes/Background/Aula2.png", name: "Aula 2" },
  { id: "barrio", src: "/imagenes/Background/Barrio.png", name: "Barrio" },
  { id: "cancha", src: "/imagenes/Background/Cancha.png", name: "Cancha" },
  { id: "circo", src: "/imagenes/Background/Circo.png", name: "Circo" },
  { id: "guanacaste", src: "/imagenes/Background/Guanacaste.png", name: "Guanacaste" },
  { id: "nature_home", src: "/imagenes/Background/Nature_Home.jpg", name: "Nature Home" },
  { id: "nature_home2", src: "/imagenes/Background/Nature_Home2.jpg", name: "Nature Home 2" },
  { id: "park", src: "/imagenes/Background/Park.png", name: "Park" },
  { id: "river", src: "/imagenes/Background/River.jpg", name: "River" },
  { id: "tree", src: "/imagenes/Background/Tree.jpg", name: "Tree" },
  { id: "volcano", src: "/imagenes/Background/Volcano.jpg", name: "Volcano" },
];

const HARDCODED_SHAPES = [
  { id: "pow", src: "/imagenes/Shapes/Pow.png", name: "Pow" },
  { id: "pow2", src: "/imagenes/Shapes/Pow2.png", name: "Pow 2" },
  { id: "Think", src: "/imagenes/Shapes/Think.png", name: "Think" },
  { id: "Say", src: "/imagenes/Shapes/Say.png", name: "Say" },
];

const HARDCODED_OBJECTS = [
  { id: "ajedrez", src: "/imagenes/Objects/ajedrez.png", name: "Ajedrez" },
  { id: "Ball", src: "/imagenes/Objects/Ball.png", name: "Ball" },
  { id: "Silla", src: "/imagenes/Objects/Silla.png", name: "Silla" },
  { id: "Lapicero", src: "/imagenes/Objects/Lapicero.png", name: "Lapicero" },
  { id: "Celular", src: "/imagenes/Objects/Celular.png", name: "Celular" },
  { id: "Laptop", src: "/imagenes/Objects/Laptop.png", name: "Laptop" },
  { id: "Camara", src: "/imagenes/Objects/Camara.png", name: "Camara" },
  { id: "pizarra", src: "/imagenes/Objects/pizarra.jpg", name: "Pizarra" },
];

const HARDCODED_CHARACTERS = [
  { id: "Personaje1", src: "/imagenes/Characters/Personaje1.jpg", name: "Personaje 1" },
  { id: "Personaje2", src: "/imagenes/Characters/Personaje2.jpg", name: "Personaje 2" },
  { id: "Personaje3", src: "/imagenes/Characters/Personaje3.jpg", name: "Personaje 3" },
];

// Helper para combinar imágenes hardcodeadas con las de la BD
const combineImages = async (hardcodedImages, galleryType, token) => {
  try {
    if (!token) {
      // Si no hay token, solo devolver las hardcodeadas
      return hardcodedImages;
    }

    const dbImages = await getMediaByType(galleryType, token);
    
    // Convertir imágenes de BD al formato esperado
    const formattedDbImages = (dbImages || []).map(img => ({
      id: `db-${img.id}`,
      src: img.url || img.file,
      name: img.name || `Image ${img.id}`,
      fromDatabase: true
    }));

    // Combinar: primero las hardcodeadas, luego las de BD
    return [...hardcodedImages, ...formattedDbImages];
  } catch (error) {
    console.error(`Error loading images for gallery type ${galleryType}:`, error);
    // En caso de error, devolver solo las hardcodeadas
    return hardcodedImages;
  }
};

export async function getBackgroundImages(token = null) {
  return await combineImages(HARDCODED_BACKGROUNDS, 2, token);
}

export async function getShapesImages(token = null) {
  return await combineImages(HARDCODED_SHAPES, 3, token);
}

export async function getObjectImages(token = null) {
  return await combineImages(HARDCODED_OBJECTS, 5, token);
}

export async function getPersonsImages(token = null) {
  return await combineImages(HARDCODED_CHARACTERS, 4, token);
}

// Funciones síncronas para compatibilidad con código legacy
export function getBackgroundImagesSync() {
  return HARDCODED_BACKGROUNDS;
}

export function getShapesImagesSync() {
  return HARDCODED_SHAPES;
}

export function getObjectImagesSync() {
  return HARDCODED_OBJECTS;
}

export function getPersonsImagesSync() {
  return HARDCODED_CHARACTERS;
}
