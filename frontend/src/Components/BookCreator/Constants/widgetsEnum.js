// src/Components/BookCreator/constants/WidgetTypes.js
// widgetid 9 wordsearch

/*
1	1	Title
2	1	Description
3	2	Image
4	2	Video
5	2	Audio
6	3	Shape
7	4	True Or False
8	4	Complete
9	4	Quiz
10	5	Code
*/

/*Nuevo
1	1	Title
2	1	Description
3	2	Image
4	2	Video
5	2	Audio
6	3	Shape
7	4	True Or False
8	4	Complete
9	4	Quiz
10	5	WORDSEARCH


 




*/
export const WidgetTypes = {
  COMIC_CREATOR: { id: 2, label: "Canvas/Media" },
  IMAGE:         { id: 2, label: "Imagen" },
  VIDEO:         { id: 2, label: "Video" },
  AUDIO:         { id: 2, label: "Audio" },
  TITLE:         { id: 2, label: "Título" },
  DESCRIPTION:   { id: 2, label: "Descripción" },
  SHAPE:         { id: 2, label: "Forma" },
  SINGLE_CHOICE: { id: 4, label: "Opción múltiple" },
  TRUE_OR_FALSE: { id: 4, label: "Verdadero/Falso" },
  MARK_X:        { id: 4, label: "Marca con X" },
  COMPLETE:      { id: 4, label: "Completar" },
  QUIZ:          { id: 4, label: "Quiz" },
  WORDSEARCH:    { id: 5, label: "Sopa de Letras" },
  // Agrega más tipos aquí
};

// Helper para obtener label a partir del id
export function getWidgetLabelById(id) {
  const entry = Object.values(WidgetTypes).find((item) => item.id === id);
  return entry ? entry.label : "Desconocido";
}
