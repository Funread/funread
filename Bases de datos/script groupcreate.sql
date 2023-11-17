create database funread
INSERT INTO `funread`.`groupscreate`
(
`name`,
`createdat`,
`isactive`,
`createdby_id`,
`idimage_id`)
VALUES
('diego',
now(),
1,
14,
12
)



INSERT INTO `funread`.`user`
(
`Email`,
`Name`,
`LastName`,
`password`,
`CreatedAt`,
`Actived`,
`UserName`)
VALUES

('juan@email.com', 'Juan', 'Pérez', 'contrasena1', NOW(), 1, 'Juanito'),
('maria@email.com', 'Maria', 'Gómez', 'contrasena2', NOW(), 1, 'MariaG'),
('carlos@email.com', 'Carlos', 'Martínez', 'contrasena3', NOW(), 1, 'CarlosM'),
('laura@email.com', 'Laura', 'Rodríguez', 'contrasena4', NOW(), 1, 'LauRod'),
('pedro@email.com', 'Pedro', 'Sánchez', 'contrasena5', NOW(), 1, 'PedroS'),
('ana@email.com', 'Ana', 'López', 'contrasena6', NOW(), 1, 'AnaL'),
('alberto@email.com', 'Alberto', 'Díaz', 'contrasena7', NOW(), 1, 'AlbertD'),
('clara@email.com', 'Clara', 'Hernández', 'contrasena8', NOW(), 1, 'ClaraH'),
('sergio@email.com', 'Sergio', 'García', 'contrasena9', NOW(), 1, 'SergioG'),
('veronica@email.com', 'Verónica', 'Fernández', 'contrasena10', NOW(), 1, 'VeroF'),
('natalia@email.com', 'Natalia', 'Ramírez', 'contrasena11', NOW(), 1, 'NatyR'),
('javier@email.com', 'Javier', 'Gutiérrez', 'contrasena12', NOW(), 1, 'JaviG'),
('luisa@email.com', 'Luisa', 'Fuentes', 'contrasena13', NOW(), 1, 'LuisaF'),
('diego@email.com', 'Diego', 'Vega', 'contrasena14', NOW(), 1, 'DiegoV'),
('patricia@email.com', 'Patricia', 'Ortega', 'contrasena15', NOW(), 1, 'PatiO');
