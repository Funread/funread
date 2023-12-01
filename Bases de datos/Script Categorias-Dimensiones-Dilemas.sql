use funread;

insert into bookcategory(CategoryName) values
('Justicia Social');

insert into bookdimension(DimensionName,BookCategoryID) values
('Redistribucion de recursos, bienes y capacidades',1),
('Reconocimiento de la diversidad y la valoración y celebración',1),
('Representación de todas las personas de forma democratica, especialmente en aquellos ambitos que ams les afectan y estan mas implicados',1);

insert into bookdilemma(Dilemma,BookDimensionID) values
('Paises pobres',1),
('Discapacidad laboral',1),
('Trabajo infantil',1),
('Excursion',1),
('Becas escolares',1),
('Idioma',2),
('Accesso TICS',2),
('Mujeres',2),
('Acoso escolar',2),
('Familia',2),
('Hijos de parejas homosexuales',2),
('Eleccion delegado',3),
('Voto elecciones generales',3),
('Alumnos escasa participacion',3),
('Gobierno democratico',3),
('Lenguas cooficiales',3),
('Justicia Universal',3);

select * from bookdilemma

