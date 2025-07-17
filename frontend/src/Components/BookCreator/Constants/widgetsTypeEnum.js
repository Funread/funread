// src/Components/BookCreator/constants/widgetEnum.js
  // Algunos tipos han sido removido por ejemplo 1 es texto pero se agrega a konva al iguial que el tipo 3 que son shapes 
    // Tipo 5 Games   Antes era   CODE: 5,



    /****************************
     *  Datos antes del 2025 
     * --------------------------
     * Id Type Nombre
     * 1	1	Title
     * 2	1	Description
     * 3	2	Image
     * 4	2	Video
     * 5	2	Audio
     * 6	3	Shape
     * 7	4	True Or False
     * 8	4	Complete
     * 9	4	Quiz
     * 10	5	Code
     ****************************/

        /****************************
     *  Datos Actuales 2025 
     * --------------------------
     * Id Type Nombre
     * 1	1	Title
     * 2	1	Description
     * 3	2	Image
     * 4	2	Video
     * 5	2	Audio
     * 6	3	Shape
     * 7	4	True Or False
     * 8	4	Complete
     * 9	4	Quiz
     * 10	5	Code
     ****************************/
export const WidgetEnum = {

    // Tipo 2 Se actualiza para que  este sea konva Media 
    COMIC_CREATOR: 2,
    IMAGE: 2,
    VIDEO: 2,
    AUDIO: 2,
    // Se agregan estos dos al Media de konva
    TITLE: 2,
    DESCRIPTION: 2,
    SHAPE: 2,
    // Tipo 4 Quiz
    SINGLE_CHOICE:4,
    TRUE_OR_FALSE: 4,
    MARK_X: 4,
    COMPLETE: 4,
    QUIZ: 4,
  // Tipo 5 Gamificacion
    WORDSEARCH: 5,
  };
  