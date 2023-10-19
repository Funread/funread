SELECT * FROM funread.widget;

/*
ENUM 
Tipos de widgets (Agrupaciones)
1=Texto
2=Media
3=Shapes
4=Quiz
5=Games
*/

insert into funread.widget (type, name) values (1, "Title"), (1, "Description"), (2, "Image"), (2, "Video"), (2, "Audio"), (3, "Shape"), (4, "True Or False"), (5, "Complete"), (6, "Quiz")